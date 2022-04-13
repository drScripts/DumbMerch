import React, { useState } from "react";
import { Container, Button, Form as BootstrapForm } from "react-bootstrap";
import { Navbar } from "../../containers";
import { Form, InputFile, LoadingCircle } from "../../components";
import Select from "react-select";
import { API } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

const selectStyle = {
  control: (base, state) => ({
    ...base,
    background: "#d2d2d240",
    borderRadius: "5px",
    border: "2px solid #d3d3d3",
  }),
  menu: (base) => ({
    ...base,
    background: "#d2d2d240",
    color: "#fff",
  }),
  menuList: (base) => ({
    ...base,
    background: "#d2d2d240",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "black",
  }),
};

const AddProduct = () => {
  document.title = "DumbMerch Admin | Add Product";
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    file: {},
    categories: [],
  });

  const { data: categories } = useQuery("categoryChace", async () => {
    const { data } = await API.get("/categories");

    return data.data.categories.map((category, index) => ({
      value: category.id,
      label: category.name,
    }));
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

  const onSelectHandler = (value) => {
    const mappedData = value.map((category, index) => category.value);
    setState({
      ...state,
      categories: mappedData,
    });
  };

  const { mutate: onSubmitHandler, isLoading } = useMutation(
    async (e) => {
      e.preventDefault();

      const { name, price, stock, file, description, categories } = state;

      if (
        name &&
        price &&
        stock &&
        file.name &&
        description &&
        categories.length
      ) {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("description", description);

        categories.forEach((category, index) =>
          formData.append("category_ids[]", category)
        );

        formData.append("image", file);

        return await API.post("/product", formData);
      } else {
        throw new Error("Please fill all form!");
      }
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
      onSuccess: () => {
        navigate("/admin/product");
      },
    }
  );

  return (
    <div>
      <Navbar />
      <Container className="mt-5">
        <h1 className="text-light mb-5">Add Product</h1>
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
            name={"stock"}
            className="mb-3"
          />
          <Select
            className="mb-5"
            isMulti
            styles={selectStyle}
            placeholder={"Select Product Category"}
            options={categories}
            onChange={onSelectHandler}
          />
          <Button
            type="submit"
            variant="success"
            className="w-100 mb-3"
            disabled={isLoading}
          >
            <LoadingCircle isLoading={isLoading} />
            Save
          </Button>
        </BootstrapForm>
      </Container>
    </div>
  );
};

export default AddProduct;
