import "./ProductCard.css";

import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

const ProductCard = ({ product = {} }) => {
  const { name = "", price = 0, stock = 0, image_url = "", id } = product;

  return (
    <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
      <Card className="semi-dark-background product-card">
        <Card.Img variant="top" src={image_url} className={"card-image"} />
        <Card.Body>
          <Card.Title className="text-orange ellipsis max-line-2">
            {name}
          </Card.Title>
          <Card.Text>
            <CurrencyFormat
              value={price}
              prefix="Rp. "
              thousandSeparator={true}
              displayType={"text"}
            />
          </Card.Text>
          <Card.Text>Stock : {stock}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;
