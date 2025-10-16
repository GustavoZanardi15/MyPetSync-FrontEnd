import React, { useState } from "react";
import { login } from "../../services/authService";
import dogAndCatLogin from "../../assets/dogAndCatLogin.png";
import { VscLock, VscMail } from "react-icons/vsc";
import InputWithIcon from "../../components/common/InputWithIcon";
import AuthSidebar from "./AuthSidebar";
import { Link, useNavigate } from "react-router-dom";

const COLOR_BUTTON_BG = "#003637";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      await login(formData.email, formData.password);
      navigate("/homePage", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <AuthSidebar widthClass="lg:w-1/3 h-full">
        <div className="flex flex-col items-center justify-center w-full h-full p-8 overflow-auto">
          <div className="w-full max-w-xs">
            <h2 className="text-[#003637] text-4xl font-bold mb-8 text-center">
              Entre na sua conta
            </h2>
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
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
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <a
                href="#"
                className="relative top-0 mt-2 text-[#003637] text-base font-semibold hover:underline block text-left"
              >
                Esqueceu sua senha?
              </a>

              {error && (
                <p className="text-red-500 font-semibold text-sm text-center">
                  {error}
                </p>
              )}

              <button
                type="submit"
                style={{ backgroundColor: COLOR_BUTTON_BG }}
                className="w-full p-3 text-center text-white font-bold rounded-lg hover:opacity-90 transition shadow-md mt-6 block"
                disabled={isLoading}
              >
                {isLoading ? "ENTRANDO..." : "ENTRAR"}
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-[#003637] text-sm font-semibold">
                Não tem conta?
                <Link
                  to="/registerAutonomo"
                  className="font-bold ml-1 hover:underline"
                >
                  Crie sua conta
                </Link>
              </p>
            </div>
          </div>
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
