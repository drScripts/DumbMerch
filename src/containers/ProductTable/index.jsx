import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ProductTableItem } from "../../components";

const mockProduct = [
  {
    fileName: "Mouse.jpg",
    fileLink:
      "https://thermaltake.azureedge.net/pub/media/catalog/product/cache/6bf0ed99c663954fafc930039201ed07/l/2/l20m01.jpg",
    name: "Mouse",
    description: "lorem ipsum mouse ...",
    price: 500000,
    stock: 600,
    id: 1,
  },
  {
    fileName: "Keyboard.jpg",
    fileLink:
      "https://jete.id/wp-content/uploads/2021/09/03.-keyboard-gaming-keyboad-komputer-762x400.jpg",
    name: "Keyboard",
    description: "lorem ipsum keyboard ...",
    price: 700000,
    stock: 600,
    id: 2,
  },
  {
    fileName: "Bag.jpg",
    fileLink: "https://rohan.imgix.net/product/04910565.jpg",
    name: "Bag",
    description: "lorem ipsum bag ...",
    price: 500000,
    stock: 600,
    id: 3,
  },
  {
    fileName: "Stationary.jpg",
    fileLink:
      "https://5.imimg.com/data5/NN/SE/OX/SELLER-11524350/mahadev-gift-and-stationary-vadgoan-belgaum-belgaum-wnsxb-500x500.jpg",
    name: "Stationary",
    description: "lorem ipsum stationary ...",
    price: 25000,
    stock: 600,
    id: 4,
  },
  {
    fileName: "Doll.jpg",
    fileLink: "https://upload.wikimedia.org/wikipedia/id/d/d1/The_Doll.jpg",
    name: "Doll",
    description: "lorem ipsum doll ...",
    price: 125000,
    stock: 600,
    id: 5,
  },
  {
    fileName: "Pillow.jpg",
    fileLink: "https://rnb.scene7.com/is/image/roomandboard/452325?scl=1",
    name: "Pillow",
    description: "lorem ipsum pillow ...",
    price: 300000,
    stock: 600,
    id: 6,
  },
];

const Index = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(mockProduct);
  }, []);

  return (
    <Table responsive striped hover variant="dark" className="mt-3">
      <thead>
        <tr>
          <th>No</th>
          <th>Photo</th>
          <th>Product Name</th>
          <th>Product Desc</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((val, i) => (
          <ProductTableItem
            description={val.description}
            fileLink={val.fileLink}
            fileName={val.fileName}
            name={val.name}
            price={val.price}
            id={val.id}
            no={i + 1}
            stock={val.stock}
            key={val.id}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default Index;
