import React, { useState, useEffect, useMemo } from "react";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileInfoBlock from "../components/profile/ProfileInfoBlock";
import { useNavigate } from "react-router-dom";
import {
  fetchProviderProfile,
  updateProviderProfile,
} from "../services/providerService";
import { useAuth } from "../context/AuthContext";

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

const mapApiDataToForm = (data) => {
  if (!data) return null;

  const serviceCategory = data.service || "Adicionar serviço principal";
  const streetAndNumber =
    data.street && data.number ? `${data.street}, ${data.number}` : "";
  const cityAndState =
    data.city && data.state ? `${data.city}, ${data.state}` : "";

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
        label: "WhatsApp",
        value: data.whatsapp || "",
        name: "whatsapp",
        renderAs: "input",
        placeholder: "Ex: (11) 99999-9999",
      },
      {
        label: "Rua e Número",
        value: streetAndNumber,
        name: "streetAndNumber",
        fullWidth: true,
        renderAs: "input",
        placeholder: "Rua, Av. e Número",
      },
      {
        label: "Cidade e Estado",
        value: cityAndState,
        name: "cityAndState",
        renderAs: "input",
        placeholder: "Ex: Maringá, PR",
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
        value: data.openingHours?.join(", ") || "Seg-Sex: 8h-18h, Sáb: 8h-12h",
        name: "openingHours",
        renderAs: "textarea",
        placeholder:
          "Liste os horários separados por vírgula (Ex: Seg-Sex: 8h-18h, Sáb: 8h-12h)",
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
  const { forceProfileReload } = useAuth();
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

    const acceptedFields = [
      "name",
      "email",
      "whatsapp",
      "bio",
      "city",
      "state",
      "servicesOffered",
      "street",
      "number",
      "openingHours",
      "phone",
    ];

    blocks.forEach((blockType) => {
      form[blockType].forEach((item) => {
        if (
          item.name === "email" &&
          initialData &&
          item.value.toLowerCase() === initialData.email.toLowerCase()
        ) {
          return;
        }
        if (item.name === "streetAndNumber" && item.value) {
          const parts = item.value.split(",").map((s) => s.trim());
          data.street = parts[0] || undefined;
          data.number = parts[1] || undefined;
        } else if (item.name === "cityAndState" && item.value) {
          const parts = item.value.split(",").map((s) => s.trim());
          data.city = parts[0] || undefined;
          data.state = parts[1] || undefined;
        } else if (
          item.name &&
          acceptedFields.includes(item.name) &&
          item.value !== null &&
          item.value !== undefined &&
          item.value !== ""
        ) {
          data[item.name] = item.value;
        }
      });
    });
    if (data.servicesOffered && typeof data.servicesOffered === "string") {
      data.servicesOffered = data.servicesOffered
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    } else {
      delete data.servicesOffered;
    }
    if (data.openingHours && typeof data.openingHours === "string") {
      data.openingHours = data.openingHours
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      if (data.openingHours.length === 0) delete data.openingHours;
    } else {
      delete data.openingHours;
    }

    if (!data.city) delete data.city;
    if (!data.state) delete data.state;
    if (!data.street) delete data.street;
    if (!data.number) delete data.number;
    if (!data.phone) delete data.phone;

    delete data.service;
    delete data.cnpj;
    delete data.cpf;

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

      forceProfileReload();

      navigate("/profile");
    } catch (err) {
      const errorResponse = err.response?.data?.message || err.message;

      if (err.response?.status === 409) {
        setError(
          err.response.data.message || "Erro de conflito (E-mail já em uso)."
        );
      } else {
        setError("Erro ao salvar: " + errorResponse);
      }
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
      {error && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProfileCard
            name={formData.profile.name}
            category={formData.profile.category}
            imageUrl={formData.profile.imageUrl}
            clientCount={formData.profile.clientCount}
            rating={formData.profile.rating}
            reviewCount={formData.profile.reviewCount}
          />
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
