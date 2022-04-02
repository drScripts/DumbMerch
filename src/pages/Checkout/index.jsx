import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Navbar, ShipmentContainer } from "../../containers";
import { SingleTransactionItem } from "../../components";

const DetailTransaction = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem("cart"));
    setCarts(carts);
  }, []);

  return (
    <div>
      <Navbar />
      <Container className={"mt-4"}>
        <Row>
          <Col md={6}>
            <h2 className="text-orange mb-4">Detail Transaction</h2>
            <div className={`${styles.productsFields}`}>
              {carts.map((cart, index) => (
                <SingleTransactionItem
                  product={cart.product}
                  qty={cart.qty}
                  key={index}
                />
              ))}
            </div>
          </Col>
          <ShipmentContainer />
        </Row>
      </Container>
    </div>
  );
};

export default DetailTransaction;
