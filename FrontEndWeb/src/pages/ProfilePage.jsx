import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileInfoBlock from "../components/profile/ProfileInfoBlock";
import { fetchProviderProfile } from "../services/providerService";

const EditIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-5 h-5 mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.862 4.487Zm0 0L19.5 7.125"
    />
  </svg>
);
const StyledDataDisplay = ({ value }) => (
  <div className="bg-white p-3 rounded-lg text-teal-800 font-medium border border-black">
    {value}
  </div>
);

const translateProviderType = (type) => {
  if (!type) return "Tipo Pendente";
  const upperCaseType = type.toUpperCase();
  switch (upperCaseType) {
    case "COMPANY":
      return "Empresa";
    case "AUTONOMO":
      return "Autônomo";
    default:
      return type;
  }
};

const mapProviderData = (data) => {
  if (!data) return {};
  const registrationType = translateProviderType(data.type);
  const serviceCategory = data.service || "Adicione o serviço principal";
  const displayServiceCategory = serviceCategory.toUpperCase();
  let address = "Adicionar endereço completo (Rua, Cidade, Estado)";
  if (data.street && data.number && data.city && data.state) {
    const complement = data.complement ? `, ${data.complement}` : "";
    const zipCode = data.zipCode ? ` (${data.zipCode})` : "";
    address = `${data.street}, ${data.number}${complement} - ${data.city}, ${data.state}${zipCode}`;
  } else if (data.street && data.city) {
    address = `${data.street} - ${data.city}, ${data.state || ""}`;
  }

  return {
    profile: {
      name: data.name || "Nome da Empresa Pendente",
      category: registrationType,
      imageUrl:
        data.profilePictureUrl ||
        "https://placehold.co/128x128/FFBD70/ffffff?text=PET",
      clientCount: data.metrics?.clientCount || 0,
      rating: data.metrics?.rating || 0,
      reviewCount: data.metrics?.reviewCount || 0,
    },
    basicInfo: [
      {
        label: "Nome da Empresa",
        value: (
          <StyledDataDisplay
            value={data.name || "Adicione o nome fantasia ou razão social"}
          />
        ),
      },
      {
        label: "Tipo de Serviço",
        value: <StyledDataDisplay value={displayServiceCategory} />,
      },
      {
        label: "CNPJ/CPF",
        value: (
          <StyledDataDisplay
            value={
              data.cnpj ||
              data.cpf ||
              "Não informado. Necessário para emissão de nota."
            }
          />
        ),
      },
    ],
    contactInfo: [
      {
        label: "Email",
        value: (
          <StyledDataDisplay
            value={data.email || "Adicionar e-mail para contato e notificações"}
          />
        ),
      },
      {
        label: "Telefone",
        value: (
          <StyledDataDisplay
            value={data.phone || "Adicione para contato rápido"}
          />
        ),
      },
      {
        label: "Endereço",
        value: <StyledDataDisplay value={address} />,
        fullWidth: true,
      },
      {
        label: "WhatsApp",
        value: (
          <StyledDataDisplay
            value={data.whatsapp || "Adicione WhatsApp para contato imediato"}
          />
        ),
      },
    ],
    additionalInfo: [
      {
        label: "Descrição da Empresa",
        value: (
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700">
            {data.description ||
              "Descreva sua empresa em poucas linhas para atrair e informar clientes."}
          </div>
        ),
        fullWidth: true,
      },
      {
        label: "Horário de Funcionamento",
        value: (
          <div className="space-y-2">
            <StyledDataDisplay
              value={
                data.openingHours ||
                "Horário indisponível. Clientes não podem agendar."
              }
            />
          </div>
        ),
      },
      {
        label: "Serviços Oferecidos",
        value: (
          <div className="p-3 rounded-lg bg-teal-50 border border-black text-teal-800 font-medium">
            {data.servicesOffered?.join(", ") ||
              "Adicionar serviços (Consulta, Banho, Tosa, etc.)"}
          </div>
        ),
        fullWidth: true,
      },
    ],
  };
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [providerData, setProviderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProviderProfile();
        setProviderData(data);
      } catch (error) {
        console.error("Erro ao carregar perfil do prestador:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  const mappedData = useMemo(
    () => mapProviderData(providerData),
    [providerData]
  );

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-[#003637] text-xl">
        Carregando perfil...
      </div>
    );
  }

  if (!providerData) {
    return (
      <div className="p-8 text-center text-red-600 text-xl">
        Erro ao carregar o perfil. Verifique se o usuário é um prestador.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#003637]">
            Perfil da Empresa
          </h1>
          <p className="text-md font-semibold text-[#003637]">
            Gerencie as informações da sua empresa
          </p>
        </div>
        <button
          onClick={handleEditProfile}
          className="flex items-center px-6 py-2 bg-[#058789] text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-lg"
        >
          <EditIcon className="w-5 h-5 mr-2 fill-white" />
          Editar Perfil
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProfileCard
            name={mappedData.profile.name}
            category={mappedData.profile.category}
            imageUrl={mappedData.profile.imageUrl}
            clientCount={mappedData.profile.clientCount}
            rating={mappedData.profile.rating}
            reviewCount={mappedData.profile.reviewCount}
          />
        </div>
        <div className="lg:col-span-2 space-y-6 ">
          <ProfileInfoBlock
            title="Informações Básicas"
            data={mappedData.basicInfo}
            editable
          />
          <ProfileInfoBlock
            title="Informações de Contato"
            data={mappedData.contactInfo}
            editable
          />
          <ProfileInfoBlock
            title="Informações Adicionais"
            data={mappedData.additionalInfo}
            editable
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
