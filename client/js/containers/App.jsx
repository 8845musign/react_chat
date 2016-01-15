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
      <div className="container">
        <h1><i className="fa fa-comments"></i>Chatroom</h1>

        <div className="container__self">
          <div className="fa-container"><i className="fa fa-user"></i></div>  
          <div className="name">you</div>
          <ParticipantSelf self={self} />
        </div>
        <div className="container__message">
          <section className="h-full sectionChat">
            <ListChat messages={messages} />
          </section>

          <ChatForm onSentMessage={onSentMessage} />
        </div>

        <div className="container__member">
          <div className="fa-container fa-member"><i className="fa fa-user"></i></div>  
          <ListParticipant participants={members} />
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