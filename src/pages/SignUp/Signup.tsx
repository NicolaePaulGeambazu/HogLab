import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useRetrieveRespData from "../../customHooks/useRetrieveRespData";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { Container, InlineLink, Title, FormWrapper, Error, DataEntry, Label } from "./Signup.styles";
import { CheckIfAccount } from "../../components/Components.styles";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { isLoading, fetchData, status, responseData } = useRetrieveRespData();
  const navigate = useNavigate();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsSubmitted(true);

    const target = e.target as typeof e.target & {
      firstName: {value: string};
      lastName: {value: string};
      email: { value: string };
      password: { value: string };
      password_confirmation: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const passwordConfirmationtarget = target.password_confirmation.value;

    if (!(email && password) || password !== passwordConfirmationtarget) return;

    fetchData("/api/register", firstName, lastName, email, password, passwordConfirmationtarget );
  };

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "password_confirmation") setPasswordConfirmation(value);
    else if (name === 'firstName') setFirstName(value);
    else if (name === 'lastName') setLastName(value);
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
            <Error>
              Please enter a valid first name
            </Error>
          )}
        </FormWrapper>
        <FormWrapper>
          <Label htmlFor="lastName"> Last Name</Label>
          <DataEntry
            type="type"
            name="lastName"
            value={lastName}
            onChange={changeHandler}
          />
          {isSubmitted && !lastName && (
            <Error>
              Please enter a valid last name
            </Error>
          )}
        </FormWrapper>
        <FormWrapper>
          <Label htmlFor="email"> Email address</Label>
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
          <Label htmlFor="password_confirmation">Confirm Password</Label>
          <DataEntry
            type="password"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={changeHandler}
          />
          {isSubmitted && !passwordConfirmation && (
            <Error className="error-block password_confirmation">
              Retype password is required
            </Error>
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
