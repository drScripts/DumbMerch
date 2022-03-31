import styles from "./Category.module.css";

import React from "react";
import { CategoryTable, Navbar } from "../../containers";
import { Container } from "react-bootstrap";

const Index = () => {
  return (
    <section>
      <Navbar />
      <Container>
        <h3 className="text-light mt-5">List Category</h3>
        <CategoryTable styles={styles} />
      </Container>
    </section>
  );
};

export default Index;
