import styles from "./Category.module.css";
import React from "react";
import { CategoryTable, Navbar } from "../../containers";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Category = () => {
  document.title = "DumbMerch Admin | Category";
  return (
    <section>
      <Navbar />
      <Container>
        <div className="d-flex align-items-end justify-content-between mt-5">
          <h3 className="text-light">List Category</h3>
          <Link to={"/admin/category/add"}>
            <Button>Add Category</Button>
          </Link>
        </div>
        <CategoryTable styles={styles} />
      </Container>
    </section>
  );
};

export default Category;
