import React from "react";
import Logo from "../../assets/dumb-merch-logo.png";
import styles from "./SingleTransactionItems.module.css";
import CurrencyFormat from "react-currency-format";

const SingleTransactionItem = ({ product, qty, date = false }) => {
  return (
    <div
      className={`d-flex align-items-center justify-content-between bg-semi-dark-grey px-4 py-3 mb-3 ${styles.cardTransaction}`}
    >
      <div className="d-flex gap-4 align-items-center">
        <img
          src={product.fileLink}
          alt=""
          className={`${styles.productImage}`}
        />
        <div className="d-flex flex-column justify-content-between ">
          <div>
            <h3 className="text-orange mb-0 ellipsis max-line-1">
              {product.name}
            </h3>
            {date && (
              <p className={`text-orange mb-0`}>Saturday, 14 Juli 2021</p>
            )}
            <p className={`text-light mb-0`}>
              Price :{" "}
              <CurrencyFormat
                value={product.price}
                prefix={"Rp."}
                displayType="text"
                thousandSeparator={true}
              />
            </p>
            <p className={`text-light mb-4`}>
              Quantity : {product.qty || qty}{" "}
            </p>
          </div>

          <div>
            <p className={`text-light text-bold mb-0`}>
              <b>Sub Total</b> :{" "}
              <CurrencyFormat
                value={product.price * (product.qty || qty)}
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

export default SingleTransactionItem;
