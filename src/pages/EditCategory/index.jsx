import React, { useState } from "react";
import { Container, Button, Form as BootstrapForm } from "react-bootstrap";
import { Navbar } from "../../containers";
import { Form } from "../../components";

const Index = () => {
  const [state, setState] = useState({
    name: "",
  });

  const onchangeHandler = (text) => {
    setState({
      ...state,
      ...text,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <div>
      <Navbar />
      <Container className="mt-5">
        <h1 className="text-light mb-5">Edit Category</h1>
        <BootstrapForm onSubmit={onSubmitHandler}>
          <Form
            placeHolder="Category Name"
            type="text"
            value={state.name}
            onChange={onchangeHandler}
            className="mb-5"
            name={"name"}
          />
          <Button type="submit" variant="success" className="w-100">
            Save
          </Button>
        </BootstrapForm>
      </Container>
    </div>
  );
};

export default Index;
