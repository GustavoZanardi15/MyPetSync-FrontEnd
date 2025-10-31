import React, { useState, useEffect, useMemo } from "react";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileInfoBlock from "../components/profile/ProfileInfoBlock";
import { useNavigate } from "react-router-dom";
import {
  fetchProviderProfile,
  updateProviderProfile,
} from "../services/providerService";

const EditableInput = ({
  value,
  type = "text",
  name,
  onChange,
  placeholder,
}) => {
  return (
    <div className={`flex flex-col w-full`}>
      <input
        type={type}
        defaultValue={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-white p-3 rounded-lg text-teal-800 font-medium border border-gray-300 focus:border-[#058789] focus:ring focus:ring-[#058789]/50 transition-colors"
      />
    </div>
  );
};
const EditableTextarea = ({ value, name, onChange, placeholder }) => {
  return (
    <div className="flex flex-col w-full">
      <textarea
        defaultValue={value}
        rows="3"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="p-3 rounded-lg bg-white border border-gray-300 focus:border-[#058789] focus:ring focus:ring-[#058789]/50 transition-colors text-gray-700"
      />
    </div>
  );
};
const EditableSchedule = ({ value, name, onChange }) => {
  const scheduleArray = Array.isArray(value) ? value : value ? [value] : [""];

  return (
    <div className="flex flex-col w-full">
      {scheduleArray.map((item, index) => (
        <input
          key={index}
          defaultValue={item}
          name={`${name}_${index}`}
          onChange={onChange}
          placeholder={`Horário ${index + 1}`}
          className="mb-2 p-3 rounded-lg bg-white border border-gray-300 focus:border-[#058789] focus:ring focus:ring-[#058789]/50 transition-colors text-teal-800 font-medium"
        />
      ))}
    </div>
  );
};

const mapApiDataToForm = (data) => {
  if (!data) return null;

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

  const serviceCategory = data.service || "Adicionar serviço principal";
  const addressValue =
    data.street && data.number ? `${data.street}, ${data.number}` : "";

  return {
    profile: {
      name: data.name || "",
      category: translateProviderType(data.type),
      imageUrl: data.profilePictureUrl || "",
      clientCount: 0,
      rating: data.averageRating || 0,
      reviewCount: 0,
    },
    basicInfo: [
      {
        label: "Nome da Empresa",
        value: data.name || "",
        name: "name",
        renderAs: "input",
        placeholder: "Ex: Clínica Veterinária São José",
      },
      {
        label: "Tipo de Serviço",
        value: serviceCategory,
        name: "service",
        renderAs: "input",
        placeholder: "Ex: Pet Sitter, Veterinário Autônomo",
      },
      {
        label: "CNPJ/CPF",
        value: data.cnpj || data.cpf || "",
        name: data.cnpj ? "cnpj" : "cpf",
        renderAs: "input",
        placeholder: "Ex: 12.345.678/0001-90",
      },
    ],
    contactInfo: [
      {
        label: "Email",
        value: data.email || "",
        name: "email",
        type: "email",
        renderAs: "input",
        placeholder: "Ex: contato@suaempresa.com",
      },
      {
        label: "Telefone",
        value: data.phone || "",
        name: "phone",
        renderAs: "input",
        placeholder: "Ex: (11) 99999-9999",
      },
      {
        label: "Endereço",
        value: addressValue,
        name: "address_line1",
        fullWidth: true,
        renderAs: "input",
        placeholder:
          "Informe seu endereço completo (Ex: Rua, Número, Cidade e Estado)",
      },
      {
        label: "WhatsApp",
        value: data.whatsapp || "",
        name: "whatsapp",
        renderAs: "input",
        placeholder: "Ex: (11) 99999-9999",
      },
    ],
    additionalInfo: [
      {
        label: "Descrição da Empresa",
        value: data.bio || "",
        name: "bio",
        fullWidth: true,
        renderAs: "textarea",
        placeholder: "Escreva uma breve descrição da sua empresa...",
      },
      {
        label: "Horário de Funcionamento",
        value: data.openingHours || [
          "Segunda a Sexta: 8h às 18h.",
          "Sábado: 8h às 12h.",
        ],
        name: "openingHours",
        renderAs: "schedule",
        placeholder: "Adicione o horário de funcionamento",
      },
      {
        label: "Serviços",
        value: data.servicesOffered?.join(", ") || "",
        name: "servicesOffered",
        fullWidth: true,
        renderAs: "textarea",
        placeholder:
          "Liste os serviços separados por vírgula (Ex: Consulta, Tosa, Vacinação)",
      },
    ],
  };
};

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        const apiData = await fetchProviderProfile();
        const mappedData = mapApiDataToForm(apiData);
        setInitialData(apiData);
        setFormData(mappedData);
      } catch (err) {
        setError(err.message || "Erro ao carregar dados do perfil.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);
  const handleInputChange = (e, blockType, itemIndex) => {
    const { name, value } = e.target;
    setError(null);

    setFormData((prevData) => {
      const newBlock = prevData[blockType].map((item, idx) => {
        if (idx === itemIndex) {
          return { ...item, value: value };
        }
        return item;
      });
      return { ...prevData, [blockType]: newBlock };
    });
  };
  const extractApiData = (form) => {
    const data = {};
    const blocks = ["basicInfo", "contactInfo", "additionalInfo"];

    blocks.forEach((blockType) => {
      form[blockType].forEach((item) => {
        if (item.name) {
          if (item.renderAs !== "schedule") {
            data[item.name] = item.value;
          }
        }
      });
    });
    if (data.servicesOffered && typeof data.servicesOffered === "string") {
      data.servicesOffered = data.servicesOffered
        .split(",")
        .map((s) => s.trim());
    }

    return data;
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData || isSaving) return;

    setIsSaving(true);
    setError(null);

    try {
      const dataToSave = extractApiData(formData);
      await updateProviderProfile(dataToSave);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Não foi possível salvar as alterações.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderEditField = (item, blockType, itemIndex) => {
    const commonProps = {
      value: item.value,
      name: item.name,
      onChange: (e) => handleInputChange(e, blockType, itemIndex),
      placeholder: item.placeholder,
    };
    switch (item.renderAs) {
      case "input":
      case "select":
        return <EditableInput {...commonProps} type={item.type || "text"} />;
      case "textarea":
        return <EditableTextarea {...commonProps} />;
      case "schedule":
        return <EditableSchedule {...commonProps} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-[#003637] text-xl">
        Carregando formulário...
      </div>
    );
  }
  if (error) {
    return <div className="p-8 text-center text-red-600 text-xl">{error}</div>;
  }
  if (!formData) {
    return (
      <div className="p-8 text-center text-gray-600 text-xl">
        Dados não encontrados para edição.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSave}
      className="p-4 md:p-8 w-full bg-gray-50 min-h-screen"
    >
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#003637]">
            Editar Perfil da Empresa
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
              isSaving ? "bg-gray-500" : "bg-[#058789] hover:bg-[#003637]/90"
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
            <button
              type="button"
              className="text-sm text-white font-medium mb-4 hover:underline"
            >
              Alterar Foto
            </button>
          </ProfileCard>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <ProfileInfoBlock
            title="Informações Básicas"
            data={formData.basicInfo.map((item, index) => ({
              ...item,
              value: renderEditField(item, "basicInfo", index),
            }))}
            gridCols={2}
          />
          <ProfileInfoBlock
            title="Informações de Contato"
            data={formData.contactInfo.map((item, index) => ({
              ...item,
              value: renderEditField(item, "contactInfo", index),
            }))}
            gridCols={2}
          />
          <ProfileInfoBlock
            title="Informações Adicionais"
            data={formData.additionalInfo.map((item, index) => ({
              ...item,
              value: renderEditField(item, "additionalInfo", index),
            }))}
            gridCols={1}
          />
        </div>
      </div>
    </form>
  );
};

export default EditProfilePage;
