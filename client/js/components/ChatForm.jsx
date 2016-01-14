import React, { Component } from 'react'

export default class ChatForm extends Component {

  handleSubmit(e) {
    e.preventDefault();
    
    let input = e.currentTarget.querySelector('input');
    const value = input.value;
    input.value = '';
    
    // SEND ACTION
    this.props.onSentMessage(value);
  }

  render() {

    return (
      <form className="post" action="" id="form" onSubmit={(e) => this.handleSubmit(e)}>
        <input className="talk__input" id="input" autoComplete="off" />
        <button className="talk__btn">Send</button>
      </form>
    );
  }
}