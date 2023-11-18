import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import useRetrieveRespData from "../../customHooks/useRetrieveRespData";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import { Container, DataEntry, Error, FormWrapper, InlineLink, Label, Title } from "../SignUp/Signup.styles";
import Button from "../../components/Button";
import { CheckIfAccount } from "../../components/Components.styles";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { isLoading, fetchData, status, responseData } = useRetrieveRespData();
  const navigate = useNavigate();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsSubmitted(true);

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    if (!(email && password)) return;
    fetchData("/api/login", undefined, undefined, email, password, undefined);
  };

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const modalHandler = () => {
    setIsModal(false);
  };

  useEffect(() => {
    if (status === "succeed" && responseData?.token) {
      localStorage.setItem("userToken", responseData.token);
      navigate("/");
    } else if (status === "failed") {
      setIsModal(true);
    }
  }, [navigate, status, responseData]);

  if (localStorage.getItem("userToken")) {
    return <Navigate to="/users" replace />;
  }

  return (
    <Container>
      {isModal && (
        <Modal title={"Oops"} onConfirm={modalHandler}>
          {responseData?.error || "Something went wrong!"}
        </Modal>
      )}
      <Header />
      <div>
        <Title>Welcome Back.</Title>
      </div>
      <form name="form" onSubmit={submitHandler}>
        <FormWrapper>
          <Label htmlFor="email">Email address</Label>
          <DataEntry
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
          />
          {isSubmitted && !email && (
            <Error>
              Please enter a valid email address
            </Error>
          )}
        </FormWrapper>
        <FormWrapper>
          <Label htmlFor="password">Your password</Label>
          <DataEntry
            type="password"
            name="password"
            value={password}
            onChange={changeHandler}
          />
          {isSubmitted && !password && (
            <Error>Password is required</Error>
          )}
        </FormWrapper>
        <CheckIfAccount>
          New to Engineer space ?
          <InlineLink to="/signup">
            Sign up
          </InlineLink>
        </CheckIfAccount>
        <FormWrapper>
          <Button aria-label="Log in" type="submit" disabled={isLoading}>
            {isLoading ? <>loading ...</> : "Log in"}
          </Button>
        </FormWrapper>
      </form>
    </Container>
  );
};

export default Login;