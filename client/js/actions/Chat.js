/**
 * Action Creator
 */

import * as types from '../constants/ActionTypes'

/**
 * ユーザ自身の入室
 * 
 * @param self {Object} - ユーザーデータ
 * @param self.id {Sting} - Socket.ioのコネクションID
 * @param self.name {Sting} - 名前
 */
export function enter(self) {
  return { type: types.ENTER, self };
}

/**
 * ルームへのメンバーの入室
 * メンバー全てのデータを全て受け取る
 * 
 * @param data
 */
export function enterMember(data) {
  return { type: types.ENTER_MEMBER, data };
}

/**
 * 発言の受信
 */
export function receiveMessage(message) {
  return { type: types.RECEIVE_MESSAGE, message };
}

/**
 * 発言の送信
 */
export function sentMessage(message) {
  return {
    // meta.data.trueでサーバへ送信
    meta: { remote:true },
    type: types.SENT_MESSAGE,
    message
  };
}