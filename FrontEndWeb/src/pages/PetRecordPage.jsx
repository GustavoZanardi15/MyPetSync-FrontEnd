import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PetHealthSection from "../components/pet/PetHealthSection.jsx";
import { getPetById } from "../services/petService";

const PetRecordPage = () => {
  const { petId } = useParams();
  const [petName, setPetName] = useState("Carregando...");
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetData = async () => {
      if (!petId) {
        setLoading(false);
        setPetName("ID do Pet Ausente");
        return;
      }
      try {
        const data = await getPetById(petId);
        setPetData(data);
        setPetName(data.nome || data.name || "Pet Desconhecido");
      } catch (error) {
        console.error("Erro ao carregar dados do Pet:", error);
        setPetName("Erro ao Carregar Pet");
      } finally {
        setLoading(false);
      }
    };
    fetchPetData();
  }, [petId]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        <h1 className="text-3xl font-bold mb-6 text-[#076163]">
          Prontuário Médico
        </h1>
        Carregando prontuário...
      </div>
    );
  }
  if (!petId || !petData) {
    return (
      <div className="p-8 text-center text-red-500">
        <h1 className="text-3xl font-bold mb-6 text-[#076163]">
          Prontuário Médico
        </h1>
        Erro: Não foi possível carregar os dados do Pet.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#076163] border-b pb-2">
        Prontuário Médico: {petName}
      </h1>
      <PetHealthSection petId={petId} petName={petName} />
    </div>
  );
};

export default PetRecordPage;
