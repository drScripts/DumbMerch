import styles from "./DetailTransaction.module.css";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Navbar } from "../../containers";
import { useParams, useNavigate } from "react-router-dom";
import { SingleTransactionItem } from "../../components";
import CurrencyFormat from "react-currency-format";
import { useQuery } from "react-query";
import { API } from "../../services";
import { useEffect } from "react";

const DetailTransaction = () => {
  document.title = "DumbMerch | Detail Transaction";

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: transaction } = useQuery("transactionChace", async () => {
    const { data } = await API.get(`/transaction/${id}`);
    return data?.data?.transaction;
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const midtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    const scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const onPayClick = (url) => {
    const snapToken = url?.split("/")?.pop();

    window?.snap?.pay(snapToken, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        navigate("/profile");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        navigate("/profile");
      },
    });
  };

  return (
    <div>
      <Navbar />
      <Container className={"mt-4"}>
        <Row>
          <Col md={6}>
            <h2 className="text-orange mb-4">Detail Transaction</h2>
            <div className={`${styles.transactionFields}`}>
              {transaction?.transactionItems?.map((item, index) => (
                <SingleTransactionItem
                  product={item.itemProduct}
                  qty={item.qty}
                  key={index}
                />
              ))}
            </div>
          </Col>
          <Col md={6}>
            <h2 className="text-orange mb-4">Detail Shipment</h2>
            <h4 className="text-light">Address</h4>
            <p className="text-justify text-light">
              {transaction?.user?.profile?.address}
            </p>
            <h5 className="text-light">
              Shipment Services :{" "}
              {transaction?.raw_body?.item_details?.at(-1)?.name}
            </h5>
            <h5 className="text-light">
              Shipment Cost :{" "}
              <CurrencyFormat
                value={transaction?.raw_body?.item_details?.at(-1)?.price}
                prefix={"Rp. "}
                thousandSeparator={true}
                displayType={"text"}
              />
            </h5>
            <h5 className="text-light">
              Total :{" "}
              <CurrencyFormat
                value={transaction?.total}
                prefix={"Rp. "}
                thousandSeparator={true}
                displayType={"text"}
              />
            </h5>
            <h5 className="text-light">Status : {transaction?.status}</h5>
            {(transaction?.status || "pending") === "pending" ? (
              <Button
                variant={"primary"}
                className="text-light fw-bolder w-100 mt-5"
                onClick={() => {
                  onPayClick(transaction?.payment_url);
                }}
              >
                Pay Transaction
              </Button>
            ) : (
              <Button
                disabled={true}
                className="w-100 mt-5"
                variant={"secondary"}
              >
                Pay Transaction
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailTransaction;
