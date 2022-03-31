import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Navbar } from "../../containers";
import { ProductCard } from "../../components";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products")));
  }, []);

  return (
    <section className="dark-body pb-3">
      <Navbar />
      <Container className="mt-5">
        <h2 className="text-orange mb-3">Product</h2>
        <Row>
          {products.map((product, i) => (
            <Col md={3} className="mb-3" key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default HomePage;
