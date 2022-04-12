import React, { useState } from "react";
import styles from "./Checkout.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Navbar, ShipmentContainer } from "../../containers";
import { SingleTransactionItem } from "../../components";
import { useQuery } from "react-query";
import { API } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DetailTransaction = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  const countTotal = (carts) => {
    let totalNow = 0;
    carts?.forEach((val, i) => {
      totalNow += val.product.price * val.qty;
    });
    setTotal(totalNow);
  };
  const { data: carts } = useQuery(
    "cartChace",
    async () => {
      const { data } = await API.get("/carts");
      const carts = data?.data?.carts;
      if (!carts.length) {
        navigate("/cart");
      }
      countTotal(carts);
      return carts;
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
    }
  );

  return (
    <div>
      <Navbar />
      <Container className={"mt-4"}>
        <Row>
          <Col md={6}>
            <h2 className="text-orange mb-4">Detail Transaction</h2>
            <div className={`${styles.productsFields}`}>
              {carts?.map((cart, index) => (
                <SingleTransactionItem
                  product={cart.product}
                  qty={cart.qty}
                  key={index}
                  total={total}
                />
              ))}
            </div>
          </Col>
          <ShipmentContainer total={total} />
        </Row>
      </Container>
    </div>
  );
};

export default DetailTransaction;
