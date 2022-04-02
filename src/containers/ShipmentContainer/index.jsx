import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Button, Col, Form, Row } from "react-bootstrap";

const ShipmentContainer = () => {
  const [shipment, setShipment] = useState("jne");

  const shipmentChangeHandler = (e) => {
    setShipment(e.target.value);
  };

  return (
    <Col md={6}>
      <h2 className="text-orange mb-4">Detail Shipment</h2>
      <h4 className="text-light">Address</h4>
      <p className="text-justify text-light">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Select
            aria-label="Default select example"
            className="bg-semi-dark-grey text-light"
          >
            <option>Select Your Provence</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Select
            aria-label="Default select example"
            className="bg-semi-dark-grey text-light"
          >
            <option>Select Your City</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
      </Row>
      <div className="d-flex gap-4 mb-3">
        <Form.Check
          type={"radio"}
          id={`jne`}
          label={`JNE`}
          className="text-light"
          checked={shipment === "jne"}
          name={"shipment"}
          value="jne"
          onChange={shipmentChangeHandler}
        />
        <Form.Check
          type={"radio"}
          id={`pos`}
          label={`POS INDONESIA`}
          className="text-light"
          name={"shipment"}
          checked={shipment === "pos"}
          value="pos"
          onChange={shipmentChangeHandler}
        />
        <Form.Check
          type={"radio"}
          id={`tiki`}
          label={`TIKI`}
          className="text-light"
          name={"shipment"}
          checked={shipment === "tiki"}
          value="tiki"
          onChange={shipmentChangeHandler}
        />
      </div>

      <h5 className="text-light">
        Shipment Cost :{" "}
        <CurrencyFormat
          value={0}
          prefix={"Rp. "}
          thousandSeparator={true}
          displayType={"text"}
        />
      </h5>
      <h5 className="text-light">
        Services Cost :{" "}
        <CurrencyFormat
          value={5000}
          prefix={"Rp. "}
          thousandSeparator={true}
          displayType={"text"}
        />
      </h5>
      <h5 className="text-light">
        Total :{" "}
        <CurrencyFormat
          value={1000000}
          prefix={"Rp. "}
          thousandSeparator={true}
          displayType={"text"}
        />
      </h5>
      <Button disabled variant="success" className="w-100 mt-4 mb-3">
        Checkout
      </Button>
    </Col>
  );
};

export default ShipmentContainer;
