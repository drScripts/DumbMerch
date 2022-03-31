import styles from "./Profile.module.css";

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Navbar } from "../../containers";
import { ProfileItems, TransactionItem } from "../../components";

const Profile = () => {
  return (
    <section>
      <Navbar />
      <Container className="mt-4">
        <Row>
          <Col md={6}>
            <h1 className="text-orange mb-3">My Profile</h1>
            <Row>
              <Col md={6}>
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                  className={`${styles.profileImg}`}
                />
              </Col>
              <Col md={6}>
                <ProfileItems title={"Name"} value={"Yosep"} />
                <ProfileItems title={"Email"} value={"yosepgans@gmail.com"} />
                <ProfileItems title={"Phone"} value={"083896833122"} />
                <ProfileItems title={"Gender"} value={"Male"} />
                <ProfileItems
                  title={"Address"}
                  value={
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
                  }
                />
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <h1 className="text-orange mb-3">My Transactions</h1>
            <div className={`${styles.transactionFields}`}>
              <TransactionItem />
              <TransactionItem />
              <TransactionItem />
              <TransactionItem />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
