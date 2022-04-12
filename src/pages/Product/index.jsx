import React from "react";
import { Navbar, ProductTable } from "../../containers";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const Index = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <div className="d-flex align-items-center justify-content-between mt-5">
          <h3 className="text-light">List Product</h3>
          <Link to="/admin/product/add">
            <Button>Add Product</Button>
          </Link>
        </div>
        <ProductTable />
      </Container>
    </div>
  );
};

export default Index;
