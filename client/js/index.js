// Library - react
import React from 'react'
import ReactDom from 'react-dom'
// Library - react-redux
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
// Library - socket.io
import io from 'socket.io-client'

// Module
import socketMiddleware from './middlewares/socketMiddleware'
import rootReducer from './reducers'
import * as actionTypes from './constants/ActionTypes'
import * as actionChat from './actions/Chat'
import App from './containers/App.jsx'

// 入室時の名前の入力
let name = prompt("名前を入力してください");

// サーバーとのコネクト
const socket = io("http://localhost:3000/", { query: 'name=' + name });

// StoreオブジェクトへSocket.io処理を挟む
// composeはMiddlewareとStoreを合成してコンストラクタを返す
const createStoreWithMiddleware = compose(
  applyMiddleware(socketMiddleware(socket))
)(createStore);

const store = createStoreWithMiddleware(rootReducer, {});

// サーバーからの通信の受け取り
socket.on(actionTypes.ENTER_MEMBER, data => store.dispatch(actionChat.enterMember(data)));
socket.on(actionTypes.EXIT_MEMBER, data => store.dispatch(actionChat.exitMember(data)));
socket.on(actionTypes.RECEIVE_MESSAGE, data => store.dispatch(actionChat.receiveMessage(data)));

// selfの入室
socket.on('connect', function(){
  var self = {
    id: socket.id,
    name: name
  };
  store.dispatch(actionChat.enter(self));
});

// reactによる画面の描写
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
