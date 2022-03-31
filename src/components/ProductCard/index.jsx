import "./ProductCard.css";

import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product = {} }) => {
  const {
    productName = "",
    productPrice = 0,
    productStock = 0,
    imageUrl = "",
    description = "",
    id,
  } = product;

  return (
    <Link
      to={`/product/${id}?name=${productName}&price=${productPrice}&stock=${productStock}&url=${imageUrl}&description=${description}`}
      style={{ textDecoration: "none" }}
    >
      <Card className="semi-dark-background product-card">
        <Card.Img variant="top" src={imageUrl} className={"card-image"} />
        <Card.Body>
          <Card.Title className="text-orange">{productName}</Card.Title>
          <Card.Text>Rp. {productPrice}</Card.Text>
          <Card.Text>Stock : {productStock}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;
