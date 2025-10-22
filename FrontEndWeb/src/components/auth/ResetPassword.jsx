import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscLock } from "react-icons/vsc";
import InputWithIcon from "../../components/common/InputWithIcon";
import AuthSidebar from "./AuthSidebar";

import DOG_AND_CAT_IMAGE from "../../assets/dogAndCat.png";

const COLOR_BUTTON_BG = "#003637";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex w-full min-h-screen overflow-hidden bg-white">
      <AuthSidebar
        widthClass="lg:w-1/3 lg:order-1"
        backgroundColorClass="bg-[#058789]"
      >
        <div className="w-full max-w-sm flex flex-col h-full text-white mx-auto p-8 pt-12">
          <div className="mb-12">
            <h1 className="text-2xl font-bold">Portal</h1>
            <h1 className="text-2xl font-bold">Prestador de Serviço</h1>
          </div>
          <div className="w-24 h-24 mb-16 mx-auto"></div>
          <div className="flex justify-start w-full mb-auto pb-6">
            <Link
              to="/login"
              className="text-sm font-semibold hover:underline flex items-center text-white"
            >
              &lt; Volte para o Login
            </Link>
          </div>
          <div className="flex flex-col items-start justify-end w-full mt-auto">
            <h3 className="text-xl font-semibold mb-1 text-center w-full">
              MyPetSync
            </h3>
            <h2 className="text-3xl font-bold mb-8 text-center w-full">
              Defina sua nova senha
            </h2>
            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <h3 className="text-base font-semibold mb-2">Crie sua senha</h3>
              <InputWithIcon
                Icon={VscLock}
                type="password"
                placeholder="123abc@"
                name="password"
                value={password}
                onChange={handleInputChange}
                inputClassName="bg-white text-gray-800 p-3 w-full border-none focus:ring-2 focus:ring-[#003637] rounded-lg"
                containerClassName="rounded-lg shadow-sm bg-white"
                iconClassName="text-[#003637]"
              />
              <h3 className="text-base font-semibold mb-2 pt-2">
                Digite novamente
              </h3>
              <InputWithIcon
                Icon={VscLock}
                type="password"
                placeholder="123abc@"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                inputClassName="bg-white text-gray-800 p-3 w-full border-none focus:ring-2 focus:ring-[#003637] rounded-lg"
                containerClassName="rounded-lg shadow-sm bg-white"
                iconClassName="text-[#003637]"
              />
              {error && (
                <p className="text-red-300 font-semibold text-sm text-center p-2 rounded bg-red-900/50">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-green-300 font-semibold text-sm text-center p-2 rounded bg-green-900/50">
                  {success}
                </p>
              )}
              <button
                type="submit"
                style={{ backgroundColor: COLOR_BUTTON_BG }}
                className="w-full p-3 mt-4 text-white font-bold rounded-lg hover:opacity-90 transition shadow-md text-center"
                disabled={isLoading}
              >
                {isLoading ? "DEFININDO..." : "DEFINIR SENHA"}
              </button>
            </form>
          </div>
        </div>
      </AuthSidebar>
      <div className="w-full lg:w-2/3 flex justify-center items-end lg:order-2 bg-white">
        <img
          src={DOG_AND_CAT_IMAGE}
          alt="Cachorro e Gato"
          className="w-auto h-full max-h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
