import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { CartTableItem } from "../../components";
import CurrencyFormat from "react-currency-format";

const cartMock = {
  items: [
    {
      id: 1,
      userId: 1,
      productId: 1,
      product: {
        fileName: "Mouse.jpg",
        fileLink:
          "https://thermaltake.azureedge.net/pub/media/catalog/product/cache/6bf0ed99c663954fafc930039201ed07/l/2/l20m01.jpg",
        name: "Mouse",
        description: "lorem ipsum mouse ...",
        price: 500000,
        stock: 600,
        id: 1,
      },
      qty: 1,
    },
    {
      id: 2,
      userId: 1,
      productId: 2,
      product: {
        fileName: "Keyboard.jpg",
        fileLink:
          "https://jete.id/wp-content/uploads/2021/09/03.-keyboard-gaming-keyboad-komputer-762x400.jpg",
        name: "Keyboard",
        description: "lorem ipsum keyboard ...",
        price: 700000,
        stock: 600,
        id: 2,
      },
      qty: 1,
    },
  ],
  total: 700000 + 500000,
};

const Index = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    setCarts(cartMock.items);
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
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <th colSpan={4}></th>
          <th>
            <CurrencyFormat
              value={10000}
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
