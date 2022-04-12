import styles from './ChatField.module.css'
import React from 'react'
import PropType, { defaultVal } from '../../propTypes/ChatField'

const ChatField = (props) => {
  const { isUser, message } = props
  if (isUser) {
    return (
      <div className="d-flex align-items-center justify-content-end gap-3 mb-3">
        <div className={styles.chatBoxField}>
          <div className={`${styles.chatMessageRight}`}>{message}</div>
          <div className={styles.triangleRight}></div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="d-flex align-items-center gap-3 mb-3">
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
          width={50}
          height={50}
          className="circle"
        />

        <div className={styles.chatBoxField}>
          <div className={styles.triangleLeft}></div>
          <div className={styles.chatMessage}>{message}</div>
        </div>
      </div>
    )
  }
}

ChatField.propTypes = PropType
ChatField.defaultProps = defaultVal

export default ChatField
