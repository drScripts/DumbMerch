import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const Adminmiddleware = () => {
  const { role = "" } = JSON.parse(localStorage.getItem("user") || "{}");

  return role === "admin" ? <Outlet /> : <Navigate to={"/login"} />;
};

export default Adminmiddleware;
