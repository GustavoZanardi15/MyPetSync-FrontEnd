import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage.jsx";
import RegisterCompany from "./components/auth/RegisterCompany.jsx";
import RegisterAutonomo from "./components/auth/RegisterAutonomo.jsx";
import Login from "./components/auth/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/registerCompany",
    element: <RegisterCompany />,
  },
  {
    path: "/registerAutonomo",
    element: <RegisterAutonomo />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
