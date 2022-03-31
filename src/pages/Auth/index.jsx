import styles from "./Auth.module.css";
import Logo from "../../assets/dumb-merch-logo.png";
import { Button } from "../../components";
import { Col, Row } from "react-bootstrap";
import { AuthForm } from "../../containers";
import { Link } from "react-router-dom";

const Auth = ({ loginPage = true }) => {
  return (
    <section className={`${styles.loginBody} pt-5 pb-4 pb-md-0`}>
      <div className="container">
        <Row>
          <Col md={7}>
            <img
              src={Logo}
              alt="Dumb merch logo"
              className={`${styles.logoImg}`}
            />
            <h1 className={`mt-3 ${styles.titleLogo}`}>
              Easy, Fast and Reliable
            </h1>
            <p className={`${styles.titleDescription} mt-2 mb-5`}>
              Go shopping for merchandise, just go to dumb merch shopping. the
              biggest merchandise in <b>Indonesia</b>
            </p>
            <Link to={"/login"}>
              <Button title="Login" bgColor="bg-red" />
            </Link>
            <Link to={"/register"}>
              <Button title="Register" fontColor="c-grey" className={"ms-3"} />
            </Link>
          </Col>
          <Col className="align-self-center mt-md-0 mt-3">
            <AuthForm isLogin={loginPage} />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Auth;
