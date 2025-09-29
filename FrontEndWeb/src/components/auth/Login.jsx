import Logo from "../../assets/Logo.png";
import dogAndCatLogin from "../../assets/dogAndCatLogin.png";

const Login = () => {
  return (
    <div className="flex w-full min-h-screen">
      <div className="w-full lg:w-1/2 bg-[#058789] p-8 sm:p-12 md:p-20 flex flex-col justify-center">
        <div className="mb-10 text-white">
          <p className="text-sm font-light">Portal</p>
          <h1 className="text-3xl font-bold mb-4">Prestador de Serviço</h1>
          <img src={Logo} alt="Logo" className="w-12 h-12" />
        </div>
        <div className="area-formulario">
          <h2 className="text-white text-2xl font-semibold mb-6">
            Entre na sua conta
          </h2>
          <form className="space-y-4">
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full p-3 pl-10 rounded-lg border-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="relative">
              <input
                id="senha"
                type="password"
                placeholder="Senha"
                className="w-full p-3 pl-10 rounded-lg border-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <a
              href="#"
              className="text-white text-sm hover:underline block pt-1"
            >
              Esqueceu sua senha?
            </a>
            <button
              type="submit"
              className="w-full p-3 bg-teal-900 text-white font-bold rounded-lg hover:bg-teal-800 transition shadow-md mt-6"
            >
              ENTRAR
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-white text-sm">
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
