import React from "react";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import { useAuth } from "../context/AuthContext";

const MainLayout = ({ children }) => {
  const { isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-xl text-indigo-600">
        Carregando perfil e permissões...
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-y-auto overflow-x-hidden">
        <Header />
        <main className="flex-grow w-full">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
