import { ChatInput, ChatField } from '../../components'
import { Col } from 'react-bootstrap'
import React, { useState } from 'react'
import styles from './ChatSection.module.css'

const Index = ({ onMessageSend, messages = [], contact }) => {
  const [chat, setChat] = useState('')

  const chatTextHandler = (chat) => {
    setChat(chat)
  }

  const submitChat = () => {
    console.log('SEND MESSAGE')
    onMessageSend(chat)
    setChat('')
  }

  return (
    <Col className="d-flex flex-column">
      <div className={`${styles.chatFields} p-3`}>
        <div className={`${styles.chatFields}`}></div>
        <div className={`${styles.messages}`}>
          {messages.map((message, i) => (
            <ChatField
              isUser={contact?.user?.id !== message?.idSender}
              message={message?.message}
              key={i}
            />
          ))}
        </div>
      </div>
      <ChatInput
        onTextChange={chatTextHandler}
        onSend={submitChat}
        value={chat}
        className={'mb-4'}
      />
    </Col>
  )
}

export default Index
