import React, { useCallback, useEffect, useState } from "react";
import { Container, Button, Form as BootstrapForm } from "react-bootstrap";
import { Navbar } from "../../containers";
import { Form, InputFile, LoadingCircle } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../services";
import Select from "react-select";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";

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
const EditProduct = () => {
  document.title = "DumbMerch Admin | Edit Product";
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    file: {},
    image_name: "",
    defaultCategory: [],
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
      defaultCategory: value,
    });
  };

  const getProduct = useCallback(async () => {
    const { data, status, message } = await API.get(`/product/${id}`).catch(
      (err) => ({
        message: err?.response?.data?.message,
        status: err?.response?.data?.status,
      })
    );
    if (status === 200) {
      const product = data.data.product;
      const defaultCategory = product.categories.map((category, index) => ({
        value: category.id,
        label: category.name,
      }));

      product.categories = product.categories.map((category) => category.id);

      setState({
        ...product,
        file: {},
        defaultCategory,
      });
    } else {
      toast.error(message);
    }
  }, [id]);

  const { data: categories } = useQuery(
    "categoryChace",
    async () => {
      const { data: response } = await API.get("/categories");

      const mappedData = response.data.categories.map((category, index) => ({
        value: category.id,
        label: category.name,
      }));

      return mappedData;
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
    }
  );

  const { mutate: onSubmitHandler, isLoading } = useMutation(
    async (e) => {
      e.preventDefault();
      const { name, price, stock, description, categories, file } = state;

      if (name && price && stock && description && categories.length) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("description", description);
        categories.forEach((category, index) => {
          formData.append("category_ids[]", category);
        });

        if (file.name) {
          formData.append("image", file);
        }

        return await API.patch(`/product/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        throw new Error("Please fill all the form!");
      }
    },
    {
      onSuccess: () => {
        navigate("/admin/product");
      },
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
    }
  );

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <div>
      <Navbar />
      <Container className="mt-5">
        <h1 className="text-light mb-5">Edit Product</h1>
        <BootstrapForm onSubmit={onSubmitHandler}>
          <InputFile
            fileName={state.file.name || state.image_name}
            onChange={onFileChange}
          />

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
            value={state.price.toString()}
            onChange={onchangeHandler}
            className="mb-3"
            name={"price"}
          />
          <Form
            placeHolder="Product Stock"
            type="number"
            value={state.stock.toString()}
            onChange={onchangeHandler}
            className="mb-3"
            name={"stock"}
          />
          <Select
            className="mb-5"
            isMulti
            styles={selectStyle}
            placeholder={"Select Product Category"}
            options={categories}
            onChange={onSelectHandler}
            value={state.defaultCategory}
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

export default EditProduct;
