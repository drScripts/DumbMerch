import styles from "./DetailProduct.module.css";

import React from "react";
import { Navbar } from "../../containers";
import { Col, Container, Row } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../components";

const DetailProduct = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const id = params.productId;
  const productName = searchParams.get("name");
  const imageUrl = searchParams.get("url");
  const productPrice = searchParams.get("price");
  const productStock = searchParams.get("stock");
  const productDesc = searchParams.get("description");
  console.log(id);
  return (
    <section className="pb-4">
      <Navbar />
      <Container className="mt-4">
        <Row>
          <Col>
            <img className={`${styles.imageProduct}`} src={imageUrl} alt="" />
          </Col>
          <Col>
            <h1 className="text-orange">{productName}</h1>
            <p className="text-light">Stock : {productStock}</p>
            <p className={`text-light ${styles.productDescription}`}>
              {productDesc}
            </p>
            <h3 className="text-end text-orange mb-5 mt-4">
              Rp.{productPrice}
            </h3>
            <Button title="Buy" width="w-100" bgColor="bg-red" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DetailProduct;
