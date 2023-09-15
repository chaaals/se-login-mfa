import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home/Home.tsx";
import Signup from "./components/Signup/Signup.tsx";
import Login from "./components/Login/Login.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import OTPHandler from "./components/OTPHandler/OTPHandler.tsx";
import Footer from "./components/Footer";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/log-in",
    element: <Login />,
  },
  {
    path: "/log-in/otp",
    element: <OTPHandler />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);
