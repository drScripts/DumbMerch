import React, { useEffect, useState } from "react";
import styles from "./DetailTransaction.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Navbar } from "../../containers";
import { useParams } from "react-router-dom";
import { SingleTransactionItem } from "../../components";
import CurrencyFormat from "react-currency-format";

const DetailTransaction = () => {
  const params = useParams();
  const [transaction, setTransaction] = useState({
    products: [],
  });

  useEffect(() => {
    const id = params.transactionId;
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    const transaction = transactions.filter(
      (transaction, index) => transaction.id === parseInt(id)
    )[0];

    setTransaction(transaction);
  }, [params]);

  return (
    <div>
      <Navbar />
      <Container className={"mt-4"}>
        <Row>
          <Col md={6}>
            <h2 className="text-orange mb-4">Detail Transaction</h2>
            <div className={`${styles.transactionFields}`}>
              {transaction.products.map((product, index) => (
                <SingleTransactionItem product={product} key={index} />
              ))}
            </div>
          </Col>
          <Col md={6}>
            <h2 className="text-orange mb-4">Detail Shipment</h2>
            <h4 className="text-light">Address</h4>
            <p className="text-justify text-light">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <h5 className="text-light">Shipment Services : JNE</h5>
            <h5 className="text-light">
              Shipment Cost :{" "}
              <CurrencyFormat
                value={0}
                prefix={"Rp. "}
                thousandSeparator={true}
                displayType={"text"}
              />
            </h5>
            <h5 className="text-light">
              Shipment Services :{" "}
              <CurrencyFormat
                value={5000}
                prefix={"Rp. "}
                thousandSeparator={true}
                displayType={"text"}
              />
            </h5>
            <h5 className="text-light">
              Total :{" "}
              <CurrencyFormat
                value={1000000}
                prefix={"Rp. "}
                thousandSeparator={true}
                displayType={"text"}
              />
            </h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailTransaction;
