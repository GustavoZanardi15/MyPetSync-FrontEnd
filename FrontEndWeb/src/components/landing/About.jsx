const About = () => {
  return (
    <div
      style={{ backgroundColor: "#058789" }}
      className="py-10 px-4  min-h-[600px] flex items-center justify-center px-4"
    >
      <div className="container mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Sobre o My Pet Sync
        </h2>
        <p className="text-lg leading-relaxed max-w-4xl mx-auto">
          O MyPet Sync é um sistema digital que ajuda tutores a organizarem a
          rotina dos seus animais de estimação de forma simples e eficiente. O
          sistema conta com um aplicativo (focado para o uso dos tutores) e um
          portal web (focado para o uso dos prestadores de serviço), conectando
          prestadores de serviços a novos clientes de forma simples, prática e
          segura.
        </p>
      </div>
    </div>
  );
};

export default About;
