import React, { useState, useContext } from "react";
import { Container, Button, Form as BootstrapForm } from "react-bootstrap";
import { Navbar } from "../../containers";
import { Form, InputFile } from "../../components";
import { useNavigate } from "react-router-dom";
import { API } from "../../services";
import { toast } from "react-toastify";
import Select from "react-select";
import { useQuery, useMutation } from "react-query";
import { UserContext } from "../../Context/UserContext";

const genderSelectOptions = [
  {
    value: "",
    label: "Select Your Gender",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "male",
    label: "Male",
  },
];

const selectStyle = {
  control: (base, state) => ({
    ...base,
    background: "#d2d2d240",
    borderRadius: "5px",
    border: "2px solid #d3d3d3",
    color: "#fff",
  }),
  menu: (base) => ({
    ...base,
    background: "#d2d2d240",
    color: "#fff",
  }),
  menuList: (base) => ({
    ...base,
    background: "#d2d2d240",
    color: "#fff",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "black",
  }),
  input: (styles) => ({ ...styles, color: "#fff" }),
  singleValue: (styles) => ({ ...styles, color: "#fff" }),
};

const Index = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [userState, dispatch] = useContext(UserContext);
  const [select, setSelect] = useState({
    value: "",
    label: "Select Your Gender",
  });

  const [state, setState] = useState({
    name: "",
    phone_number: "",
    gender: "",
    address: "",
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

  const onSelectHandler = (value) => {
    setState({
      ...state,
      gender: value.value,
    });
    setSelect(value);
  };

  useQuery(
    "userChace",
    async () => {
      const { data } = await API.get("/user");
      return data?.data?.user;
    },
    {
      onSuccess: (data) => {
        const newData = {
          phone_number: data?.profile?.phone_number || "",
          gender: data?.profile?.gender || "",
          address: data?.profile?.address || "",
          name: data?.name,
        };

        if (newData.gender) {
          setSelect({
            value: newData.gender,
            label: newData.gender,
          });
        }

        setState({
          ...state,
          ...newData,
        });
      },
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
    }
  );

  const { mutate: onSubmitHandler } = useMutation(
    async (e) => {
      e.preventDefault();
      const { phone_number, gender, address, file } = state;

      if (phone_number && gender && address) {
        const formData = new FormData();
        formData.append("gender", gender);
        formData.append("phone_number", phone_number);
        formData.append("address", address);

        if (file.name) {
          formData.append("image", file);
        }

        const { data } = await API.patch(`/user`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return data?.data?.user;
      } else {
        throw new Error("Please fill all the form!");
      }
    },
    {
      onSuccess: (data) => {
        console.log(data);
        dispatch({
          type: "UPDATE_PROFILE",
          payload: { user: data },
        });
        navigate("/profile");
      },
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
    }
  );

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
            placeHolder="Your Name"
            type="text"
            value={state.name}
            onChange={onchangeHandler}
            className="mb-3"
            name={"name"}
            disabled
          />
          <textarea
            name="address"
            onChange={(e) =>
              onchangeHandler({ [e.target.name]: e.target.value })
            }
            className="custom-form-input mb-2"
            placeholder={"Your Address"}
            rows={8}
            value={state.address}
          ></textarea>
          <Form
            placeHolder="Your Phone Number"
            type="text"
            value={state.phone_number}
            onChange={onchangeHandler}
            className="mb-3"
            name={"phone_number"}
          />
          <Select
            options={genderSelectOptions}
            placeholder={"Select Your Gender"}
            onChange={onSelectHandler}
            styles={selectStyle}
            className="mb-5 text-light"
            value={select}
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
