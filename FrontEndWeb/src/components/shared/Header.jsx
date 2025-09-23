import logo from "../../assets/Logo.svg";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Sobre o sistema", href: "#" },
  { label: "Funcionalidades", href: "#" },
  { label: "Prestadores de Serviços", href: "#" },
];

const Header = () => {
  return (
    <nav className="bg-teal-700 p-4 sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img src={logo} alt="logo" className="h-12 w-auto" />
          </div>

          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-white hover:text-gray-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <a
              href="#"
              className="bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-teal-800"
            >
              Acessar Portal WEB
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
