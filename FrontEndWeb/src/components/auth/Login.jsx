import dogAndCatLogin from "../../assets/dogAndCatLogin.png";
import { VscLock, VscMail } from "react-icons/vsc";
import InputWithIcon from "../../components/common/InputWithIcon";
import AuthSidebar from "./AuthSidebar";

const COLOR_BUTTON_BG = "#003637";

const Login = () => {
  return (
    <div className="flex w-full min-h-screen">
      <AuthSidebar widthClass="lg:w-1/3">
        <h2 className="text-[#003637] text-4xl font-bold mb-8 text-center">
          Entre na sua conta
        </h2>
        <form className="space-y-4 ">
          <InputWithIcon
            Icon={VscMail}
            type="email"
            placeholder="Email"
            name="email"
          />
          <InputWithIcon
            Icon={VscLock}
            type="password"
            placeholder="Senha"
            name="senha"
          />
          <a
            href="#"
            className="relative top-0 mt-2 text-[#003637] text-base font-semibold hover:underline block text-left"
          >
            Esqueceu sua senha?
          </a>
          <button
            type="submit"
            style={{ backgroundColor: COLOR_BUTTON_BG }}
            className="w-80 p-3 text-white font-bold rounded-lg hover:opacity-90 transition shadow-md mt-6 mx-auto block"
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
      </AuthSidebar>
      <div className="hidden lg:flex lg:w-3/5 relative flex-col justify-center items-center">
        <img
          src={dogAndCatLogin}
          alt="Cachorro e gato"
          className="w-3/4 h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Login;
