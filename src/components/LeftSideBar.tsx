import { Outlet } from "react-router-dom";
import { Elements, Sidebar, SidebarWrapper } from './Components.styles';

const LeftSidebar = () => {
  return (
    <SidebarWrapper>
      <Sidebar />
      <Elements>
        <Outlet />
      </Elements>
    </SidebarWrapper>
  );
};

export default LeftSidebar;