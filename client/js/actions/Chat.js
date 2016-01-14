import * as types from '../constants/ActionTypes'

export function enter(self) {
  return { type: types.ENTER, self };
}

export function enterMember(data) {
  return { type: types.ENTER_MEMBER, data };
}

export function receiveMessage(message) {
  return { type: types.RECEIVE_MESSAGE, message };
}

export function sentMessage(message) {
  return {
    meta: { remote:true },
    type: types.SENT_MESSAGE,
    message
  };
}