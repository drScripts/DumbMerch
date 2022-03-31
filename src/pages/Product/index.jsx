import React from "react";
import { Navbar, ProductTable } from "../../containers";
import { Container } from "react-bootstrap";
const Index = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <h3 className="text-light mt-5">List Product</h3>
        <ProductTable />
      </Container>
    </div>
  );
};

export default Index;
