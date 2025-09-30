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
          <p className="text-base font-semibold mb-8">
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
      <div className=" ">
        <div className="">
          <h2 className="">Crie sua conta</h2>
          <p>Preencha seus dados</p>
          <div className="">
            <button className="">EMPRESA</button>
            <button className="">PROFISSIONAL AUTÔNOMO</button>
          </div>
          <form className="">
            <div className="">
              <VscMail className="" />
              <input type="email" placeholder="Email" className="" />
            </div>
            <div className="">
              <VscLock className="" />
              <input type="password" placeholder="Senha" className="" />
            </div>
            <div className="">
              <VscHome className="" />
              <input type="text" placeholder="Nome da Empresa" className="" />
            </div>
            <div className="">
              <VscNotebook className="" />
              <input type="text" placeholder="CNPJ" className="" />
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={handleToggleDropdown}
                className="relative w-full p-3 flex justify-between items-center"
              >
                {selectedService || "Selecione o Tipo de Serviço"}
                <VscChevronDown
                  className={` ${isDropdownOpen ? "transform rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <ul className="">
                  {COMPANY_SERVICES.map((service) => (
                    <li
                      key={service}
                      onClick={() => handleSelectService(service)}
                      className=""
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button type="submit" className="">
              CRIAR CONTA
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;
