import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const AuthMiddleware = () => {
  const [userState] = useContext(UserContext);

  const { role } = userState?.user;

  return role === "user" ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AuthMiddleware;
