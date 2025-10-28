import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputWithIcon from "../../components/common/InputWithIcon";
import ServiceDropdown from "../../components/common/ServiceDropdown";
import { VscLock, VscMail, VscHome, VscNotebook } from "react-icons/vsc";
import AuthSidebar from "./AuthSidebar";
import { signup } from "../../services/authService";

const COLOR_TEAL = "#058789";
const COLOR_BUTTON_BG = "#003637";
const COMPANY_SERVICES = [
 "Clínica Veterinária",
 "Pet Shop",
 "Hotel para Pets",
 "Banho e Tosa",
];

const RegisterCompany = () => {
 const [formData, setFormData] = useState({
  email: "",
  password: "",
  companyName: "",
  cnpj: "",
  service: "",
  role: "provider",
    providerType: "empresa", 
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
  setIsLoading(true);
  setError(null);
  const mappedData = {
   nome: formData.companyName,
   email: formData.email,
   senha: formData.password,
   tipo_usuario: formData.role, 
      type: formData.providerType, 
   cnpj: formData.cnpj,
   service: formData.service,
  };
  try {
   await signup(mappedData);
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
      <button
       className="w-1/2 p-3 text-sm font-semibold rounded-lg text-white"
       style={{ backgroundColor: COLOR_TEAL }}
      >
       EMPRESA
      </button>
      <Link
       to="/registerAutonomo"
       className="w-1/2 p-3 text-sm font-semibold rounded-lg text-gray-500 text-center"
      >
       PROFISSIONAL AUTÔNOMO
      </Link>
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
       Icon={VscHome}
       type="text"
       placeholder="Nome da Empresa"
       name="companyName"
       value={formData.companyName}
       onChange={handleInputChange}
      />
      <InputWithIcon
       Icon={VscNotebook}
       type="text"
       placeholder="CNPJ"
       name="cnpj"
       value={formData.cnpj}
       onChange={handleInputChange}
      />
      <ServiceDropdown
       services={COMPANY_SERVICES}
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

export default RegisterCompany;