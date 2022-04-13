import { useState, useContext } from "react";
import { Form as BootstrapForm } from "react-bootstrap";
import { Button, Card, Form } from "../../components";
import { API } from "../../services";
import { useMutation } from "react-query";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";

const AuthForm = ({ isLogin = false }) => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
  });

  const onChangeHandler = (value) => {
    setForm({
      ...form,
      ...value,
    });
  };

  const { mutate: onSubmits, isLoading } = useMutation(
    async (e) => {
      e.preventDefault();
      const { email, password, name } = form;
      let forms = { email, password };
      let path = "/login";

      if (!isLogin) {
        forms.name = name;
        path = "/register";
      }

      if (email && password) {
        const body = JSON.stringify(forms);

        return await API.post(path, body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    },
    {
      onError: (err) => {
        const message = err.response?.data?.message || err.message;

        dispatch({
          type: "USER_ERROR",
          payload: { message },
        });
      },
      onSuccess: (data) => {
        if (data) {
          const { user, token } = data?.data?.data;
          dispatch({
            type: "USER_SUCCESS_LOGIN",
            payload: { user, token },
          });
        } else {
          toast.error("Please insert all form!");
        }
      },
    }
  );

  return (
    <BootstrapForm onSubmit={onSubmits}>
      <Card>
        <h2 className="text-light mb-3">{isLogin ? "Login" : "Register"}</h2>
        {!isLogin ? (
          <Form
            placeHolder="Your Name"
            type="text"
            onChange={onChangeHandler}
            className={"mb-3"}
            name="name"
            value={form.name}
          />
        ) : (
          <></>
        )}
        <Form
          placeHolder="Your Email"
          type="text"
          onChange={onChangeHandler}
          className={"mb-3"}
          name="email"
          value={form.email}
        />
        <Form
          placeHolder="Your Password"
          type="password"
          onChange={onChangeHandler}
          className="mb-5"
          name="password"
          value={form.password}
        />
        <Button
          width="w-100"
          bgColor="bg-red"
          title={isLogin ? "Login" : "Register"}
          onClick={onChangeHandler}
          isLoading={isLoading}
        />
      </Card>
    </BootstrapForm>
  );
};

export default AuthForm;
