import Logo from "../../assets/Logo.png";

const COLOR_TEAL = "#058789";

const AuthSidebar = ({
  children,
  widthClass = "md:w-2/5 lg:w-1/3 xl:w-1/4",
}) => {
  return (
    <div
      className={`w-full h-full lg:min-h-screen px-8 py-10 sm:px-12 md:px-16 md:py-16 lg:px-20 lg:py-24 flex flex-col ${widthClass} md:rounded-tr-[70px] md:rounded-br-[70px]`}
      style={{
        backgroundColor: COLOR_TEAL,
      }}
    >
      <div className="flex flex-col items-center text-center h-full">
        <div className="w-full flex flex-col items-center">
          <div className="area-conteudo-topo w-full"></div>
          <div className="mb-6 md:mb-8 text-white">
            <div className="mb-6 md:mb-8">
              <p className="text-4xl text-[#003637] font-bold">Portal</p>
              <h1 className="text-4xl text-[#003637] font-bold">
                Prestador de Serviço
              </h1>
            </div>
            <img
              src={Logo}
              alt="Logo"
              className="w-44 h-48 mb-4 md:mb-2 mx-auto"
            />
          </div>
        </div>
        <div className="area-formulario w-full flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default AuthSidebar;
