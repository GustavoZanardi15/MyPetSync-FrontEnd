import { VscHome, VscCalendar, VscAccount, VscSignOut } from "react-icons/vsc";
import { useState } from "react";
import Logo from "../../assets/Logo.png";

const navItems = [
  { name: "Home", icon: VscHome },
  { name: "Agenda", icon: VscCalendar },
  { name: "Perfil", icon: VscAccount },
];

const Sidebar = () => {
  const [active, setActive] = useState("Home");

  return (
    <div className="flex flex-col h-screen w-80 bg-[#A5E5D9]">
      <div className="flex items-center gap-8 bg-[#058789] p-8 text-white">
        <img src={Logo} alt="Logo My Pet Sync" className="w-14 h-14" />
        <div>
          <p className="font-bold text-lg">My Pet Sync</p>
          <p className="text-sm">Portal Prestador de serviço</p>
        </div>
      </div>

      <nav className="flex flex-col gap-3 p-4">
        {navItems.map((item) => {
          const isActive = active === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-md font-medium text-white transition-all
                ${
                  isActive
                    ? "bg-[#2BB6A8] shadow-md ring-2 ring-black/20"
                    : "bg-[#058789] hover:bg-[#2BB6A8]"
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          );
        })}
      </nav>
      <div className="flex-1"></div>
      <div className="p-4">
        <button
          onClick={() => console.log("Sair")}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md font-medium text-white bg-[#058789] hover:bg-[#2BB6A8]"
        >
          <VscSignOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
