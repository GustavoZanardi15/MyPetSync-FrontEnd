import { BsClipboard2DataFill } from "react-icons/bs";

const WelcomeBanner = () => {
  return (
    <div className="bg-green-100 p-8 rounded-xl shadow-md mb-6 flex items-center justify-between border-l-4 border-green-400">
      <div className="flex items-center">
        <BsClipboard2DataFill className="w-8 h-8 text-green-600 mr-8" />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Bem vindo de volta!
          </h1>
          <p className="text-gray-600 mt-1">
            Seu resumo do dia: mantenha o controle e cuide dos seus clientes.
          </p>
        </div>
      </div>
      <div className="text-sm text-green-500 font-semibold hidden md:block">
        My Pet Sync
      </div>
    </div>
  );
};

export default WelcomeBanner;
