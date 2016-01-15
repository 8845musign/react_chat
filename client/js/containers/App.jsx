// Libaray
import React, { Component } from 'react'
import { connect } from 'react-redux'
// Module
import * as actionChat from '../actions/Chat'
// Views
import ChatForm from '../components/ChatForm.jsx'
import ListChat from '../components/ListChat.jsx'
import ListParticipant from '../components/ListParticipant.jsx'
import ParticipantSelf from '../components/PaticipantSelf.jsx'

/**
 * Container View
 * ReduxとReactの接続を行う
 * ReduxとReactが関連づくのはこのレイヤーのみ
 * 子としてぶら下がるViewは渡って来たpropのstateやmethodを利用するだけ
 */
class App extends Component {
  render() {
    // dispatchメソッド
    let { onSentMessage } = this.props;
    // Storeから渡されたStateを分割して読み込み
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

/**
 * Storeから渡されたstateをmappingしてContainerへ渡す
 */
function mapStateToProps(state) {
  return {
    self: state.chatReducer.self,
    messages: state.chatReducer.messages,
    members: state.chatReducer.members
  }
}

/**
 * StoreのdispatchとActionCreatoreを合成、mappingしてContainerへ渡す
 */
function mapDispatchToProps(dispatch) {
  return {
    onSentMessage: (message) => dispatch(actionChat.sentMessage(message))
  }
}

/**
 * react-reduxのconnectにより、reduxとreact(Container)を接続
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);