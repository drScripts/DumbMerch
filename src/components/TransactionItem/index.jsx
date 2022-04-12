import React from "react";
import Logo from "../../assets/dumb-merch-logo.png";
import styles from "./TransactionItem.module.css";
import { Row, Col } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";

const Index = ({ transaction }) => {
  const generateProductImg = (products) => {
    let colWidth = products.length >= 2 ? 6 : 12;

    return (
      <div className={`${styles.imageContainer}`}>
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
      </div>
    );
  };

  const productName = transaction.transactionItems
    .map((item, index) => item?.itemProduct?.name)
    .join(", ");

  const productImage = transaction.transactionItems?.map(
    (item, index) => item?.itemProduct?.image_url
  );

  const getDate = (dates) => {
    const dateTime = new Date(dates);
    const date = dateTime.getDate();
    const month = dateTime.getMonth();
    const year = dateTime.getFullYear();

    return `${date}-${month}-${year}`;
  };

  return (
    <Link
      to={`/transaction/${transaction.id}`}
      className={"text-decoration-none"}
    >
      <div
        className={`d-flex align-items-center justify-content-between bg-semi-dark-grey px-4 py-3 mb-3 ${styles.cardTransaction}`}
      >
        <div className="d-flex gap-4 align-items-center mb-2">
          {generateProductImg(productImage)}
          <div className="d-flex flex-column justify-content-between ">
            <div>
              <h3 className="text-orange mb-0 ellipsis max-line-1 w-80">
                {productName}
              </h3>
              <p className={`text-orange mb-4`}>
                {getDate(transaction?.createdAt)}
              </p>
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
    </Link>
  );
};

export default Index;
