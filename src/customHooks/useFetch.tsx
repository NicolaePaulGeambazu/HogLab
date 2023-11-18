import { useState } from "react";

export default function useFetch(baseUrl: string) {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('userToken');
  function get<T>(url: string, headers: any): Promise<T> {
    setLoading(true);
    return new Promise((resolve, reject) => {
      fetch(baseUrl + url, {headers})
        .then((response) => response.json() as Promise<T>)
        .then((data) => {
          if (!data) {
            setLoading(false);
            return reject(data);
          }
          setLoading(false);
          resolve(data);
        })
        .catch((error) => {
          setLoading(false);
          reject(error);
        })
        .finally(() => setLoading(false));
    });
  }

  function post<T>(url: string, body: { [key: string]: string }): Promise<T> {
    setLoading(true);

    return new Promise((resolve, reject) => {
      fetch(baseUrl + url, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json() as Promise<T>)
        .then((data) => {
          if (!data) {
            setLoading(false);
            return reject(data);
          }
          setLoading(false);
          resolve(data);
        })
        .catch((error) => {
          setLoading(false);
          reject(error);
        })
        .finally(() => setLoading(false));
    });
  }

  function deleteItem<T>(url: string): Promise<T> {
    setLoading(true);

    return new Promise((resolve, reject) => {
      fetch(baseUrl + url,  { headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
        method: "DELETE",
      })
        .then((response) => {
          if (response.status !== 204) {
            reject(response.statusText);
          }
          return response;
        })
        .then(() => {
          setLoading(false);
          resolve("deleted" as unknown as T);
        })
        .catch((error) => {
          setLoading(false);
          reject(error);
        })
        .finally(() => setLoading(false));
    });
  }

  return { get, post, deleteItem, loading };
}