import React from "react";
import styles from "./ChatUserList.module.css";
import { ChatBox } from "../../components";
import { Col } from "react-bootstrap";
const Index = ({ isAdmin }) => {
  return (
    <Col
      md={3}
      className={`${styles.personLists} ${styles.fullpage} d-flex flex-column gap-4`}
    >
      {isAdmin ? (
        <ChatBox
          name={"Egi"}
          chat={"Can you help me?"}
          profilePict={
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          }
        />
      ) : (
        <ChatBox
          name={"Admin"}
          chat={"Yes, Is there anything I can help"}
          profilePict={
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          }
        />
      )}
    </Col>
  );
};

export default Index;
