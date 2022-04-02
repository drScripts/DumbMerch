import React from "react";
import Logo from "../../assets/dumb-merch-logo.png";
import styles from "./TransactionItem.module.css";
import { Row, Col } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

const Index = ({ transaction }) => {
  const generateProductImg = (products) => {
    let colWidth = products.length >= 2 ? 6 : 12;

    return (
      <Row className={`${styles.transactionImageField}`}>
        {products.map((val, i) => {
          const height =
            products.length === 3 && i === 2
              ? styles.halfHeight
              : styles.fullHeight;

          const columnSize = products.length === 3 && i === 2 ? 12 : colWidth;

          const moreProduct = products.length - 3;

          if (i < 4) {
            if (products.length > 4 && i === 3) {
              return (
                <Col
                  md={columnSize}
                  className={`${styles.columns} d-flex align-items-center justify-content-center`}
                  key={i}
                >
                  <h3 className="text-light">+{moreProduct}</h3>
                </Col>
              );
            } else {
              return (
                <Col md={columnSize} className={`${styles.columns}`} key={i}>
                  <img
                    src={val}
                    alt=""
                    className={`${styles.productImage} ${height}`}
                  />
                </Col>
              );
            }
          } else {
            return null;
          }
        })}
      </Row>
    );
  };

  const productName = transaction.products
    .map((product, index) => product.name)
    .join(", ");

  const productImage = transaction.products.map(
    (product, index) => product.fileLink
  );

  return (
    <div
      className={`d-flex align-items-center justify-content-between bg-semi-dark-grey px-4 py-3 mb-3 ${styles.cardTransaction}`}
    >
      <div className="d-flex gap-4 align-items-center">
        {generateProductImg(productImage)}
        <div className="d-flex flex-column justify-content-between ">
          <div>
            <h3 className="text-orange mb-0 ellipsis max-line-1">
              {productName}
            </h3>
            <p className={`text-orange mb-4`}>Saturday, 14 Juli 2021</p>
          </div>

          <div>
            <p className={`text-light text-bold mb-0`}>
              <b>Sub Total</b> :{" "}
              <CurrencyFormat
                value={transaction.total}
                prefix={"Rp."}
                displayType="text"
                thousandSeparator={true}
              />
            </p>
          </div>
        </div>
      </div>
      <img alt="Logo" src={Logo} width={70} height={68} />
    </div>
  );
};

export default Index;
