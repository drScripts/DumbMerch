import "./ChatBox.css";
import PropType from "../../propTypes/ChatBox";
import React from "react";

const ChatBox = (props) => {
  const { name, chat, onClick, profilePict } = props;
  return (
    <div className="d-flex align-items-center" onClick={onClick}>
      <img
        src={profilePict}
        alt={name}
        className="profile-img"
        width={50}
        height={50}
      />
      <div className="side-box ms-3">
        <p className="text-light chat-name">{name}</p>
        <p className="chat">{chat}</p>
      </div>
    </div>
  );
};

ChatBox.propTypes = PropType;

export default ChatBox;
