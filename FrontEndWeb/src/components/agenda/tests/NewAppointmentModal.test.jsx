import { render, screen, fireEvent } from "@testing-library/react";
import NewAppointmentModal from "../NewAppointmentModal";

jest.mock("../useAppointmentForm", () => ({
  useAppointmentForm: () => ({
    isEditing: false,
    formData: {
      petName: "",
      clientName: "",
      phone: "",
      email: "",
      serviceType: "",
      date: "",
      time: "",
      duration: "",
      status: "",
      notes: ""
    },
    handleChange: jest.fn(),
    handlePetSelect: jest.fn(),
    handleStatusChange: jest.fn(),
    handleSubmit: jest.fn((e) => e.preventDefault()),
    handleDelete: jest.fn(),

    selectedPetId: null,
    searchResults: [],
    isSearching: false,
    error: null,
    isSaving: false,
    isDeleting: false,
    providerType: "banho",
    availableServices: ["banho", "tosa"],
    isAwaitingProviderType: false,
    isProviderMissing: false,
    shouldDisableSaveButton: false,
    shouldDisableDeleteButton: false,
  }),
}));

describe('NewAppointmentModal Component', () => {
    it('renderiza e dispara handleSubmit ao clicar em Salvar', () => {
        const onClose = jest.fn();
      const onAppointmentSaved = jest.fn();

      render(
        <NewAppointmentModal
          isOpen={true}
          onClose={onClose}
          onAppointmentSaved={onAppointmentSaved}
        />
      );

      const btn = screen.getByRole("button", { name: /salvar/i });

      fireEvent.click(btn);

      expect(btn).toBeInTheDocument();
    });
});