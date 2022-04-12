import "./Navbar.css";
import {
  Navbar as BootstrapNavbar,
  Container,
  Nav,
  Badge,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import Logo from "../../assets/dumb-merch-logo.png";
import CartIcon from "../../assets/cart-icon.png";
import { UserContext } from "../../Context/UserContext";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [userState, dispatch] = useContext(UserContext);

  const onLogoutHandler = () => {
    localStorage.removeItem("usritms");
    dispatch({
      type: "USER_LOGOUT",
    });
  };

  const { role = "" } = userState?.user;

  return (
    <BootstrapNavbar bg="none" variant="dark" expand="lg">
      <Container fluid className="px-5">
        <Link to={"/"} className="navbar-brand">
          <img
            alt=""
            src={Logo}
            width="70"
            height="70"
            className="d-inline-block align-top"
          />
        </Link>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {role === "user" && (
              <Link to={"/"}>
                <div
                  className={`nav-link ${currentPath === "/" ? "active" : ""}`}
                >
                  Home
                </div>
              </Link>
            )}
            <Link to={`${role === "admin" ? "/admin/complain" : "/complain"}`}>
              <div
                className={`nav-link ${
                  currentPath.search("complain") !== -1 ? "active" : ""
                }`}
              >
                Complain
              </div>
            </Link>
            {role === "user" && (
              <Link to={"/profile"}>
                <div
                  className={`nav-link ${
                    currentPath === "/profile" ? "active" : ""
                  }`}
                >
                  Profile
                </div>
              </Link>
            )}
            {role === "admin" && (
              <>
                <Link to={"/admin/category"}>
                  <div
                    className={`nav-link ${
                      currentPath === "/admin/category" ? "active" : ""
                    }`}
                  >
                    Category
                  </div>
                </Link>
                <Link to={"/admin/product"}>
                  <div
                    className={`nav-link ${
                      currentPath === "/admin/product" ? "active" : ""
                    }`}
                  >
                    Product
                  </div>
                </Link>
              </>
            )}

            <div className="nav-link" onClick={onLogoutHandler}>
              Logout
            </div>

            {role === "user" && (
              <Link to={"/cart"} className={"ms-md-4"}>
                <div className={`nav-link`}>
                  <img
                    src={CartIcon}
                    width={35}
                    height={35}
                    alt={"cart icon"}
                  />
                  <Badge bg="" pill className={"position-relative"}>
                    {userState.cartCount}
                  </Badge>
                </div>
              </Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
