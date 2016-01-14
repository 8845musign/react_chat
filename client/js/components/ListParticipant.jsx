import React, { Component } from 'react'

export default class ListParticipant extends Component {
  render() {
    let { participants } = this.props;

    return (
      <section className="listParticipant">
        <h3 className="listParticipant__heading">参加者(<span className="listParticipant__count">{participants ? participants.length : 0}</span>)</h3>
        <ul className="listParticipant__participants" id="memberList">
          {participants.map(participant => <li>{participant.name}</li>)}
        </ul>
      </section>
    )
  }
}