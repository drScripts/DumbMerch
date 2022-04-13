import { useState } from "react";
import { Container, Button, Form as BootstrapForm } from "react-bootstrap";
import { Navbar } from "../../containers";
import { Form, LoadingCircle } from "../../components";
import { toast } from "react-toastify";
import { API } from "../../services";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const AddCategory = () => {
  document.title = "DumbMerch Admin | Add Category";
  const [state, setState] = useState({
    name: "",
  });
  const navigate = useNavigate();

  const onchangeHandler = (text) => {
    setState({
      ...state,
      ...text,
    });
  };

  const { mutate: onSubmitHandler, isLoading } = useMutation(
    async (e) => {
      e.preventDefault();

      if (state.name) {
        const body = JSON.stringify({ name: state.name });

        return await API.post("/category", body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        throw new Error("Please insert the category name!");
      }
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
      onSuccess: () => {
        navigate("/admin/category");
      },
    }
  );

  return (
    <div>
      <Navbar />
      <Container className="mt-5">
        <h1 className="text-light mb-5">Add Category</h1>
        <BootstrapForm onSubmit={onSubmitHandler}>
          <Form
            placeHolder="Category Name"
            type="text"
            value={state.name}
            onChange={onchangeHandler}
            className="mb-5"
            name={"name"}
          />
          <Button
            type="submit"
            variant="success"
            className="w-100"
            disaled={isLoading}
          >
            <LoadingCircle isLoading={isLoading} />
            Save
          </Button>
        </BootstrapForm>
      </Container>
    </div>
  );
};

export default AddCategory;
