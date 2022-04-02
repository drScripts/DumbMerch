import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AddCategory,
  AddProduct,
  Auth,
  Cart,
  Category,
  Complain,
  DetailProduct,
  EditCategory,
  EditProduct,
  HomePage,
  Product,
  Profile,
  DetailTransaction,
} from "./pages";
import { Adminmiddleware, AuthMiddleware } from "./middleware";
import MainMiddleware from "./middleware/MainMiddleware";

const mockProducts = [
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

const cartMock = [
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
];

const mockTransaction = [
  {
    id: 1,
    products: [
      {
        fileName: "Mouse.jpg",
        fileLink:
          "https://thermaltake.azureedge.net/pub/media/catalog/product/cache/6bf0ed99c663954fafc930039201ed07/l/2/l20m01.jpg",
        name: "Mouse",
        description: "lorem ipsum mouse ...",
        price: 500000,
        stock: 600,
        id: 1,
        qty: 10,
      },
    ],
    total: 5000000,
  },
  {
    id: 2,
    products: [
      {
        fileName: "Mouse.jpg",
        fileLink:
          "https://thermaltake.azureedge.net/pub/media/catalog/product/cache/6bf0ed99c663954fafc930039201ed07/l/2/l20m01.jpg",
        name: "Mouse",
        description: "lorem ipsum mouse ...",
        price: 500000,
        stock: 600,
        id: 1,
        qty: 10,
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
        qty: 10,
      },
    ],
    total: 5000000 + 7000000,
  },
  {
    id: 3,
    products: [
      {
        fileName: "Mouse.jpg",
        fileLink:
          "https://thermaltake.azureedge.net/pub/media/catalog/product/cache/6bf0ed99c663954fafc930039201ed07/l/2/l20m01.jpg",
        name: "Mouse",
        description: "lorem ipsum mouse ...",
        price: 500000,
        stock: 600,
        id: 1,
        qty: 10,
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
        qty: 10,
      },
      {
        fileName: "Bag.jpg",
        fileLink: "https://rohan.imgix.net/product/04910565.jpg",
        name: "Bag",
        description: "lorem ipsum bag ...",
        price: 500000,
        stock: 600,
        id: 3,
        qty: 10,
      },
    ],
    total: 5000000 + 7000000 + 5000000,
  },
  {
    id: 4,
    products: [
      {
        fileName: "Mouse.jpg",
        fileLink:
          "https://thermaltake.azureedge.net/pub/media/catalog/product/cache/6bf0ed99c663954fafc930039201ed07/l/2/l20m01.jpg",
        name: "Mouse",
        description: "lorem ipsum mouse ...",
        price: 500000,
        stock: 600,
        id: 1,
        qty: 10,
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
        qty: 10,
      },
      {
        fileName: "Bag.jpg",
        fileLink: "https://rohan.imgix.net/product/04910565.jpg",
        name: "Bag",
        description: "lorem ipsum bag ...",
        price: 500000,
        stock: 600,
        id: 3,
        qty: 10,
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
        qty: 10,
      },
    ],
    total: 5000000 + 7000000 + 5000000 + 250000,
  },
];

const App = () => {
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(mockProducts));
    localStorage.setItem("cart", JSON.stringify(cartMock));
    localStorage.setItem("transactions", JSON.stringify(mockTransaction));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMiddleware />}>
          <Route path="login" element={<Auth />} />
          <Route path="register" element={<Auth loginPage={false} />} />
        </Route>
        <Route path="/" element={<AuthMiddleware />}>
          <Route index element={<HomePage />} />
          <Route path={"product/:productId"} element={<DetailProduct />} />
          <Route path={"profile"} element={<Profile />} />
          <Route path={"complain"} element={<Complain />} />
          <Route path={"cart"} element={<Cart />} />
          <Route
            path={"transaction/:transactionId"}
            element={<DetailTransaction />}
          />
        </Route>

        <Route path="/admin" element={<Adminmiddleware />}>
          <Route index element={<Category />} />
          <Route path={"category"} element={<Category />} />
          <Route path={"category/add"} element={<AddCategory />} />
          <Route path={"category/:categoryId"} element={<EditCategory />} />
          <Route path={"product"} element={<Product />} />
          <Route path={"product/add"} element={<AddProduct />} />
          <Route path={"product/:productId"} element={<EditProduct />} />
          <Route path={"complain"} element={<Complain isAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
