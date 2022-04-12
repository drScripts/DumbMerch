import styles from "./DetailProduct.module.css";
import { Navbar } from "../../containers";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Button } from "../../components";
import CurrencyFormat from "react-currency-format";
import { API } from "../../services";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const DetailProduct = () => {
  const { id } = useParams();
  const [userState, dispatch] = useContext(UserContext);

  const { data: product } = useQuery(
    "productChace",
    async () => {
      const { data } = await API.get(`/product/${id}`);
      return data.data.product;
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
    }
  );

  const { mutate: onSubmit } = useMutation(
    async () => {
      const dataBody = JSON.stringify({ product_id: id, quantity: 1 });

      return API.post("/cart", dataBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
      onSuccess: () => {
        dispatch({
          type: "CART_ADD",
        });
        toast.success("Product added to your cart");
      },
    }
  );

  return (
    <section className="pb-4">
      <Navbar />
      <Container className="mt-4">
        <Row>
          <Col>
            <img
              className={`${styles.imageProduct}`}
              src={product?.image_url}
              alt=""
            />
          </Col>
          <Col md={6}>
            <h1 className="text-orange">{product?.name}</h1>
            <p className="text-light">Stock : {product?.stock}</p>
            <p className={`text-light ${styles.productDescription}`}>
              {product?.description}
            </p>
            <h3 className="text-end text-orange mb-5 mt-4">
              <CurrencyFormat
                value={product?.price || 0}
                prefix="Rp. "
                thousandSeparator={true}
                displayType={"text"}
              />
            </h3>
            <Button
              title="Buy"
              width="w-100"
              bgColor="bg-red"
              onClick={onSubmit}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DetailProduct;
