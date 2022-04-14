import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const MainMiddleware = () => {
  // eslint-disable-next-line no-unused-vars
  const [userState, dispatch] = useContext(UserContext);

  const params = localStorage.getItem("routes");

  if (userState?.user?.role) {
    return userState?.user?.role === "admin" ? (
      <Navigate to={"/admin"} />
    ) : (
      <Navigate to={params || "/"} />
    );
  } else {
    return <Outlet />;
  }
};

export default MainMiddleware;
