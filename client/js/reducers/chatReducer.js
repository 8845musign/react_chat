import * as actionTypes from '../constants/ActionTypes'
import * as messageTypes from '../constants/MessageTypes'

/**
 * Stateの初期値
 */
const initialState = {
  self: {},
  members: [],
  messages: []
};

/**
 * アクションを受け取ってチャットのStateを生成
 */
export default function chatReducer(state = initialState, action) {
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
            // ここでメッセージを生成するのはいけてないのでは...
            body: action.data.enter.name + 'さんが入室しました。',
            id: state.messages.length ? state.messages.length++ :  0
          }
        ]
      });

    case actionTypes.EXIT_MEMBER:
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
            type: messageTypes.EXIT,
            name: '',
            time: new Date(),
            // ここでメッセージを生成するのはいけてないのでは...
            body: action.data.exit.name + 'さんが退室しました。',
            id: state.messages.length ? state.messages.length++ :  0
          }
        ]
      });

    case actionTypes.RECEIVE_MESSAGE:
      /**
       * 通常メッセージの受け取り
       */
      let type = (state.self.id === action.message.id.replace('/#', '')) ? messageTypes.NORMAL : messageTypes.MEMBER;

      return Object.assign({}, state, {
        members: [
          ...state.members,
        ],
        messages: [
          ...state.messages,
          {
            type: type,
            name: action.message.name,
            time: action.message.time,
            body: action.message.body,
            id: state.messages.length ? state.messages.length++ :  0
          }
        ]
      });

    default:
      /**
       * 起動時や例外的なActionが渡って来た時はそのままStateを返す
       */
      return state;
  }
}