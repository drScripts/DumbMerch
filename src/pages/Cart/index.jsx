import React from "react";
import { CartTable, Navbar } from "../../containers";
import { Container } from "react-bootstrap";

const Index = () => {
  document.title = "DumbMerch | Cart";
  return (
    <div>
      <Navbar />
      <Container>
        <h3 className="text-light mt-5">List Cart</h3>
        <CartTable />
      </Container>
    </div>
  );
};

export default Index;
