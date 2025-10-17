import { VscHome, VscCalendar, VscAccount, VscSignOut } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const navItems = [
  { name: "Home", icon: VscHome, path: "/homePage" },
  { name: "Agenda", icon: VscCalendar, path: "/agenda" },
  { name: "Perfil", icon: VscAccount, path: "/profile" },
];
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    const currentPath = location.pathname;
    if (
      currentPath.startsWith("/agenda") ||
      currentPath.startsWith("/profile")
    ) {
      console.log("Saindo da Agenda/Perfil para Home");
      navigate("/homePage");
    } else {
      console.log("Saindo para Login");
      navigate("/login");
    }
  };
  return (
    <div className="hidden lg:flex flex-col h-screen w-72 bg-[#A5E5D9] flex-shrink-0">
      <div className="flex items-center gap-8 bg-[#058789] p-8 text-white">
        <img src={Logo} alt="Logo My Pet Sync" className="w-14 h-14" />
        <div>
          <p className="font-bold text-lg">My Pet Sync</p>
          <p className="text-sm">Portal Prestador de serviço</p>
        </div>
      </div>
      <nav className="flex flex-col gap-3 p-4">
        {navItems.map((item) => {
          let isActive;
          const currentPath = location.pathname;
          if (item.path === "/homePage") {
            isActive = currentPath === item.path;
          } else {
            isActive = currentPath.startsWith(item.path);
          }
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-md font-medium text-white transition-all
  ${
    isActive
      ? "bg-[#2BB6A8] shadow-md ring-2 ring-black/20"
      : "bg-[#058789] hover:bg-[#2BB6A8]"
  }`}
            >
              <item.icon className="w-5 h-5" /> {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="flex-1"></div>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md font-medium text-white bg-[#058789] hover:bg-[#2BB6A8]"
        >
          <VscSignOut className="w-5 h-5" /> Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
