import "./ChatBox.css";

import React from "react";

const ChatBox = ({ name, chat, onClick, profilePict }) => {
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

export default ChatBox;
