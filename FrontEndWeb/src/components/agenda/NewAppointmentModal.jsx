import React from "react";
import {
  VscClose,
  VscTag,
  VscInfo,
  VscPerson,
  VscMail,
  VscTrash,
  VscListSelection,
} from "react-icons/vsc";
import { MdOutlinePets, MdOutlineWatchLater } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { useAppointmentForm } from "./useAppointmentForm.jsx";
import { Link } from "react-router-dom";
import { Section, Input, TextArea, Select } from "./AppointmentFormHelpers.jsx";
import StatusRadios from "./StatusRadios.jsx";

const NewAppointmentModal = (props) => {
  const {
    isEditing,
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
    shouldDisableSaveButton,
    shouldDisableDeleteButton,
  } = useAppointmentForm(props);

  if (!props.isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={props.onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-[#A8E6CF] z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? "Editar Agendamento" : "Novo Agendamento"}
          </h2>
          <button
            type="button"
            onClick={props.onClose}
            aria-label="Fechar"
            className="text-gray-600 hover:text-gray-900"
          >
            <VscClose className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-8">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded font-medium">
              {error}
            </div>
          )}
          {isProviderMissing && (
            <div className="p-3 bg-red-100 text-red-700 rounded font-medium">
              Erro: O ID do Prestador não foi carregado.
              <a
                href="#"
                onClick={() => window.location.reload()}
                className="font-bold underline"
              >
                Recarregue a página
              </a>
              ou certifique-se de ter um perfil de prestador criado.
            </div>
          )}
          <Section
            title="Informações do Cliente"
            icon={VscPerson}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  label="Nome do Pet"
                  icon={MdOutlinePets}
                  placeholder="Busque o nome do Pet..."
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {(isSearching || searchResults.length > 0) && (
                  <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                    {isSearching && (
                      <div className="p-2 text-gray-500">Buscando...</div>
                    )}
                    {!isSearching &&
                      searchResults.length === 0 &&
                      formData.petName.length > 2 && (
                        <div className="p-2 text-gray-500">
                          Pet não encontrado.
                        </div>
                      )}
                    {searchResults.map((pet) => (
                      <div
                        key={pet._id}
                        className="p-2 cursor-pointer hover:bg-teal-100"
                        onClick={() => handlePetSelect(pet)}
                      >
                        {pet.nome} ({pet.especie}) - Tutor: {pet.tutorId.name}
                      </div>
                    ))}
                  </div>
                )}
                {selectedPetId && (
                  <div className="flex items-center space-x-3 mt-1">
                    <p className="text-xs text-yellow-300">
                      Pet selecionado (ID: {selectedPetId.substring(0, 4)}...)
                    </p>
                    <Link
                      to={`/pets/${selectedPetId}/record`}
                      onClick={props.onClose}
                      className="text-xs text-blue-300 hover:text-blue-100 underline flex items-center"
                    >
                      <VscListSelection className="w-3 h-3 mr-1" /> Prontuário
                    </Link>
                  </div>
                )}
              </div>
              <Input
                label="Nome do Tutor"
                icon={VscPerson}
                placeholder="Nome do Tutor (Informação)"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                disabled={selectedPetId ? true : false}
              />
              <Input
                label="Telefone"
                icon={FiPhoneCall}
                placeholder="Telefone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                label="Email"
                icon={VscMail}
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </Section>
          <Section
            title="Informações do Serviço"
            icon={VscTag}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <div className="pb-2">
              <p className="text-sm font-medium text-yellow-300 mb-2">
                Prestador:
                {isAwaitingProviderType
                  ? "Carregando..."
                  : providerType || "Não identificado"}
              </p>
            </div>
            <Select
              label="Tipo de Serviço"
              options={availableServices}
              defaultMessage={
                isAwaitingProviderType
                  ? "Carregando serviços..."
                  : availableServices.length === 0
                  ? "Tipo de Prestador não identificado ou sem serviços"
                  : "Selecione o serviço..."
              }
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              disabled={
                isAwaitingProviderType || availableServices.length === 0
              }
            />
          </Section>
          <Section
            title="Data e Horário"
            icon={MdOutlineWatchLater}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Data"
                placeholder="DD/MM/AAAA"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              <Select
                label="Horário"
                options={[
                  "08:00",
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00",
                  "13:00",
                  "14:00",
                  "15:00",
                  "16:00",
                  "17:00",
                  "18:00",
                ]}
                defaultMessage="Selecione o horário..."
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
              <Select
                label="Duração"
                options={["30 min", "60 min", "90 min"]}
                defaultMessage="Selecione a duração..."
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
          </Section>
          <Section
            title="Status do Agendamento"
            icon={VscInfo}
            color="text-gray-700"
            className="bg-gray-50"
          >
            <StatusRadios
              value={formData.status}
              onChange={handleStatusChange}
            />
          </Section>
          <Section
            title="Observações (opcional)"
            icon={VscInfo}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <TextArea
              placeholder="Observações"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Section>
        </div>
        <div className="p-6 border-t flex justify-between items-center sticky bottom-0 bg-white z-10">
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-2 rounded-lg text-white font-semibold bg-red-600 hover:bg-red-700 transition-colors shadow-md disabled:bg-gray-400 flex items-center"
              disabled={shouldDisableDeleteButton}
            >
              {isDeleting ? (
                <>
                  <VscTrash className="w-5 h-5 mr-2" /> Excluindo...
                </>
              ) : (
                <>
                  <VscTrash className="w-5 h-5 mr-2" /> Excluir
                </>
              )}
            </button>
          )}
          <div className="flex gap-3 ml-auto">
            <button
              type="button"
              onClick={props.onClose}
              className="px-6 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
              disabled={isSaving || isDeleting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-white font-semibold bg-teal-600 hover:bg-teal-700 transition-colors shadow-md disabled:bg-gray-400"
              disabled={shouldDisableSaveButton}
            >
              {isSaving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewAppointmentModal;
