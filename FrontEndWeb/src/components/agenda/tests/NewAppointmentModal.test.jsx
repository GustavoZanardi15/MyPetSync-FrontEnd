import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewAppointmentModal from "../NewAppointmentModal";
import { createAppointment } from "../../../services/agendaService";

jest.mock("../../../services/agendaService", () => ({
  createAppointment: jest.fn(() => Promise.resolve({ id: 1 })),
  updateAppointment: jest.fn(),
}));

describe("NewAppointmentModal Component", () => {
  beforeEach(() => jest.clearAllMocks());

  it("chama createAppointment ao enviar o formulário", async () => {
    const onAppointmentSaved = jest.fn();
    const onClose = jest.fn();

    render(
      <NewAppointmentModal
        isOpen={true}
        onClose={onClose}
        onAppointmentSaved={onAppointmentSaved}
        providerId="123"
        appointmentToEdit={{ pet: { _id: "pet123" } }} 
      />
    );

    const obsInput = screen.getByPlaceholderText(/observações/i);
    fireEvent.change(obsInput, { target: { value: "teste" } });
    fireEvent.click(screen.getByText(/salvar/i));

    await waitFor(() => {
      expect(createAppointment).toHaveBeenCalledTimes(1);
      expect(onAppointmentSaved).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
