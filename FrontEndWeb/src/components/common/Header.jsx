import React from "react";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  const displayName = user?.name || "Carregando...";
  const displayEmail = user?.email || "usuario@dominio.com";
  const avatarText = displayName.charAt(0).toUpperCase();
  const avatarUrl = user?.profilePictureUrl;

  return (
    <header className="flex justify-end items-center h-20 px-6 pb-4 pt-4 bg-[#058789] w-full sticky top-0 z-10 text-white ">
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-white">{displayName}</p>
          <p className="text-xs text-white/80">{displayEmail}</p>
        </div>
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-lg font-bold">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-lg font-bold text-white">
              {avatarText}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
