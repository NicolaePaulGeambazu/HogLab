import { Outlet } from "react-router-dom";
import HeaderWMenu from "./HeaderUsers";

const LoginNavBar = () => {
  return (
    <>
      <HeaderWMenu />
            <Outlet />
    </>
  );
};

export default LoginNavBar;