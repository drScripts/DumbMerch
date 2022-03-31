import "./Navbar.css";
import {
  Navbar as BootstrapNavbar,
  Container,
  Nav,
  Badge,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import Logo from "../../assets/dumb-merch-logo.png";
import CartIcon from "../../assets/cart-icon.png";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
            <Link to={"/"}>
              <div
                className={`nav-link ${currentPath === "/" ? "active" : ""}`}
              >
                Home
              </div>
            </Link>
            <Link to={"/complain"}>
              <div
                className={`nav-link ${
                  currentPath === "/complain" ? "active" : ""
                }`}
              >
                Complain
              </div>
            </Link>
            <Link to={"/profile"}>
              <div
                className={`nav-link ${
                  currentPath === "/profile" ? "active" : ""
                }`}
              >
                Profile
              </div>
            </Link>
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

            <Link to={"/register"}>
              <div className="nav-link">Logout</div>
            </Link>

            <Link to={"/cart"} className={"ms-md-4"}>
              <div className={`nav-link`}>
                <img src={CartIcon} width={35} height={35} alt={"cart icon"} />
                <Badge pill bg="info" className={"position-relative"}>
                  0
                </Badge>
              </div>
            </Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
