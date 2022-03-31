import React from "react";
import Logo from "../../assets/dumb-merch-logo.png";
import styles from "./TransactionItem.module.css";

const Index = ({ product }) => {
  return (
    <div
      className={`d-flex align-items-center justify-content-between bg-semi-dark-grey px-4 py-3 mb-3 ${styles.cardTransaction}`}
    >
      <div className="d-flex gap-3">
        <img
          src="https://images.unsplash.com/photo-1560762484-813fc97650a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt=""
          className={`${styles.productImage}`}
        />
        <div className="d-flex flex-column justify-content-between ">
          <div>
            <h3 className="text-orange mb-0">Mouse</h3>
            <p className={`text-orange mb-0`}>Saturday, 14 Juli 2021</p>
            <p className="text-light">Price : Rp.500.000</p>
          </div>

          <div>
            <p className={`text-light text-bold mb-0`}>
              <b>Sub Total</b> : 500.000
            </p>
          </div>
        </div>
      </div>
      <img alt="" src={Logo} width={70} height={68} />
    </div>
  );
};

export default Index;
