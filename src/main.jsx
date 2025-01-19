import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Privateroutes from "./Privateroutes.jsx";
import SignInPage from "./Components/Signin.jsx";
import SignUpPage from "./Components/Signup.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import LandingPage from "./Components/random.jsx";
import Layout from "./Layout.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import WarehousePage from "./Components/Warehouses";
import Createwarehouse from "./Components/Createwarehouse";
import ShowWaterManagement from "./Components/Items";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      {
        path: "random",
        element: (
          <Privateroutes>
            <LandingPage />
          </Privateroutes>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Privateroutes>
            <Dashboard />
          </Privateroutes>
        ),
      },
      {
        path: "show_watermanagement/:id",
        element: (
          <Privateroutes>
            <ShowWaterManagement   />
          </Privateroutes>
        ),
      },
      {
        path: "warehouses",
        element: (
          <Privateroutes>
            <WarehousePage />
          </Privateroutes>
        ),
      },
      {
        path: "createawarehouse",
        element: (
          <Privateroutes>
            <Createwarehouse />
          </Privateroutes>
        ),
      },
      {
        path: "/login",
        element: <SignInPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },

  // {
  //   path: "/contactus",
  //   element: <ContactUs />,
  // },
  // {
  //   path: "/aboutus",
  //   element: <AboutUs />,
  // },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
