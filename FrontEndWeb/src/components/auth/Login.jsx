import Logo from "../../assets/Logo.png";
import dogAndCatLogin from "../../assets/dogAndCatLogin.png";
import { VscLock } from "react-icons/vsc";
import { VscMail } from "react-icons/vsc";

const Login = () => {
  return (
    <div className="flex w-full min-h-screen">
      <div className="w-full lg:w-1/2 bg-[#058789] p-8 sm:p-12 md:p-20 flex flex-col justify-center">
        <div className="mb-10 text-white">
          <p className="text-4xl font-bold">Portal</p>
          <h1 className="text-3xl font-bold mb-4">Prestador de Serviço</h1>
          <img src={Logo} alt="Logo" className="w-24 h-24" />
        </div>
        <div className="area-formulario">
          <h2 className="text-[#003637] text-3xl font-bold mb-6">
            Entre na sua conta
          </h2>
          <form className="space-y-4">
            <div className="relative">
              <VscMail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 
                           w-5 h-5 text-[#003637]"
              />
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full p-3 pl-10 rounded-lg border-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="relative">
              <VscLock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 
                           w-5 h-5 text-[#003637]"
              />
              <input
                id="senha"
                type="password"
                placeholder="Senha"
                className="w-full p-3 pl-10 rounded-lg border-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <a
              href="#"
              className="text-[#003637] text-sm font-semibold hover:underline block pt-1"
            >
              Esqueceu sua senha?
            </a>
            <button
              type="submit"
              className="w-full p-3 bg-[#003637] text-white font-bold rounded-lg hover:bg-teal-800 transition shadow-md mt-6"
            >
              ENTRAR
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-[#003637] text-sm font-semibold">
              Não tem conta?
              <a href="#" className="font-bold ml-1 hover:underline">
                Crie sua conta
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative">
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
