import React from 'react'
import styles from './ChatUserList.module.css'
import { ChatBox } from '../../components'
import { Col } from 'react-bootstrap'

const defaultImage =
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

const Index = ({ contacts = [], contact = {}, onClick }) => {
  return (
    <Col
      md={3}
      className={`${styles.personLists} ${styles.fullpage} d-flex flex-column gap-4 p-0`}
    >
      {contacts.map((item, index) => (
        <ChatBox
          name={item?.user?.name || 'Admin'}
          chat={item?.message}
          profilePict={item?.user?.profile?.profile_picture || defaultImage}
          isActive={contact?.user?.id === item?.user?.id}
          key={index}
          onClick={() => {
            onClick(item)
          }}
        />
      ))}
    </Col>
  )
}

export default Index
