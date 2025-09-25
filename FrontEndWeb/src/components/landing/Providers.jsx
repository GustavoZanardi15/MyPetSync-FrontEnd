import check from "../../assets/check.png";

const Providers = () => {
  return (
    <div className="bg-white py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-12">
          Prestadores de Serviço
        </h2>
        <p className="text-xl font-semibold text-center text-teal-800 mb-20">
          Além de facilitar a vida dos tutores, o MyPet Sync <br></br>
          também conecta empresas e profissionais autônomos <br></br>
          do setor pet a novos clientes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20">
          <div className="bg-[#058789] text-white rounded-lg shadow-lg flex items-center space-x-4">
            <img src={check} alt="iconCheck" className="w-24 h-24"></img>
            <p className="text-lg text-left">
              Exiba seus serviços, preços e avaliações de clientes.
            </p>
          </div>
          <div className="bg-[#058789] text-white rounded-lg shadow-lg flex items-center space-x-4">
            <img src={check} alt="iconCheck" className="w-24 h-24"></img>
            <p className="text-lg text-left">
              Gerencie sua própria agenda de forma prática e organizada.
            </p>
          </div>
          <div className="bg-[#058789] text-white rounded-lg shadow-lg flex items-center space-x-4">
            <img src={check} alt="iconCheck" className="w-24 h-24"></img>
            <p className="text-lg text-left">
              Aumente a visibilidade do seu negócio no catálogo de prestadores.
            </p>
          </div>
          <div className="bg-[#058789] text-white rounded-lg shadow-lg flex items-center space-x-4">
            <img src={check} alt="iconCheck" className="w-24 h-24"></img>
            <p className="text-lg text-left">
              Receba contatos diretos dos tutores pelo WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Providers;
