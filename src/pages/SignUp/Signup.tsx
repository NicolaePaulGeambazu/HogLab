import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useRetrieveRespData from "../../customHooks/useRetrieveRespData";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { Container, InlineLink, Title, FormWrapper, Error, DataEntry, Label } from "./Signup.styles";
import { CheckIfAccount } from "../../components/Components.styles";

const Signup = () => {
  const [formValue, setFormValue] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { isLoading, fetchData, status, responseData } = useRetrieveRespData();
  const navigate = useNavigate();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsSubmitted(true);

    const { email, password, passwordConfirmation, firstName, lastName } = formValue;

    if (!(email && password) || password !== passwordConfirmation) return;

    fetchData("/api/register", {firstName, lastName, email, password, password_confirmation: passwordConfirmation});
  };

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormValue((prevFormValue) => ({ ...prevFormValue, [name]: value }));
  };

  const modalHandler = () => {
    setIsModal(false);
    if (status === "succeed") {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (status !== "idle") {
      setIsModal(true);
    }
  }, [navigate, status, responseData]);

  if (localStorage.getItem("userToken")) {
    return <Navigate to="/users" replace />;
  }

  const { email, password, passwordConfirmation, firstName, lastName } = formValue;

  return (
    <Container>
      {isModal && status === "succeed" && (
        <Modal title={"Success"} onConfirm={modalHandler}>
          {"Account created successfully!"}
        </Modal>
      )}
      {isModal && status === "failed" && (
        <Modal title={"Oops"} onConfirm={modalHandler}>
          {responseData?.error || "Something went wrong!"}
        </Modal>
      )}
      <Header />
      <Title>Create your Engineer account</Title>
      <form name="form" onSubmit={submitHandler}>
        <FormWrapper>
          <Label htmlFor="firstName">First name</Label>
          <DataEntry
            type="text"
            name="firstName"
            value={firstName}
            onChange={changeHandler}
          />
          {isSubmitted && !firstName && (
            <Error>Please enter a valid first name</Error>
          )}
        </FormWrapper>
        <FormWrapper>
          <Label htmlFor="lastName">Last Name</Label>
          <DataEntry
            type="text"
            name="lastName"
            value={lastName}
            onChange={changeHandler}
          />
          {isSubmitted && !lastName && (
            <Error>Please enter a valid last name</Error>
          )}
        </FormWrapper>
        <FormWrapper>
          <Label htmlFor="email">Email address</Label>
          <DataEntry
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
          />
          {isSubmitted && !email && (
            <Error>Please enter a valid email address</Error>
          )}
        </FormWrapper>
        <FormWrapper>
          <Label htmlFor="password">Password</Label>
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
        <FormWrapper>
          <Label htmlFor="passwordConfirmation">Confirm Password</Label>
          <DataEntry
            type="password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={changeHandler}
          />
          {isSubmitted && !passwordConfirmation && (
            <Error>Retype password is required</Error>
          )}
          {isSubmitted && passwordConfirmation !== password && (
            <Error>Passwords don't match</Error>
          )}
        </FormWrapper>
        <CheckIfAccount>
          Already have an account?
          <InlineLink to="/login">Log in</InlineLink>
        </CheckIfAccount>
        <FormWrapper>
          <Button aria-label="Sign up" type="submit" disabled={isLoading}>
            {isLoading ? <>loading ...</> : "Sign up"}
          </Button>
        </FormWrapper>
      </form>
    </Container>
  );
};

export default Signup;
