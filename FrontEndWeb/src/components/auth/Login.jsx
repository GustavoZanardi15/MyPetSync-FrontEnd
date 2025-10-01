import dogAndCatLogin from "../../assets/dogAndCatLogin.png";
import { VscLock, VscMail } from "react-icons/vsc";
import InputWithIcon from "../../components/common/InputWithIcon";
import AuthSidebar from "./AuthSidebar";

const COLOR_BUTTON_BG = "#003637";

const Login = () => {
  return (
    <div className="flex text-center w-full min-h-screen">
      <AuthSidebar widthClass="lg:w-2/5">
        <h2 className="text-[#003637] text-4xl font-bold mb-10 text-center">
          Entre na sua conta
        </h2>
        <form className="space-y-4">
          <InputWithIcon Icon={VscMail} type="email" placeholder="Email" />
          <InputWithIcon Icon={VscLock} type="password" placeholder="Senha" />
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
