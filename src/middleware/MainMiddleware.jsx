import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const MainMiddleware = () => {
  const user = JSON.parse(localStorage.getItem("usritms"));
  console.log(user);
  if (user) {
    return user.role === "admin" ? (
      <Navigate to={"/admin"} />
    ) : (
      <Navigate to={"/"} />
    );
  } else {
    return <Outlet />;
  }
};

export default MainMiddleware;
