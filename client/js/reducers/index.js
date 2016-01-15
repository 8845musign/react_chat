import { combineReducers } from 'redux'
import chatReducer from './chatReducer'

// 各領域ごとにreduerを分割(今回は一つ)
const rootReducer = combineReducers({
  chatReducer
});

export default rootReducer 