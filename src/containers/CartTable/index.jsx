import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { CartTableItem } from "../../components";
import CurrencyFormat from "react-currency-format";

const Index = () => {
  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);

  const countTotal = (carts) => {
    let totalNow = 0;
    carts.forEach((val, i) => {
      totalNow += val.product.price * val.qty;
    });
    setTotal(totalNow);
  };

  const updateCarts = (id, qty) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const newCart = cart.map((val, i) => {
      if (val.id === id) {
        val.qty = qty;
      }

      return val;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    getCarts();
    countTotal();
  };

  const getCarts = () => {
    setCarts(JSON.parse(localStorage.getItem("cart")));
  };

  useEffect(() => {
    countTotal(carts);
  }, [carts]);

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <Table responsive striped hover variant="dark" className="mt-3">
      <thead>
        <tr>
          <th>No</th>
          <th>Photo</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Subtotal</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {carts.map((val, i) => (
          <CartTableItem
            no={i + 1}
            id={val.id}
            product={val.product}
            qty={val.qty}
            key={val.id}
            onQtyChange={updateCarts}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <th colSpan={4}></th>
          <th>
            <CurrencyFormat
              value={total}
              prefix={"Rp. "}
              thousandSeparator={true}
              displayType={"text"}
            />
          </th>
          <th>
            <Button variant="success" className="text-light">
              Checkout
            </Button>
          </th>
        </tr>
      </tfoot>
    </Table>
  );
};

export default Index;
