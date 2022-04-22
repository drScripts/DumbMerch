import styles from "./Complain.module.css";
import { ChatUserList, Navbar, ChatSection } from "../../containers";
import { Container, Row } from "react-bootstrap";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

let socket;

const ComplainAdmin = () => {
  document.title = "DumbMerch Admin | Complain";
  const [contact, setContact] = useState({});
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);

  const loadUserContact = () => {
    socket.emit("load costumer contact");

    socket.on("user contact loaded", (data) => {
      const userChats = data?.map((value, index) => ({
        user: value,
        message:
          messages.length > 0
            ? messages[messages.length - 1].message
            : "Click here to see chat",
      }));

      setContacts(userChats);
    });
  };

  const loadMessageWatcher = () => {
    socket.on("message loaded", (data) => {
      if (data.length > 0) {
        const messageData = data.map((chat) => ({
          idSender: chat?.sender?.id,
          message: chat?.message,
        }));

        setMessages(messageData);
      } else {
        setMessages([]);
      }
    });
  };

  const onNewMessage = () => {
    socket.on("new message", (data) => {
      socket.emit("load message", { idRecipient: contact?.user?.id });
    });
  };

  const onMessageSend = (message) => {
    const data = {
      idRecipient: contact?.user?.id,
      message,
    };

    socket.emit("send message", data);
  };

  useEffect(() => {
    socket = io(process.env.REACT_APP_SOCKET_URL, {
      auth: {
        token: localStorage.getItem("usrtbrirtkn"),
      },
    });
    loadUserContact();
    loadMessageWatcher();
    onNewMessage();
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const onUserClick = (contact) => {
    setContact(contact);
    socket.emit("load message", { idRecipient: contact?.user?.id });
  };

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
          <ChatSection
            contact={contact}
            onMessageSend={onMessageSend}
            messages={messages}
          />
        </Row>
      </Container>
    </section>
  );
};

export default ComplainAdmin;
