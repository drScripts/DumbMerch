import React from "react";
import { Col, Form } from "react-bootstrap";

const SimpleSelect = ({ datas, md = 6, label, name, onChangeHandler }) => {
  const onChange = (e) => {
    onChangeHandler({
      name: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <Col md={md}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className="text-light">{label}</Form.Label>
        <Form.Select
          aria-label="Default select example"
          className="bg-semi-dark-grey text-light"
          name={name}
          onChange={onChange}
        >
          {datas.map((data, index) => (
            <option value={data.value} key={index}>
              {data.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Col>
  );
};

export default SimpleSelect;
