import styles from "./Complain.module.css";
import { ChatUserList, Navbar, ChatSection } from "../../containers";

import { Container, Row } from "react-bootstrap";

const Complain = ({ isAdmin = false }) => {
  return (
    <section>
      <Navbar />
      <Container fluid className={`px-5 ${styles.fullpage} mt-4`}>
        <Row>
          <ChatUserList isAdmin={isAdmin} />
          <ChatSection isAdmin={isAdmin} />
        </Row>
      </Container>
    </section>
  );
};

export default Complain;
