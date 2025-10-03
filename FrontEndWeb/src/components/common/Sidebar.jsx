import {
  VscHome,
  VscCalendar,
  VscAccount,
  VscSignOut,
  VscSymbolNamespace,
} from "react-icons/vsc";

const navItems = [
  { name: "Home", icon: VscHome },
  { name: "Agenda", icon: VscCalendar },
  { name: "Perfil", icon: VscAccount },
];

const Sidebar = () => {
  return (
    <div>
      <div>
        <VscSymbolNamespace />
        <div>
          <p>My Pet Sync</p>
          <p>Portal Prestador de serviço</p>
        </div>
      </div>
      <nav>
        {navItems.map((item) => {
          return (
            <a key={item.name} href="#">
              <item.icon />
              {item.name}
            </a>
          );
        })}
      </nav>
      <div>
        <button onClick={() => console.log("Sair")}>
          <VscSignOut />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
