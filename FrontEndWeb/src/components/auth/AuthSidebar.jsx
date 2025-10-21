import Logo from "../../assets/Logo.png";

const COLOR_TEAL = "#058789";
const AuthSidebar = ({ children, widthClass = "lg:w-1/3" }) => {
  return (
    <div
      className={`w-full p-8 sm:p-12 md:p-16 flex flex-col ${widthClass}`}
      style={{
        backgroundColor: COLOR_TEAL,
        borderTopRightRadius: "70px",
        borderBottomRightRadius: "70px",
      }}
    >
      <div className="flex flex-col items-center text-center h-full">
        <div className="w-full flex flex-col items-center">
          <div className="area-conteudo-topo w-full"></div>
          <div className="mb-12 text-white">
            <div className="mb-10">
              <p className="text-4xl text-[#003637] font-bold">Portal</p>
              <h1 className="text-4xl text-[#003637] font-bold">
                Prestador de Serviço
              </h1>
            </div>
            <img src={Logo} alt="Logo" className="w-44 h-48 mb-10 mx-auto" />
          </div>
        </div>
        <div className="area-formulario w-full flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default AuthSidebar;
