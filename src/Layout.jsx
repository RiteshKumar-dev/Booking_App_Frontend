import React from "react";
import NavbarCom from "./Components/NavbarCom";
import { Outlet } from "react-router-dom";
import FooterCom from "./Components/FooterCom";
const Layout = () => {
  return (
    <div className="py-4 px-8 flex-col min-h-screen">
      <NavbarCom />
      <Outlet />
      <FooterCom />
    </div>
  );
};

export default Layout;
