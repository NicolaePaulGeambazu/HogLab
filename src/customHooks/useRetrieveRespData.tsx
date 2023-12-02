import { useState } from "react";
import useFetch from "./useFetch";
interface User {
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  id: number;
}


interface RetrieveRespData {
  error?: string;
  token?: string;
  id?: string;
  data?: User[];
  statusCode?: number;
}

const useRetrieveRespData = () => {
  const [status, setStatus] = useState<string>("idle");
  const [responseData, setData] = useState<RetrieveRespData | null>(null);
  const { post, get, loading } = useFetch('http://localhost:3002');
  const token = localStorage.getItem('userToken');

  const fetchData = (
    endpoint: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    password_confirmation?: string
  ) => {
    if (endpoint === "/api/register" && email && password && firstName && lastName && password_confirmation) {
      // Handle registration endpoint
      post<RetrieveRespData>(endpoint, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      })
        .then((json) => handleResponse(json))
        .catch((error) => handleError(error));
    } else if (endpoint === "/api/login" && email && password) {
      // Handle login endpoint
      post<RetrieveRespData>(endpoint, {
        email: email,
        password: password,
      })
        .then((json) => handleResponse(json))
        .catch((error) => handleError(error));
    } else if (endpoint === "/api/users" && token) {
      // Handle users endpoint 
      get<RetrieveRespData>(endpoint, {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      })
        .then((json) => handleResponse(json))
        .catch((error) => handleError(error));
    } else {
      // Invalid endpoint
      setStatus("failed");
      setData({ error: "Invalid endpoint" });
    };
  
    const handleResponse = (json: RetrieveRespData) => {
      setData(json);
      if (!json || json?.statusCode === 422) {
        setStatus("failed");
      } else {
        setStatus("succeed");
      }
    };
  
     const handleError = (error: any) => {
      setStatus("failed");
      setData(error);
    };
  };
  
  
  return {
    isLoading: loading,
    fetchData,
    status,
    responseData,
  };
};

export default useRetrieveRespData;