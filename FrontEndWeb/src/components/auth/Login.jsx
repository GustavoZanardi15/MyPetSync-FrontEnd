import Logo from "../../assets/Logo.png";
import dogAndCatLogin from "../../assets/dogAndCatLogin.png";
import { VscLock } from "react-icons/vsc";
import { VscMail } from "react-icons/vsc";

const COLOR_TEAL = "#058789";
const COLOR_BUTTON_BG = "#003637";

const Login = () => {
  return (
    <div className="flex w-full min-h-screen">
      <div
        className="w-full lg:w-2/5 p-8 sm:p-12 md:p-16 flex flex-col justify-center"
        style={{
          backgroundColor: COLOR_TEAL,
          borderTopRightRadius: "70px",
          borderBottomRightRadius: "70px",
        }}
      >
        <div className="mb-12 text-center text-white">
          <div className="mb-16">
            <p className="text-4xl font-bold">Portal</p>
            <h1 className="text-4xl font-bold">Prestador de Serviço</h1>
          </div>
          <img src={Logo} alt="Logo" className="w-44 h-48 mb-10 mx-auto" />
        </div>

        <div className="area-formulario">
          <h2 className="text-[#003637] text-4xl font-bold mb-10 text-center">
            Entre na sua conta
          </h2>

          <form className="flex flex-col items-center">
            <div className="relative w-full mb-4">
              <VscMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full p-3 pl-10 rounded-lg border-none focus:ring-2 focus:ring-white text-gray-800 placeholder-gray-500 bg-white"
              />
            </div>
            <div className="relative w-full mb-8">
              {" "}
              <VscLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="senha"
                type="password"
                placeholder="Senha"
                className="w-full p-3 pl-10 rounded-lg border-none focus:ring-2 focus:ring-white text-gray-800 placeholder-gray-500 bg-white"
              />
              <a
                href="#"
                className="absolute left-0 top-full mt-2 text-[#003637] text-base font-semibold hover:underline"
              >
                Esqueceu sua senha?
              </a>
            </div>
            <button
              type="submit"
              style={{ backgroundColor: COLOR_BUTTON_BG }}
              className="w-80 p-3 text-white font-bold rounded-lg hover:opacity-90 transition shadow-md mt-6"
            >
              ENTRAR
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-[#003637] text-sm font-semibold">
              Não tem conta?
              <a href="#" className="font-bold ml-1 hover:underline">
                Crie sua conta
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-3/5 relative">
        <img
          src={dogAndCatLogin}
          alt="Cachorro e gato"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Login;
