import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import MyPageNavbar from "../myPage/MyPageNavbar";

function Layout2() {

  return (
    <>
      <Header />
      <MyPageNavbar/>
      <Outlet/>
    </>
  );
}

export default Layout2;
