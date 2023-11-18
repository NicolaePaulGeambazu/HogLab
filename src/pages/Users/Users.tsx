import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import useFetch from "../../customHooks/useFetch";
import useRetrieveRespData from "../../customHooks/useRetrieveRespData";
import { User } from "../../types/types";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { IoMdAddCircleOutline } from "react-icons/io";
import UserCard from "../../components/Users/UserCard";
import { AddButton, WrapperUsers } from "../../components/Components.styles";

const AddUserForm = lazy(() => import("../../components/Users/AddUserForm"));

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isInfoModal, setIsInfoModal] = useState(false);
  const [isUserModal, setIsUserModal] = useState(false);
  const { deleteItem } = useFetch("http://localhost:3002");
  const { isLoading, fetchData, status, responseData } = useRetrieveRespData();
  
  useEffect(() => {
    if (status === "idle") {
      fetchData("/api/users");
    }
  }, [status, fetchData]);

  useEffect(() => {
    if (status === "succeed" && responseData?.data) {
      setUsers(responseData?.data);
    }
  }, [status, responseData]);

  const deleteHandler = useCallback(
    (id: number) => {
      deleteItem(`/api/users/${id}`)
        .then((response) => {
          if (response === "deleted") {
            setUsers((prevUsers) => {
              return prevUsers.filter((user) => user.id !== id);
            });
          }
        })
        .catch((error) => {
          setIsInfoModal(true);
        });
    },
    [deleteItem]
  );

  const modalHandler = useCallback(() => {
    setIsInfoModal(false);
    setIsUserModal(false);
  }, []);

  const addUserModalHandler = useCallback(() => {
    setIsUserModal(true);
  }, []);

  const addUserHandler = useCallback((user: NewUser) => {
    setUsers((prevUsers) => {
      return [user, ...prevUsers];
    });
    setIsUserModal(false);
  }, []);

  if (isLoading) {
    return (
      <div key="loader">
        <Loader />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <>
        <h1>Opps! Somthing went wrong</h1>
        <h3>
          {responseData?.error ||
            "Failed to fetch data! Try again in a few seconds."}
        </h3>
      </>
    );
  }

  return (
    <>
      {isInfoModal && (
        <Modal title={"Oops"} onConfirm={modalHandler}>
          {"Something went wrong! Could not delete user."}
        </Modal>
      )}
      <AddButton onClick={addUserModalHandler}>
        <IoMdAddCircleOutline />
        Add new engineer
      </AddButton>
      {isUserModal && (
        <Modal title={"Add new user"} onConfirm={modalHandler} noActions>
          <Suspense fallback={<Loader />}>
            <AddUserForm onAddUser={addUserHandler} />
          </Suspense>
        </Modal>
      )}
      {status === "succeed" && users.length === 0 && (
        <h1>Your list of users is empty, add new users.</h1>
      )}
      <WrapperUsers>
        {users.map((user) => {
          return <UserCard key={user.id} user={user} onDelete={deleteHandler} />;
        })}
      </WrapperUsers>
    </>
  );
};

export default Users;