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

interface FetchDataOptions {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}


const useRetrieveRespData = () => {
  const [status, setStatus] = useState<string>("idle");
  const [responseData, setData] = useState<RetrieveRespData | null>(null);
  const { post, get, loading } = useFetch('http://localhost:3002');
  const token = localStorage.getItem('userToken');

  const fetchData = (endpoint: string, options?: FetchDataOptions) => {
    if (endpoint === "/api/register" && options?.email && options?.password && options?.firstName && options?.lastName && options?.password_confirmation) {
      // Handle registration endpoint
      post<RetrieveRespData>(endpoint, {
        first_name: options.firstName,
        last_name: options.lastName,
        email: options.email,
        password: options.password,
        password_confirmation: options.password_confirmation,
      })
        .then((json) => handleResponse(json))
        .catch((error) => handleError(error));
    } else if (endpoint === "/api/login" && options?.email && options?.password) {
      // Handle login endpoint
      post<RetrieveRespData>(endpoint, {
        email: options.email,
        password: options.password,
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
    }

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