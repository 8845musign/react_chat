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
      <form action="" onSubmit={(e) => this.handleSubmit(e)}>
        <i className="fa fa-pencil"></i>
        <input type="text" id="input" autoComplete="off" placeholder='write your message!' />
        <button type='submit'>SENT</button>
      </form>
    );
  }
}