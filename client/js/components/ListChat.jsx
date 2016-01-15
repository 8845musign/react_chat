import React, { Component } from 'react'

import ChatMessage from './ChatMessage.jsx'

/**
 * 発言リストを表示
 */
export default class ListChat extends Component {
  render() {
    const messages = this.props.messages;
    return (
      <ul id="messages" className="listChat__messages">
        {messages.reverse().map(message => <ChatMessage message={message} key={message.id} />)}
      </ul>
    )
  }
}