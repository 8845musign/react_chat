import * as actionTypes from '../constants/ActionTypes'
import * as messageTypes from '../constants/MessageTypes'

const initialState = {
  self: {},
  members: [],
  messages: []
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ENTER:
      /**
       * チャットルームへの入室
       */
      return Object.assign({}, state, {
        self: {
            id: action.self.id,
            name: action.self.name          
        }
      });

    case actionTypes.ENTER_MEMBER:
      /**
       * メンバーの入室
       */
      return Object.assign({}, state, {
        members: [
          ...action.data.list
        ],
        messages: [
          ...state.messages,
          {
            type: messageTypes.ENTER,
            name: '',
            time: new Date(),
            body: action.data.enter.name + 'さんが入室しました。'
          }
        ]
      });

    case actionTypes.RECEIVE_MESSAGE:
      /**
       * 通常メッセージの受け取り
       */
      return Object.assign({}, state, {
        members: [
          ...state.members,
        ],
        messages: [
          ...state.messages,
          {
            type: messageTypes.NORMAL,
            name: action.message.name,
            time: action.message.time,
            body: action.message.body
          }
        ]
      });

    default:
      return state;
  }
}