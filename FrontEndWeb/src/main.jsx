import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import RegisterCompany from "./components/auth/RegisterCompany.jsx";
import RegisterAutonomo from "./components/auth/RegisterAutonomo.jsx";
import Login from "./components/auth/Login.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import HomePage from "./pages/HomePage.jsx";
import AgendaPage from "./pages/AgendaPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import VerifyCode from "./components/auth/VerifyCode.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ChatListPage from "./pages/chat/ChatListPage.jsx";
import ChatRoomPage from "./pages/chat/ChatRoomPage.jsx";

const LayoutWrapper = ({ children }) => <MainLayout>{children}</MainLayout>;

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/registerCompany", element: <RegisterCompany /> },
  { path: "/registerAutonomo", element: <RegisterAutonomo /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-code", element: <VerifyCode /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/homePage",
        element: (
          <LayoutWrapper>
            <HomePage />
          </LayoutWrapper>
        ),
      },
      {
        path: "/agenda",
        element: (
          <LayoutWrapper>
            <AgendaPage />
          </LayoutWrapper>
        ),
      },
      {
        path: "/profile",
        element: (
          <LayoutWrapper>
            <ProfilePage />
          </LayoutWrapper>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <LayoutWrapper>
            <EditProfilePage />
          </LayoutWrapper>
        ),
      },
      {
        path: "/app/chat",
        element: (
          <LayoutWrapper>
            <ChatListPage />
          </LayoutWrapper>
        ),
      },
      {
        path: "/app/chat/:roomId",
        element: (
          <LayoutWrapper>
            <ChatRoomPage />
          </LayoutWrapper>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
