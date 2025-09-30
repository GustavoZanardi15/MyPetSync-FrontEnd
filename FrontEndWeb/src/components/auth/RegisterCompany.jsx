import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import {
  VscLock,
  VscMail,
  VscHome,
  VscNotebook,
  VscChevronDown,
} from "react-icons/vsc";

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
    <div className="">
      <div className="">
        <div className="">
          <div className="">
            <p>Portal</p>
            <h1>Prestador de Serviço</h1>
          </div>
          <img src={Logo} alt="Logo" className="" />
        </div>
        <div className="">
          <h2>Bem-vindo de volta! </h2>
          <p>Acesse sua conta agora mesmo.</p>
          <form className="">
            <button type="submit" className="">
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
