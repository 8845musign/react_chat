import { combineReducers } from 'redux'
import chat from './chat'

// 各領域ごとにreduerを分割(今回は一つ)
const rootReducer = combineReducers({
  chat
});

export default rootReducer 