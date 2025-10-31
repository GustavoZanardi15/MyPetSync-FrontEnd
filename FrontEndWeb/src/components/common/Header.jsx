import { VscBell, VscSearch } from "react-icons/vsc";
import InputWithIcon from "./InputWithIcon";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { currentUser } = useAuth();

  const displayName = currentUser?.nome || "Carregando...";
  const displayEmail = currentUser?.email || "usuario@dominio.com";
  const avatarText = displayName.charAt(0).toUpperCase();
  const avatarUrl = currentUser?.profilePictureUrl;

  return (
    <header className="flex justify-between items-center h-20 px-6 pb-4 pt-4 bg-[#058789] w-full sticky top-0 z-10 text-white ">
      <div className="flex items-center flex-grow max-w-xl w-full mr-8">
        <InputWithIcon
          Icon={VscSearch}
          placeholder="Buscar por pet ou tutor"
          type="text"
          inputClassName="bg-white/90 border-none placeholder-gray-500 text-gray-800 w-full"
          iconClassName="text-gray-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-teal-800 transition-colors relative">
          <VscBell className="w-7 h-7 text-white" />
        </button>
        <div className="w-px h-8 bg-white/50 mx-2"></div>
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
