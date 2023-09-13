import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home/Home.tsx";
import Signup from "./components/Signup/Signup.tsx";
import Login from "./components/Login.tsx";
import Footer from "./components/Footer";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/log-in",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);
