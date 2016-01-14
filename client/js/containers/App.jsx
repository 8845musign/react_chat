import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actionChat from '../actions/Chat'

import ChatForm from '../components/ChatForm.jsx'
import ListChat from '../components/ListChat.jsx'
import ListParticipant from '../components/ListParticipant.jsx'
import ParticipantSelf from '../components/PaticipantSelf.jsx'


class App extends Component {
  render() {
    let { onSentMessage } = this.props;
    let { self, messages, members } = this.props;
    
    return (
      <div className="container-fluid h-full">
        <div className="row h-full">
          <section className="col-sm-3 columnParticipant">
            <h2 className="columnParticipant__heading">チャットルーム</h2>
            <ParticipantSelf self={self} />

            <ListParticipant participants={members} />
          </section>

          <section className="col-sm-9 pos-r h-full sectionChat">
            <h2 className="sectionChat__heading">発言</h2>

            <ListChat messages={messages} />

            <ChatForm onSentMessage={onSentMessage} />
          </section>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    self: state.chat.self,
    messages: state.chat.messages,
    members: state.chat.members
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSentMessage: (message) => dispatch(actionChat.sentMessage(message))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);