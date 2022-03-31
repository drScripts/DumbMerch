import "./ProductCard.css";

import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product = {} }) => {
  const {
    name = "",
    price = 0,
    stock = 0,
    fileLink = "",
    description = "",
    id,
  } = product;

  return (
    <Link
      to={`/product/${id}?name=${name}&price=${price}&stock=${stock}&url=${fileLink}&description=${description}`}
      style={{ textDecoration: "none" }}
    >
      <Card className="semi-dark-background product-card">
        <Card.Img variant="top" src={fileLink} className={"card-image"} />
        <Card.Body>
          <Card.Title className="text-orange">{name}</Card.Title>
          <Card.Text>Rp. {price}</Card.Text>
          <Card.Text>Stock : {stock}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;
