import InputWithIcon from "../../components/common/InputWithIcon";
import ServiceDropdown from "../../components/common/ServiceDropdown";
import { VscLock, VscMail, VscHome, VscNotebook } from "react-icons/vsc";
import AuthSidebar from "./AuthSidebar";

const COLOR_TEAL = "#058789";
const COLOR_BUTTON_BG = "#003637";

const RegisterCompany = () => {
  return (
    <div className="flex w-full min-h-screen">
      <AuthSidebar widthClass="lg:w-1/3">
        <div className="area-formulario text-center text-[#003637]">
          <h2 className="text-4xl font-bold mb-3">Bem-vindo de volta! </h2>
          <p className="text-lg font-semibold mb-8">
            Acesse sua conta agora mesmo.
          </p>
          <form className="flex justify-center">
            <button
              type="submit"
              style={{ backgroundColor: COLOR_BUTTON_BG }}
              className="w-60 p-3 text-white font-bold rounded-lg hover:opacity-90 transition shadow-md"
            >
              ENTRAR
            </button>
          </form>
        </div>
      </AuthSidebar>
      <div className="w-full lg:w-3/5 p-16 flex justify-center items-center">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-center text-[#003637] mb-2">
            Crie sua conta
          </h2>
          <p className="text-[#003637] text-center mb-8">Preencha seus dados</p>
          <div className="flex bg-gray-200 rounded-lg p-1 mb-8">
            <button
              className="w-1/2 p-3 text-sm font-semibold rounded-lg text-white"
              style={{ backgroundColor: COLOR_TEAL }}
            >
              EMPRESA
            </button>
            <button className="w-1/2 p-3 text-sm font-semibold rounded-lg text-gray-500">
              PROFISSIONAL AUTÔNOMO
            </button>
          </div>
          <form className="space-y-4">
            <InputWithIcon Icon={VscMail} type="email" placeholder="Email" />
            <InputWithIcon Icon={VscLock} type="password" placeholder="Senha" />
            <InputWithIcon
              Icon={VscHome}
              type="text"
              placeholder="Nome da Empresa"
            />
            <InputWithIcon Icon={VscNotebook} type="text" placeholder="CNPJ" />
            <ServiceDropdown />
            <button
              type="submit"
              style={{ backgroundColor: COLOR_TEAL }}
              className="w-full p-3 mt-8 text-white font-bold rounded-lg hover:opacity-90 transition shadow-md"
            >
              CRIAR CONTA
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;
