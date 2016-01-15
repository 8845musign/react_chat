import React, { Component } from 'react'
import * as messageTypes from '../constants/MessageTypes'

/**
 * 発言を表示
 */
export default class ChatMessageComponent extends Component {
  render() {
    const message = this.props.message;

    let isMember = (message.type == messageTypes.NORMAL) ? '' : ' is-member';
    let listClass = `listChat__message${isMember}`;

    return (
      <li className={listClass} key={message.id}>
        <span className="listChat__name">{ message.name }</span>
        <span className="listChat__time">{ new Date(message.time).toLocaleString() }</span>
        <span className="listChat__body">{ message.body }</span>
      </li>
    );
  }
}