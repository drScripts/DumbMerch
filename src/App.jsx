import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth, DetailProduct, HomePage, Profile } from "./pages";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
