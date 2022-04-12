import styles from './Complain.module.css'
import { ChatUserList, Navbar, ChatSection } from '../../containers'
import { Container, Row } from 'react-bootstrap'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

let socket

const ComplainAdmin = () => {
  const [contact, setContact] = useState({})
  const [contacts, setContacts] = useState([])

  const loadUserContact = () => {
    socket.emit('load costumer contact')

    socket.on('user contact loaded', (data) => {
      const userChats = data?.map((value, index) => ({
        user: value,
        message: 'Click here to see chat',
      }))

      setContacts(userChats)
      setContact(userChats[0])
    })
  }

  useEffect(() => {
    socket = io('http://localhost:5000', {
      auth: {
        token: localStorage.getItem('usrtbrirtkn'),
      },
    })
    loadUserContact()
    return () => {
      socket.disconnect()
    }
  }, [])

  const onUserClick = (contact) => {
    setContact(contact)
    socket.emit('load message', { idRecipient: contact?.user?.id })

    socket.on('message loaded', (data) => {
      console.log(data)
    })
  }

  return (
    <section>
      <Navbar />
      <Container fluid className={`px-5 ${styles.fullpage} mt-4`}>
        <Row>
          <ChatUserList
            contact={contact}
            contacts={contacts}
            onClick={onUserClick}
          />
          <ChatSection isAdmin={true} />
        </Row>
      </Container>
    </section>
  )
}

export default ComplainAdmin
