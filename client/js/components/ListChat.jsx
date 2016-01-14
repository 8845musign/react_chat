import React, { Component } from 'react'

import ChatMessage from './ChatMessage.jsx'

export default class ListChat extends Component {
  render() {
    const messages = this.props.messages;
    return (
      <ul id="messages" className="listChat__messages">
        {messages.map(message => <ChatMessage message={message} />)}
      </ul>
    )
  }
}