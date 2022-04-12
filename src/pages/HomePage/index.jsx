import React, { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Navbar, FilterProducts } from "../../containers";
import { ProductCard } from "../../components";
import { API } from "../../services";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

const HomePage = () => {
  const [params, setParams] = useState({});
  const [nextState, setNextState] = useState(null);
  const [temParams, setTemParams] = useState({});

  const onChangeHandler = (e) => {
    if (!e.start) delete e.start;
    if (!e.end) delete e.end;
    if (!e.category) delete e.category;

    setTemParams({
      ...temParams,
      ...e,
    });
  };

  const { data: products } = useQuery(
    ["productsChace", params],
    async () => {
      const { data } = await API.get("/products", {
        params,
      });

      if (data?.pagination?.next && data?.pagination?.next !== "null") {
        const pageQuery = data.pagination.next.split("page=").pop();
        const pageCurrent = pageQuery.split("&").at(0);

        setNextState(pageCurrent);
      } else {
        setNextState(null);
      }
      return data?.data?.products;
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
    }
  );

  const onNext = () => {
    setParams({
      ...params,
      page: nextState,
    });
  };

  const onSearch = () => {
    setParams(temParams);
  };

  return (
    <section className="dark-body pb-3">
      <Navbar />
      <Container className="mt-5">
        <h2 className="text-orange mb-3">Product</h2>
        <FilterProducts onChange={onChangeHandler} onSearch={onSearch} />
        <Row>
          {products?.map((product, i) => (
            <Col md={3} className="mb-3" key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
          {nextState ? <Button onClick={onNext}>Load More</Button> : <></>}
        </Row>
      </Container>
    </section>
  );
};

export default HomePage;
