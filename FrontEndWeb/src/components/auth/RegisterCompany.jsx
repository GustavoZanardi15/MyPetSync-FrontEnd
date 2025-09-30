import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import {
  VscLock,
  VscMail,
  VscHome,
  VscNotebook,
  VscChevronDown,
} from "react-icons/vsc";

const COLOR_TEAL = "#058789";
const COLOR_BUTTON_BG = "#003637";

const COMPANY_SERVICES = [
  "Clínica Veterinária",
  "Pet Shop",
  "Hotel para Pets",
  "Banho e Tosa",
];

const RegisterCompany = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSelectService = (service) => {
    setSelectedService(service);
    setIsDropdownOpen(false);
  };
  return (
    <div className="flex w-full min-h-screen">
      <div
        className="w-full lg:w-1/3 p-8 sm:p-12 md:p-16 flex flex-col justify-center"
        style={{
          backgroundColor: COLOR_TEAL,
          borderTopRightRadius: "70px",
          borderBottomRightRadius: "70px",
        }}
      >
        <div className="mb-12 text-center" style={{ color: COLOR_BUTTON_BG }}>
          <div className="mb-10 text-white">
            <p className="text-4xl font-bold">Portal</p>
            <h1 className="text-4xl font-bold">Prestador de Serviço</h1>
          </div>
          <img src={Logo} alt="Logo" className="w-44 h-48 mb-10 mx-auto" />
        </div>
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
      </div>
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
            <div className="relative">
              <VscMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 pl-10 rounded-lg border-none bg-gray-200 text-gray-800 placeholder-gray-500"
              />
            </div>
            <div className="relative">
              <VscLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                placeholder="Senha"
                className="w-full p-3 pl-10 rounded-lg border-none bg-gray-200 text-gray-800 placeholder-gray-500"
              />
            </div>
            <div className="relative">
              <VscHome className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Nome da Empresa"
                className="w-full p-3 pl-10 rounded-lg border-none bg-gray-200 text-gray-800 placeholder-gray-500"
              />
            </div>
            <div className="relative">
              <VscNotebook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="CNPJ"
                className="w-full p-3 pl-10 rounded-lg border-none bg-gray-200 text-gray-800 placeholder-gray-500"
              />
            </div>
            <div className="relative pt-2">
              <button
                type="button"
                onClick={handleToggleDropdown}
                className="relative w-full p-3 rounded-lg border-none text-white font-semibold flex justify-between items-center hover:opacity-90 transition"
                style={{ backgroundColor: COLOR_TEAL }}
              >
                {selectedService || "Selecione o Tipo de Serviço"}
                <VscChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {COMPANY_SERVICES.map((service) => (
                    <li
                      key={service}
                      onClick={() => handleSelectService(service)}
                      className="p-3 text-sm text-gray-700 font-semibold hover:bg-gray-100 cursor-pointer transition"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
