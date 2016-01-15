import React, { Component } from 'react'

/**
 * 自分の名前を表示
 */
export default class ParticipantSelf extends Component {
  render() {
    let {self} = this.props;
    
    // serverとconnect前は空白
    return (
      <p id="me">{self.name ? self.name : ""}</p>
    )
  }
}