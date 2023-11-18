import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import useFetch from "../customHooks/useFetch";
import Modal from "./Modal";

const Menu = () => {
  const [isModal, setIsModal] = useState(false);
  const { post } = useFetch("http://localhost:3002");

  const navigate = useNavigate();

  const logoutHandler = () => {
    post("/api/logout", {})
      .then(() => {
        localStorage.removeItem("userToken");
        navigate("/login");
      })
      .catch((error) => {
        setIsModal(true);
      });
  };

  const modalHandler = () => {
    setIsModal(false);
  };

  return (
    <>
      {isModal && (
        <Modal title={"Oops"} onConfirm={modalHandler}>
          <p>Something went wrong!</p>
        </Modal>
      )}{" "}
      <nav>
        <CiLogout onClick={logoutHandler}>Log out</CiLogout>
      </nav>
    </>
  );
};

export default Menu;