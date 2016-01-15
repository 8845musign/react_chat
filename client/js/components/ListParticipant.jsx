import React, { Component } from 'react'

/**
 * 参加者リストを表示
 */
export default class ListParticipant extends Component {
  render() {
    let { participants } = this.props;

    return (
      <section className="listParticipant">
        <div className="name">member(<span className="listParticipant__count">{participants ? participants.length : 0}</span>)</div>
        <ul className="listParticipant__participants" id="memberList">
          {participants.map(participant => <li>{participant.name}</li>)}
        </ul>
      </section>
    )
  }
}