import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewAppointmentModal from "../NewAppointmentModal";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

jest.mock("../../../services/appointmentService", () => ({
  createAppointment: jest.fn(() => Promise.resolve({ id: 1 })),
}));

jest.mock("../../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('NewAppointmentModal Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza corretamente os campos do formulário', () => {
        useAuth.mockReturnValue({ user: { id: 1 } });
        render(<NewAppointmentModal onClose={jest.fn()} />);

        expect(screen.getByText("Novo Agendamento")).toBeInTheDocument();
        expect(screen.getByText("Salvar")).toBeInTheDocument();
    });


    it('chama createAppointment ao enviar o formulário', async () => {
        const { createAppointment } = require("../../../services/appointmentService");
        useAuth.mockReturnValue({ user: { id: 1 } });

        const onClose = jest.fn();
        render(<NewAppointmentModal onClose={onClose} />);

        fireEvent.change(screen.getByPlaceholderText(/observações/i), {
            target: { value: "teste" },
        });
        

        fireEvent.submit(screen.getByText("Salvar"));

        await waitFor(() => {
        expect(createAppointment).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith("Agendamento criado com sucesso!");
        expect(onClose).toHaveBeenCalled();
        });
    });


    it('exibe erro se o usuário não estiver autenticado', async () => {
        useAuth.mockReturnValue({ user: null });

        render(<NewAppointmentModal onClose={jest.fn()} />);

        fireEvent.submit(screen.getByText("Salvar"));

        await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Usuário não autenticado.");
        });
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    })
})

