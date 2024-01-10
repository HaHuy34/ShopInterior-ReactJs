import React from "react";
import MenuAdmin from "./MenuAdmin";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <>
      <MenuAdmin/>
      <Outlet/>
    </>
  );
};

export default LayoutAdmin;
