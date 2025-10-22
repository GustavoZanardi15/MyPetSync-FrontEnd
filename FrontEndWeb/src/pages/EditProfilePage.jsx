import React, { useState } from "react";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileInfoBlock from "../components/profile/ProfileInfoBlock";
import { useLocation, useNavigate } from "react-router-dom";

const EditableInput = ({ value, label, type = "text", fullWidth, name }) => {
  return (
    <div className={`flex flex-col ${fullWidth ? "w-full" : "w-1/2"}`}>
      <input
        type={type}
        defaultValue={value}
        name={name}
        className="bg-white p-3 rounded-lg text-teal-800 font-medium border border-gray-300 focus:border-[#058789] focus:ring focus:ring-[#058789]/50 transition-colors"
      />
    </div>
  );
};
const EditableTextarea = ({ value, label, name }) => {
  return (
    <div className="flex flex-col w-full">
      <textarea
        defaultValue={value}
        rows="3"
        name={name}
        className="p-3 rounded-lg bg-white border border-gray-300 focus:border-[#058789] focus:ring focus:ring-[#058789]/50 transition-colors text-gray-700"
      />
    </div>
  );
};
const EditableSchedule = ({ label, value, name }) => {
  return (
    <div className="flex flex-col w-1/2">
      {value.map((item, index) => (
        <input
          key={index}
          defaultValue={item}
          name={`${name}_${index}`}
          className="mb-2 p-3 rounded-lg bg-white border border-gray-300 focus:border-[#058789] focus:ring focus:ring-[#058789]/50 transition-colors text-teal-800 font-medium"
        />
      ))}
    </div>
  );
};
const MOCK_COMPANY_DATA = {
  profile: {
    name: "Clínica Veterinária São José",
    category: "Clínica Veterinária",
    imageUrl: "https://placehold.co/128x128/FFBD70/ffffff?text=PET",
    clientCount: 156,
    rating: 4.9,
    reviewCount: 89,
  },
  basicInfo: [
    {
      label: "Nome da Empresa",
      value: "Clínica Veterinária São José",
      renderAs: "input",
    },
    {
      label: "Tipo de Serviço",
      value: "Clínica Veterinária",
      renderAs: "select",
    },
  ],
  contactInfo: [
    {
      label: "Email",
      value: "clinicasjose@gmail.com",
      type: "email",
      renderAs: "input",
    },
    { label: "Telefone", value: "(11) 99999-9999", renderAs: "input" },
    {
      label: "Endereço",
      value: "Rua das Flores, 123 - São Paulo, SP",
      fullWidth: true,
      renderAs: "input",
    },
    { label: "CNPJ", value: "12.345.678/0001-90", renderAs: "input" },
    { label: "WhatsApp", value: "(11) 99999-9999", renderAs: "input" },
  ],
  additionalInfo: [
    {
      label: "Descrição da Empresa",
      value:
        "Clínica veterinária especializada em cuidados completos para pets, com mais de 10 anos de experiência no mercado.",
      fullWidth: true,
      renderAs: "textarea",
    },
    {
      label: "Horário de Funcionamento",
      value: ["Segunda a Sexta: 8h às 18h.", "Sábado: 8h às 12h."],
      renderAs: "schedule",
    },
    {
      label: "Serviços",
      value:
        "Consulta veterinária, Vacinação, Castração, Limpeza Dental, Aplicação de Medicamentos, Consulta de Emergência.",
      fullWidth: true,
      renderAs: "textarea",
    },
  ],
};
const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(MOCK_COMPANY_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const handleCancel = () => {
    navigate("/profile");
  };
  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    console.log("Dados a serem salvos:", formData);
    setTimeout(() => {
      setIsSaving(false);
      navigate("/profile");
    }, 1500);
  };
  const renderEditField = (item) => {
    const commonProps = {
      label: item.label,
      value: item.value,
      fullWidth: item.fullWidth,
      name: item.label.toLowerCase().replace(/\s/g, "_"),
    };
    switch (item.renderAs) {
      case "input":
        return <EditableInput {...commonProps} type={item.type || "text"} />;
      case "textarea":
        return <EditableTextarea {...commonProps} />;
      case "schedule":
        return <EditableSchedule {...commonProps} />;
      case "select":
        return <EditableInput {...commonProps} as="select" />;
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSave}
      className="p-4 md:p-8 w-full bg-gray-50 min-h-screen"
    >
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#003637]">
            Perfil da Empresa
          </h1>
          <p className="text-md font-semibold text-[#003637]">
            Gerencie as informações da sua empresa
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-400 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-sm"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={`px-6 py-2 text-white rounded-lg font-semibold transition-colors shadow-lg ${
              isSaving ? "bg-gray-500" : "bg-[#003637] hover:bg-[#003637]/90"
            }`}
          >
            {isSaving ? "SALVANDO..." : "SALVAR"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProfileCard
            name={formData.profile.name}
            category={formData.profile.category}
            imageUrl={formData.profile.imageUrl}
            clientCount={formData.profile.clientCount}
            rating={formData.profile.rating}
            reviewCount={formData.profile.reviewCount}
          >
            <button className="text-sm text-[#058789] font-medium mt-2 hover:underline">
              Alterar Foto
            </button>
          </ProfileCard>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <ProfileInfoBlock
            title="Informações Básicas"
            data={formData.basicInfo.map((item) => ({
              ...item,
              value: renderEditField(item),
            }))}
            gridCols={2}
          />
          <ProfileInfoBlock
            title="Informações de Contato"
            data={formData.contactInfo.map((item) => ({
              ...item,
              value: renderEditField(item),
            }))}
            gridCols={2}
          />
          <ProfileInfoBlock
            title="Informações Adicionais"
            data={formData.additionalInfo.map((item) => ({
              ...item,
              value: renderEditField(item),
            }))}
            gridCols={1}
          />
        </div>
      </div>
    </form>
  );
};

export default EditProfilePage;
