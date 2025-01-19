import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/footer.jsx";
import { Outlet } from "react-router-dom";
import axios from "axios";

function Layout({ isadmin }) {
  let id = localStorage.getItem("itemhai");
  const is_owner = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1000/agglomeration/user/isuseradmin",
        { id }
      );
      console.log(response);
      localStorage.setItem('isadmin',response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    is_owner();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet isadmin={isadmin} />
      <Footer />
    </>
  );
}

export default Layout;
