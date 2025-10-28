import React, { useState } from "react";
import { login } from "../../services/authService";
import { VscLock, VscMail } from "react-icons/vsc";
import InputWithIcon from "../../components/common/InputWithIcon";
import AuthSidebar from "./AuthSidebar";
import { Link, useNavigate } from "react-router-dom";

const COLOR_TEAL = "#058789";
const COLOR_BUTTON_BG = "#003637";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.senha);
      navigate("/homePage", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <AuthSidebar widthClass="lg:w-1/3 lg:order-1 hidden lg:block">
        <div className="area-formulario text-center text-[#003637]">
          <h2 className="text-4xl font-bold text-[#003637] mb-3">
            Bem-vindo de volta!
          </h2>
          <p className="text-lg font-semibold text-[#003637] mb-8">
            Crie sua conta e comece agora.
          </p>
          <Link
            to="/registerAutonomo"
            style={{ backgroundColor: COLOR_BUTTON_BG }}
            className="w-60 p-3 text-white font-bold rounded-lg hover:opacity-90 transition shadow-md inline-block"
          >
            CRIAR CONTA
          </Link>
        </div>
      </AuthSidebar>
      <div className="w-full lg:w-2/3 p-16 flex justify-center items-center lg:order-2">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-center text-[#003637] mb-2">
            Entre na sua conta
          </h2>
          <p className="text-[#003637] font-medium text-center mb-8">
            Insira suas credenciais
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputWithIcon
              Icon={VscMail}
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputWithIcon
              Icon={VscLock}
              type="password"
              placeholder="Senha"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
            />
            <p className="text-sm text-gray-500 font-semibold text-left pt-2">
              <Link
                to="/forgot-password"
                className="hover:text-teal-600 transition"
              >
                Esqueceu sua senha?
              </Link>
            </p>
            {error && (
              <p className="text-red-500 font-semibold text-sm text-center whitespace-pre-line">
                {error}
              </p>
            )}
            <button
              type="submit"
              style={{ backgroundColor: COLOR_TEAL }}
              className="w-full p-3 mt-8 text-white font-bold rounded-lg hover:opacity-90 transition shadow-md text-center"
              disabled={isLoading}
            >
              {isLoading ? "ENTRANDO..." : "ENTRAR"}
            </button>
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                Não tem conta?
                <Link
                  to="/registerAutonomo"
                  className="text-teal-600 font-bold hover:underline ml-1"
                >
                  Crie sua conta
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
