import React from "react";
import dogAndCat from "../../assets/dogAndCat.png";

const Hero = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center p-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4">
            Bem vindo ao <br /> My Pet Sync!
          </h1>
          <p className="text-lg text-gray-700">
            Centralize, gerencie e sincronize os cuidados do seu pet em um só
            lugar.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src={dogAndCat}
            alt="Cachorro e gato juntos"
            className="rounded-lg shandow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
