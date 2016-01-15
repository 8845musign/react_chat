import React, { Component } from 'react'

/**
 * 発言を表示
 */
export default class ChatMessageComponent extends Component {
  render() {
    const message = this.props.message;

    return (
      <li className="listChat__message">
        <span className="listChat__name">{ message.name }</span>
        <span className="listChat__time">{ new Date(message.time).toLocaleString() }</span>
        <span className="listChat__body">{ message.body }</span>
      </li>
    );
  }
}