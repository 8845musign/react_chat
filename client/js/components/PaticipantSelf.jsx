import React, { Component } from 'react'

export default class ParticipantSelf extends Component {
  render() {
    let {self} = this.props;

    return (
      <p id="me">{self.name ? self.name : ""}</p>
    )
  }
}