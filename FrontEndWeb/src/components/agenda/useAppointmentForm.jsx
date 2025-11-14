import { useState, useEffect, useCallback } from "react";
import { searchPets } from "../../services/petService";
import {
  fetchProviderProfile,
  getProviderType,
} from "../../services/providerService";
import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../../services/agendaService";

import {
  SERVICOS_POR_TIPO_PRESTADOR,
  STATUS_MAP,
  DURATION_MAP,
  STATUS_MAP_REVERSE,
} from "./appointmentConstants.jsx";

const getInitialFormData = (appt, initialTime, initialDate) => {
  if (appt && appt._id) {
    const date = new Date(appt.dateTime);
    const durationInMin = appt.duration;
    const clientName = appt.pet.tutorId?.name || "";

    return {
      petName: appt.pet.nome || "",
      clientName,
      phone: appt.phone,
      email: appt.email,
      date: date.toISOString().split("T")[0],
      time: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      serviceType: appt.reason || "",
      notes: appt.notes || "",
      duration:
        Object.keys(DURATION_MAP).find(
          (key) => DURATION_MAP[key] === durationInMin
        ) || "60 min",
      status: STATUS_MAP_REVERSE[appt.status] || "Agendado",
    };
  }

  return {
    petName: "",
    clientName: "",
    phone: "",
    email: "",
    serviceType: "",
    date: initialDate || new Date().toISOString().split("T")[0],
    time: initialTime || "08:00",
    duration: "60 min",
    status: "Agendado",
    notes: "",
  };
};

export const useAppointmentForm = ({
  appointmentToEdit,
  providerId,
  isLoadingProvider,
  initialTime,
  initialDate,
  isOpen,
  onClose,
  onAppointmentSaved,
}) => {
  const isEditing = !!appointmentToEdit;
  const isNewAppointment = !isEditing;

  const [selectedPetId, setSelectedPetId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState(
    getInitialFormData(appointmentToEdit, initialTime, initialDate)
  );
  const [providerType, setProviderType] = useState("");
  const [availableServices, setAvailableServices] = useState([]);
  const [isLoadingProviderType, setIsLoadingProviderType] = useState(false);

  useEffect(() => {
    setFormData(
      getInitialFormData(appointmentToEdit, initialTime, initialDate)
    );
    setSelectedPetId(appointmentToEdit ? appointmentToEdit.pet._id : "");
    setError(null);
    setProviderType("");
  }, [appointmentToEdit, initialTime, isOpen, initialDate]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (formData.petName.length > 2 && !selectedPetId) {
        setIsSearching(true);
        try {
          const results = await searchPets(formData.petName);
          setSearchResults(results);
        } catch (err) {
          console.error("Erro na busca de Pets:", err);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [formData.petName, selectedPetId]);

  useEffect(() => {
    const targetProviderId = isEditing
      ? appointmentToEdit?.provider?._id
      : providerId;

    if (!targetProviderId) {
      if (isNewAppointment && isLoadingProvider) return;
      if (isOpen && !isLoadingProvider && !providerType)
        setProviderType("Prestador Ausente");
      return;
    }

    const fetchType = async () => {
      setIsLoadingProviderType(true);
      let type = "";
      try {
        if (isEditing) {
          type = await getProviderType(targetProviderId);
        } else {
          const profile = await fetchProviderProfile();
          type = profile?.service || "";
        }
        setProviderType(type || "Não identificado");
        if (!type)
          setError(
            "Não foi possível identificar o tipo de serviço do prestador."
          );
      } catch (err) {
        console.error("Erro ao carregar tipo do prestador:", err);
        setProviderType("Falha na Busca");
      } finally {
        setIsLoadingProviderType(false);
      }
    };

    if (isOpen && !providerType) {
      fetchType();
    }
  }, [isEditing, appointmentToEdit, providerId, isOpen]);

  useEffect(() => {
    const services = SERVICOS_POR_TIPO_PRESTADOR[providerType] || [];
    setAvailableServices(services);

    const currentService = formData.serviceType;
    if (currentService && !services.includes(currentService)) {
      if (isNewAppointment) {
        setFormData((prev) => ({ ...prev, serviceType: "" }));
      }
    }
  }, [providerType, formData.serviceType, isNewAppointment]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "petName") setSelectedPetId("");
  }, []);

  const handlePetSelect = useCallback((pet) => {
    setSelectedPetId(pet._id);
    setFormData((prev) => ({
      ...prev,
      petName: pet.nome,
      clientName: pet.tutorId?.name || "",
    }));
    setSearchResults([]);
  }, []);

  const handleStatusChange = useCallback((statusValue) => {
    setFormData((prev) => ({ ...prev, status: statusValue }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    if (!selectedPetId) {
      setError("Por favor, selecione um Pet válido da lista de sugestões.");
      setIsSaving(false);
      return;
    }

    const providerIdValid =
      providerId && providerId !== "null" && providerId !== "";
    if (!isEditing && !providerIdValid) {
      setError("Erro: O ID do prestador não foi carregado.");
      setIsSaving(false);
      return;
    }

    if (!formData.serviceType) {
      setError("Por favor, selecione o Tipo de Serviço.");
      setIsSaving(false);
      return;
    }

    const payload = {
      pet: selectedPetId,
      dateTime: new Date(`${formData.date}T${formData.time}:00`).toISOString(),
      duration: DURATION_MAP[formData.duration],
      reason: formData.serviceType,
      notes: formData.notes,
      status: STATUS_MAP[formData.status] || "scheduled",
      email: formData.email,
      phone: formData.phone,
    };

    try {
      if (isEditing) {
        await updateAppointment(appointmentToEdit._id, payload);
      } else {
        const createPayload = { ...payload, provider: providerId };
        await createAppointment(createPayload, providerId);
      }
      onAppointmentSaved?.();
      onClose?.();
    } catch (err) {
      console.error("Erro ao salvar agendamento:", err);
      setError("Falha ao salvar o agendamento.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!appointmentToEdit?._id) return;

    if (
      !window.confirm(
        "Tem certeza de que deseja excluir este agendamento? Esta ação é irreversível."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError(null);
    try {
      await deleteAppointment(appointmentToEdit._id);
      onAppointmentSaved?.();
      onClose?.();
    } catch (err) {
      console.error("Erro ao excluir agendamento:", err);
      setError("Falha ao excluir o agendamento.");
    } finally {
      setIsDeleting(false);
    }
  };

  const isProviderDataReady = !!providerId && !isLoadingProvider;
  const isAwaitingProviderId = isNewAppointment && isLoadingProvider;
  const isProviderMissing =
    isNewAppointment && !providerId && !isLoadingProvider;
  const isAwaitingProviderType =
    isLoadingProviderType || (!providerType && isOpen);

  const shouldDisableSaveButton =
    isSaving ||
    isDeleting ||
    (isNewAppointment && !isProviderDataReady) ||
    isAwaitingProviderType ||
    availableServices.length === 0;
  const shouldDisableDeleteButton = isSaving || isDeleting;

  return {
    isEditing,
    isNewAppointment,
    formData,
    handleChange,
    handlePetSelect,
    handleStatusChange,
    handleSubmit,
    handleDelete,
    selectedPetId,
    searchResults,
    isSearching,
    error,
    isSaving,
    isDeleting,
    providerType,
    availableServices,
    isAwaitingProviderType,
    isProviderMissing,
    isAwaitingProviderId,
    shouldDisableSaveButton,
    shouldDisableDeleteButton,
  };
};
