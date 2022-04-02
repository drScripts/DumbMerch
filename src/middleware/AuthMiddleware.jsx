import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthMiddleware = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user?.role === "user" ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AuthMiddleware;
