import { renderHook, act } from "@testing-library/react";
import { useAppointmentForm } from "../../agenda/useAppointmentForm";

import { searchPets } from "../../../services/petService";
import {
  fetchProviderProfile,
  getProviderType,
} from "../../../services/providerService";

import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../../../services/agendaService";

jest.mock("../../../services/petService", () => ({
  searchPets: jest.fn(),
}));

jest.mock("../../../services/providerService", () => ({
  fetchProviderProfile: jest.fn(),
  getProviderType: jest.fn(),
}));

jest.mock("../../../services/agendaService", () => ({
  createAppointment: jest.fn(),
  updateAppointment: jest.fn(),
  deleteAppointment: jest.fn(),
}));

describe('useAppointmentForm', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseProps = {
    appointmentToEdit: null,
    providerId: "123",
    isLoadingProvider: false,
    initialTime: "09:00",
    initialDate: "2025-01-01",
    isOpen: true,
    onClose: jest.fn(),
    onAppointmentSaved: jest.fn(),
  };

  it('deve carregar o tipo do prestador', async () => {
    fetchProviderProfile.mockResolvedValue({ service: "Pet Shop" });

    const { result } = renderHook(() =>
      useAppointmentForm(baseProps)
    );

    await act(async () => {});

    expect(fetchProviderProfile).toHaveBeenCalled();
    expect(result.current.providerType).toBe("Pet Shop");
  });

  it('não deve salvar se nenhum pet for selecionado', async () => {
    fetchProviderProfile.mockResolvedValue({ service: "Pet Shop" });

    const { result } = renderHook(() =>
      useAppointmentForm(baseProps)
    );

    await act(async () => {});

    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} });
    });

    expect(result.current.error).toBe(
      "Por favor, selecione um Pet válido da lista de sugestões."
    );

    expect(createAppointment).not.toHaveBeenCalled();
  });

  it('deve criar um novo agendamento', async () => {
    fetchProviderProfile.mockResolvedValue({ service: "Pet Shop" });

    const onSaved = jest.fn();
    const onClose = jest.fn();

    const props = {
      ...baseProps,
      onAppointmentSaved: onSaved,
      onClose: onClose,
    };

    const { result } = renderHook(() =>
      useAppointmentForm(props)
    );

    await act(async () => {});

    act(() => {
      result.current.handleChange({
        target: { name: "petName", value: "Rex" },
      });
    });

    act(() => {
      result.current.handlePetSelect({
        _id: "PET123",
        nome: "Rex",
        tutorId: { name: "João" },
      });
    });

    act(() => {
      result.current.handleChange({
        target: { name: "serviceType", value: "Banho" },
      });
    });

    createAppointment.mockResolvedValue({});

    await act(async () => {
      result.current.handleSubmit({ preventDefault: () => {} });
    });

    expect(createAppointment).toHaveBeenCalled();
    expect(onSaved).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
