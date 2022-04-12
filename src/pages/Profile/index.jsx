import styles from "./Profile.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Navbar } from "../../containers";
import { ProfileItems, TransactionItem } from "../../components";
import { UserContext } from "../../Context/UserContext";
import { useQuery } from "react-query";
import { API } from "../../services";
import { toast } from "react-toastify";

const Profile = () => {
  const [userState, dispatch] = useContext(UserContext);

  const { data: transactions } = useQuery(
    "transactionsChace",
    async () => {
      const { data } = await API.get("/transactions");

      return data?.data?.transactions;
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
    }
  );

  return (
    <section>
      <Navbar />
      <Container className="mt-4">
        <Row>
          <Col md={6}>
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="text-orange mb-3">My Profile</h1>
              <Link to={"/profile/edit"}>
                <Button variant="secondary fw-bold">Edit</Button>
              </Link>
            </div>
            <Row>
              <Col md={6}>
                <img
                  src={userState?.user?.profile?.profile_picture}
                  alt=""
                  className={`${styles.profileImg}`}
                />
              </Col>
              <Col md={6}>
                <ProfileItems title={"Name"} value={userState?.user?.name} />
                <ProfileItems title={"Email"} value={userState?.user?.email} />
                <ProfileItems
                  title={"Phone"}
                  value={userState?.user?.profile.phone_number}
                />
                <ProfileItems
                  title={"Gender"}
                  value={userState?.user?.profile.gender}
                />
                <ProfileItems
                  title={"Address"}
                  value={userState?.user?.profile?.address}
                />
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <h1 className="text-orange mb-3">My Transactions</h1>
            <div className={`${styles.transactionFields}`}>
              {transactions?.map((transaction, index) => (
                <TransactionItem transaction={transaction} key={index} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
