import styles from './Complain.module.css'
import { ChatUserList, Navbar, ChatSection } from '../../containers'

import { Container, Row } from 'react-bootstrap'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

let socket

const Complain = () => {
  const [contact, setContact] = useState({})
  const [contacts, setContacts] = useState([])

  const loadUserConnect = () => {
    socket.emit('load admin contact')

    socket.on('admin contact loaded', (data) => {
      setContact(data)
      setContacts([
        {
          user: data,
          message: 'Click to see message',
        },
      ])
    })
  }

  const onContactClick = (contact) => {
    setContact(contact)
  }

  useEffect(() => {
    socket = io('http://localhost:5000', {
      auth: {
        token: localStorage.getItem('usrtbrirtkn'),
      },
    })
    loadUserConnect()
    return () => {
      socket.disconnect()
    }
  }, [])

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
          <ChatSection isAdmin={false} />
        </Row>
      </Container>
    </section>
  )
}

export default Complain
