import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Auth,
  Category,
  Complain,
  DetailProduct,
  EditCategory,
  EditProduct,
  HomePage,
  Product,
  Profile,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth loginPage={false} />} />

        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path={"product/:productId"} element={<DetailProduct />} />
          <Route path={"profile"} element={<Profile />} />
          <Route path={"complain"} element={<Complain />} />
        </Route>

        <Route path="/admin">
          <Route path={"category"} element={<Category />} />
          <Route path={"category/:categoryId"} element={<EditCategory />} />
          <Route path={"product"} element={<Product />} />
          <Route path={"product/:productId"} element={<EditProduct />} />
          <Route path={"complain"} element={<Complain isAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
