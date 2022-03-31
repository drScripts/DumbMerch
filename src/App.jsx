import React from "react";
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
} from "./pages";
import { Adminmiddleware, AuthMiddleware } from "./middleware";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth loginPage={false} />} />

        <Route path="/" element={<AuthMiddleware />}>
          <Route index element={<HomePage />} />
          <Route path={"product/:productId"} element={<DetailProduct />} />
          <Route path={"profile"} element={<Profile />} />
          <Route path={"complain"} element={<Complain />} />
          <Route path={"cart"} element={<Cart />} />
        </Route>

        <Route path="/admin" element={<Adminmiddleware />}>
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
