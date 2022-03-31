import { ChatInput, ChatField } from "../../components";
import { Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import styles from "./ChatSection.module.css";

const mockChat = [
  {
    currentUser: true,
    profileImage:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    message: "Hello admin",
  },
  {
    currentUser: false,
    profileImage:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    message: "Yes, Is there anyting I can help ?",
  },
];

const mockChatAdmin = [
  {
    currentUser: false,
    profileImage:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    message: "Hello admin",
  },
  {
    currentUser: true,
    profileImage:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    message: "Yes, Is there anyting I can help ?",
  },
];

const Index = ({ isAdmin }) => {
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);

  const chatTextHandler = (chat) => {
    setChat(chat);
  };

  const submitChat = () => {
    setMessages([
      ...messages,
      {
        currentUser: true,
        profileImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        message: chat,
      },
    ]);
    setChat("");
  };

  useEffect(() => {
    if (isAdmin) {
      setMessages(mockChatAdmin);
    } else {
      setMessages(mockChat);
    }
  }, [isAdmin]);
  return (
    <Col className="d-flex flex-column">
      <div className={`${styles.chatFields} p-3`}>
        <div className={`${styles.chatFields}`}></div>
        <div className={`${styles.messages}`}>
          {messages.map((message, i) => (
            <ChatField
              isUser={message.currentUser}
              message={message.message}
              key={i}
            />
          ))}
        </div>
      </div>
      <ChatInput
        onTextChange={chatTextHandler}
        onSend={submitChat}
        value={chat}
        className={"mb-4"}
      />
    </Col>
  );
};

export default Index;
