import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from './components/ProtectedRoutes';
import LoginNavBar from './components/LoginNavBar';
import LeftSidebar from './components/LeftSideBar';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/Signup';
import Page404 from './pages/Page404/Page404';
import Users from './pages/Users/Users';

const App = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoutes>
            <LoginNavBar />
          </ProtectedRoutes>
        }
      >
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route index path="users" element={<Users />} />
      </Route>
      <Route element={<LeftSidebar />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;