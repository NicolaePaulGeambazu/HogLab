import React, { useState } from "react";
import useFetch from "../../customHooks/useFetch";
import { User } from "../../types/types";
import Button from "../Button";
import { Error, FormWrapper } from "../../pages/SignUp/Signup.styles";

interface AddUserResponse {
  createdAt?: string;
  id: number;
  display_picture: string;
}

interface AddUserFormProps {
  onAddUser: (user: User) => void;
}

const AddUserForm = ({ onAddUser } : AddUserFormProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const { post, loading } = useFetch("http://localhost:3002");

  const token = localStorage.getItem('userToken');

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsSubmitted(true);

    const target = e.target as typeof e.target & {
      email: { value: string };
      firstName: { value: string };
      lastName: { value: string };
    };

    const email = target.email.value;
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;

    if (!(firstName && lastName && email)) return;

    post<AddUserResponse>("/api/users", {
      first_name: firstName,
      last_name: lastName,
      email: email,
    },) 
      .then((response) => {
          onAddUser({
            email,
            first_name: firstName,
            last_name: lastName,
            id: response.id,
            display_picture: response.display_picture,
          });
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
      });
  };

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "email") setEmail(value);
    if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastName(value);
    else if (name === "avatar") setAvatar(value);
  };

  return (
    <>
      <form name="form" onSubmit={submitHandler}>
        <FormWrapper>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={changeHandler}
            disabled={loading}
          />
          {isSubmitted && !firstName && (
            <Error>First Name is required.</Error>
          )}
        </FormWrapper>
        <FormWrapper>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={changeHandler}
            disabled={loading}
          />
          {isSubmitted && !lastName && (
            <Error>Last Name is required.</Error>
          )}
        </FormWrapper>
        <FormWrapper>
          <label htmlFor="email">Your email address</label>
          <input
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
          <Button aria-label="Add user" type="submit" disabled={loading}>
            {loading ? <>loading ...</> : "Add User"}
          </Button>
        </FormWrapper>
      </form>
      {isError &&
        "Something went wrong! Please try again later. If the problem persists, please contact us."}
    </>
  );
};

export default AddUserForm;