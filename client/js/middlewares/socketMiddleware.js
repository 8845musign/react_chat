import * as actionTypes from '../constants/ActionTypes'

/**
 * サーバーへの通信をactionCreatorとreducerの間に挟む
 */
export default socket => store => next => action => {
  // meta.remoteがtrueの物はserverへもイベントをemit
  if (action.meta && action.meta.remote) {
    action.id = socket.id; // IDを付与
    socket.emit(action.type, action);
  }
  
  return next(action);
}
