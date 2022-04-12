import styles from './Complain.module.css'
import { ChatUserList, Navbar, ChatSection } from '../../containers'

import { Container, Row } from 'react-bootstrap'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

let socket

const Complain = () => {
  const [contact, setContact] = useState({})
  const [contacts, setContacts] = useState([])
  const [messages, setMessages] = useState([])

  const loadUserConnect = () => {
    socket.emit('load admin contact')

    socket.on('admin contact loaded', (data) => {
      setContacts([
        {
          user: data,
          message: 'Click to see message',
        },
      ])
    })
  }

  const loadMessageWatcher = () => {
    socket.on('message loaded', (data) => {
      console.log(data)
      if (data.length > 0) {
        const dataMessage = data.map((item) => ({
          idSender: item?.sender?.id,
          message: item?.message,
        }))

        console.log('MESSAGE LOADED')
        setMessages(dataMessage)
      } else {
        setMessages([])
      }
    })
  }

  const onContactClick = (contact) => {
    setContact(contact)
    socket.emit('load message', { idRecipient: contact?.user?.id })
  }

  const onMessageSend = (message) => {
    const data = {
      idRecipient: contact?.user?.id,
      message,
    }

    socket.emit('send message', data)
  }

  useEffect(() => {
    socket = io('http://localhost:5000', {
      auth: {
        token: localStorage.getItem('usrtbrirtkn'),
      },
    })

    socket.on('new message', () => {
      socket.emit('load message', {
        idRecipient: contact?.user?.id,
      })
    })

    loadUserConnect()
    loadMessageWatcher()
    return () => {
      socket.disconnect()
    }
  }, [messages])

  return (
    <section>
      <Navbar />
      <Container fluid className={`px-5 ${styles.fullpage} mt-4`}>
        <Row>
          <ChatUserList
            contacts={contacts}
            contact={contact}
            onClick={onContactClick}
          />
          <ChatSection
            onMessageSend={onMessageSend}
            messages={messages}
            contact={contact}
          />
        </Row>
      </Container>
    </section>
  )
}

export default Complain
