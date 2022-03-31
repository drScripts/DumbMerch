import { useState } from "react";
import { Form as BootstrapForm } from "react-bootstrap";
import { Button, Card, Form } from "../../components";

const Index = ({ isLogin = false }) => {
  const [state, setState] = useState({
    name: "",
    password: "",
    email: "",
  });

  const onChangeHandler = (value) => {
    setState({
      ...state,
      ...value,
    });
  };

  const onSubmits = (e) => {
    e.preventDefault();

    console.log(state);
  };
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
            value={state.name}
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
          value={state.email}
        />
        <Form
          placeHolder="Your Password"
          type="password"
          onChange={onChangeHandler}
          className="mb-5"
          name="password"
          value={state.password}
        />
        <Button
          width="w-100"
          bgColor="bg-red"
          title={isLogin ? "Login" : "Register"}
          onClick={onChangeHandler}
        />
      </Card>
    </BootstrapForm>
  );
};

export default Index;
