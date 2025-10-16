import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputWithIcon from "../common/InputWithIcon";
import ServiceDropdown from "../common/ServiceDropdown";
import { VscLock, VscMail, VscAccount, VscNotebook } from "react-icons/vsc";
import AuthSidebar from "./AuthSidebar";
import { signup } from "../../services/authService";

const COLOR_TEAL = "#058789";
const COLOR_BUTTON_BG = "#003637";

const AUTONOMO_SERVICES = ["Pet Sistter", "Veterinário Autônomo", "Adestrador"];

const RegisterAutonomo = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    document: "",
    service: AUTONOMO_SERVICES[0],
    role: "PROFESSIONAL_AUTONOMO",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (error) setError(null);
  };
  const handleServiceChange = (serviceValue) => {
    setFormData((prevData) => ({ ...prevData, service: serviceValue }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signup(formData);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <AuthSidebar widthClass="lg:w-1/3">
        <div className="area-formulario text-center text-[#003637]">
          <h2 className="text-4xl font-bold mb-3">Bem-vindo de volta! </h2>
          <p className="text-lg font-semibold mb-8">
            Acesse sua conta agora mesmo.
          </p>
          <Link
            to="/login"
            style={{ backgroundColor: COLOR_BUTTON_BG }}
            className="w-60 p-3 text-white font-bold rounded-lg hover:opacity-90 transition shadow-md inline-block"
          >
            ENTRAR
          </Link>
        </div>
      </AuthSidebar>
      <div className="w-full lg:w-3/5 p-16 flex justify-center items-center">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-center text-[#003637] mb-2">
            Crie sua conta
          </h2>
          <p className="text-[#003637] font-medium text-center mb-8">
            Preencha seus dados
          </p>
          <div className="flex bg-gray-200 rounded-lg p-1 mb-8">
            <Link
              to="/registerCompany"
              className="w-1/2 p-3 text-sm font-semibold rounded-lg text-gray-500 text-center"
            >
              EMPRESA
            </Link>
            <button
              className="w-1/2 p-3 text-sm font-semibold rounded-lg text-white"
              style={{ backgroundColor: COLOR_TEAL }}
            >
              PROFISSIONAL AUTÔNOMO
            </button>
          </div>
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
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <InputWithIcon
              Icon={VscAccount}
              type="text"
              placeholder="Nome do Profissional"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <InputWithIcon
              Icon={VscNotebook}
              type="text"
              placeholder="CPF"
              name="document"
              value={formData.document}
              onChange={handleInputChange}
            />
            <ServiceDropdown
              services={AUTONOMO_SERVICES}
              value={formData.service}
              onChange={handleServiceChange}
            />
            {error && (
              <p className="text-red-500 font-semibold text-sm text-center">
                {error}
              </p>
            )}
            <button
              type="submit"
              style={{ backgroundColor: COLOR_TEAL }}
              className="w-full p-3 mt-8 text-white font-bold rounded-lg hover:opacity-90 transition shadow-md text-center"
              disabled={isLoading}
            >
              {isLoading ? "CRIANDO CONTA..." : "CRIAR CONTA"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterAutonomo;
