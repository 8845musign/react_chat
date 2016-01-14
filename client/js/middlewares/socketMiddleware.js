import * as actionTypes from '../constants/ActionTypes'

export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    action.id = socket.id;
    socket.emit(actionTypes.SENT_MESSAGE, action);
  }
  
  return next(action);
}