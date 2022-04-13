import { useEffect, useState, useCallback } from "react";
import { Container, Button, Form as BootstrapForm } from "react-bootstrap";
import { Navbar } from "../../containers";
import { Form, LoadingCircle } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../services";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

const EditCategory = () => {
  document.title = "DumbMerch Admin | Edit Category";
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
  });

  const onchangeHandler = (text) => {
    setState({
      ...state,
      ...text,
    });
  };

  const getCategory = useCallback(async () => {
    const { data, status } = await API.get(`/category/${id}`).catch(
      (err) => err.response
    );

    if (status === 200) {
      setState(data.data.category);
    } else {
      toast.error(data.data.message);
    }
  }, [id]);

  const { mutate: onSubmitHandler, isLoading } = useMutation(
    async (e) => {
      e.preventDefault();
      if (state.name) {
        const body = JSON.stringify({ name: state.name });

        return await API.patch(`/category/${id}`, body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        throw new Error("Please insert category name");
      }
    },
    {
      onSuccess: (data) => {
        navigate("/admin/category");
      },
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
    }
  );

  useEffect(() => {
    getCategory();
  }, [getCategory]);

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
          <Button
            type="submit"
            variant="success"
            className="w-100"
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

export default EditCategory;
