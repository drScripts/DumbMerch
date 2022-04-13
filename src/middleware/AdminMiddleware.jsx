import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Adminmiddleware = () => {
  const [userState] = useContext(UserContext);

  const { role = "" } = userState?.user;

  return role === "admin" ? <Outlet /> : <Navigate to={"/login"} />;
};

export default Adminmiddleware;
