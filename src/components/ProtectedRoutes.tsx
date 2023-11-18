import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  if (!localStorage.getItem("userToken")) {
    return <Navigate to="/login" replace />;
  }
  return <div>{children}</div>;
};

export default ProtectedRoutes;