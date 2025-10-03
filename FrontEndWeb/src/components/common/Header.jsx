import { Search, Bell } from "lucide-react";

const clinicData = {
  name: "Clínica Veterinária São José",
  email: "saojose@gmail.com",
};

const Header = () => {
  return (
    <header className="flex justify-between items-center h-16 px-6 bg-white shadow-md w-full sticky top-0 z-10">
      <div className="flex items-center w-1/3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Buscar por pet ou tutor"
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-shadow"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="w-px h-6 bg-gray-300"></div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">
            {clinicData.name}
          </p>
          <p className="text-xs text-gray-500">{clinicData.email}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
