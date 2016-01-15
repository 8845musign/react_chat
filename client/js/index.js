import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import io from 'socket.io-client'

import socketMiddleware from './middlewares/socketMiddleware'
import rootReducer from './reducers'
import * as actionTypes from './constants/ActionTypes'
import * as actionChat from './actions/Chat'
import App from './containers/App.jsx'

let name = prompt("名前を入力してください");

const socket = io("http://localhost:3000/", { query: 'name=' + name });

const createStoreWithMiddleware = compose(
  applyMiddleware(socketMiddleware(socket))
)(createStore);

const store = createStoreWithMiddleware(rootReducer, {});

socket.on(actionTypes.ENTER_MEMBER, data => store.dispatch(actionChat.enterMember(data)));
socket.on(actionTypes.RECEIVE_MESSAGE, data => store.dispatch(actionChat.receiveMessage(data)));

socket.on('connect', function(){
  var self = {
    id: socket.id,
    name: name
  };
  store.dispatch(actionChat.enter(self));
});

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);