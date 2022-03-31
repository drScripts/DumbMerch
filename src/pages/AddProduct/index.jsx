import React, { useState } from "react";
import { Container, Button, Form as BootstrapForm } from "react-bootstrap";
import { Navbar } from "../../containers";
import { Form, InputFile } from "../../components";

const Index = () => {
  const [state, setState] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    file: {},
  });

  const onchangeHandler = (value) => {
    setState({
      ...state,
      ...value,
    });
  };

  const onFileChange = (file) => {
    setState({
      ...state,
      file,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const { name, price, stock, file, description } = state;

    if (name && price && stock && file && description) {
      const products = JSON.parse(localStorage.getItem("products"));

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const fileLink = reader.result;
        const newProduct = {
          name,
          price,
          stock,
          fileName: file.name,
          description,
          fileLink,
        };
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
      };
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="mt-5">
        <h1 className="text-light mb-5">Edit Product</h1>
        <BootstrapForm onSubmit={onSubmitHandler}>
          <InputFile fileName={state.file.name} onChange={onFileChange} />

          <Form
            placeHolder="Product Name"
            type="text"
            value={state.name}
            onChange={onchangeHandler}
            className="mb-3"
            name={"name"}
          />
          <textarea
            name="description"
            onChange={(e) =>
              onchangeHandler({ [e.target.name]: e.target.value })
            }
            className="custom-form-input mb-2"
            placeholder={"Product Descriptions"}
            rows={8}
            value={state.description}
          ></textarea>
          <Form
            placeHolder="Product Price"
            type="number"
            value={state.price}
            onChange={onchangeHandler}
            className="mb-3"
            name={"price"}
          />
          <Form
            placeHolder="Product Stock"
            type="number"
            value={state.stock}
            onChange={onchangeHandler}
            className="mb-5"
            name={"stock"}
          />
          <Button type="submit" variant="success" className="w-100 mb-3">
            Save
          </Button>
        </BootstrapForm>
      </Container>
    </div>
  );
};

export default Index;
