import { ChatInput, ChatField } from "../../components";
import { Col } from "react-bootstrap";
import React, { useState } from "react";
import styles from "./ChatSection.module.css";

const ChatSection = ({ onMessageSend, messages = [], contact }) => {
  const [chat, setChat] = useState("");

  const chatTextHandler = (chat) => {
    setChat(chat);
  };

  const submitChat = () => {
    onMessageSend(chat);
    setChat("");
  };

  return (
    <Col className="d-flex flex-column">
      <div className={`${styles.chatFields} p-3`}>
        <div
          className={`${styles.chatFields} ${
            !messages.length && !contact?.user
              ? "d-flex align-items-center justify-content-center"
              : ""
          }`}
        >
          {!messages.length && !contact?.user ? (
            <h1 className="text-light">No Chat</h1>
          ) : (
            <></>
          )}
        </div>
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
        className={"mb-4"}
      />
    </Col>
  );
};

export default ChatSection;
