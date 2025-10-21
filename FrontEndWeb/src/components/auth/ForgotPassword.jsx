import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscMail } from "react-icons/vsc";
import InputWithIcon from "../../components/common/InputWithIcon";
import AuthSidebar from "./AuthSidebar";
import { requestPasswordReset } from "../../services/authService";
import DOG_AND_CAT_IMAGE from "../../assets/dogAndCat.png";

const COLOR_BUTTON_BG = "#003637";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(null);
    if (success) setSuccess(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      setSuccess(
        "Um link de recuperação de senha foi enviado para o seu e-mail."
      );
      const emailToPass = email;
      setEmail("");
      setTimeout(() => {
        navigate("/verify-code", { state: { email: emailToPass } });
      }, 500);
    } catch (err) {
      setError(
        err.message ||
          "Falha ao solicitar a recuperação de senha. Verifique o e-mail."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <AuthSidebar widthClass="lg:w-1/3 lg:order-1">
        <div className="w-full max-w-sm flex flex-col h-full text-white mx-auto">
          <div className="flex flex-col justify-center flex-grow w-full">
            <h2 className="text-3xl text-[#003637] font-bold mb-1">
              Esqueceu sua senha?
            </h2>
            <p className="text-base text-[#003637] font-medium mb-0">
              Insira seu e-mail abaixo para recuperar sua senha.
            </p>
            <form className="w-full space-y-4 mt-5" onSubmit={handleSubmit}>
              <InputWithIcon
                Icon={VscMail}
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
                inputClassName="bg-white text-gray-800 p-3 w-full border-none focus:ring-0"
                containerClassName="rounded-lg shadow-sm bg-white"
                iconClassName="text-[#003637]"
              />
              {error && (
                <p className="text-red-300 font-semibold text-sm">{error}</p>
              )}
              {success && (
                <p className="text-green-300 font-semibold text-sm">
                  {success}
                </p>
              )}
              <button
                type="submit"
                style={{ backgroundColor: COLOR_BUTTON_BG }}
                className="w-full p-3 mt-4 text-white font-bold rounded-lg hover:opacity-90 transition shadow-md text-center"
                disabled={isLoading}
              >
                {isLoading ? "ENVIANDO..." : "ENVIAR"}
              </button>
            </form>
          </div>
          <div className="w-full flex justify-end pt-4">
            <Link
              to="/login"
              className="text-sm text-[#003637] font-medium hover:underline flex items-center"
            >
              Volte para o Login
            </Link>
          </div>
        </div>
      </AuthSidebar>
      <div className="w-full lg:w-2/3 flex justify-center items-end lg:order-2 bg-white h-screen overflow-hidden">
        <img
          src={DOG_AND_CAT_IMAGE}
          alt="Cachorro e Gato"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
