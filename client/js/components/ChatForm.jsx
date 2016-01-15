import React, { Component } from 'react'

/**
 * チャット入力ボックス
 */
export default class ChatForm extends Component {

  /**
   * 入力値をactoinCreatorへ
   */
  handleSubmit(e) {
    e.preventDefault();

    let input = e.currentTarget.querySelector('input');
    const value = input.value;
    input.value = '';

    // SEND ACTION
    // 
    this.props.onSentMessage(value);
  }

  render() {
    return (
      <form className="post" id="form" onSubmit={(e) => this.handleSubmit(e)}>
        <input className="talk__input" id="input" autoComplete="off" />
        <button className="talk__btn">Send</button>
      </form>
    );
  }
}