import { render, screen, fireEvent } from "@testing-library/react";
import NewAppointmentModal from "../NewAppointmentModal";

describe('NewAppointmentModal Component', () => {
    it('não deve renderizar o modal quando isOpen for falso', () => {
        render(<NewAppointmentModal isOpen={false} onClose={jest.fn()} />);
        expect(screen.queryByText("Novo Agendamento")).not.toBeInTheDocument();
    });


    it('deve renderizar o modal quando isOpen for verdadeiro', () => {
        render(<NewAppointmentModal isOpen={true} onClose={jest.fn()} />);
        expect(screen.getByText("Novo Agendamento")).toBeInTheDocument();
        expect(screen.getByText("Preencha os dados do agendamento")).toBeInTheDocument();
    });


    it('deve chamar onClose ao clicar fora do modal', () => {
        const onClose = jest.fn();
        render(<NewAppointmentModal isOpen={true} onClose={onClose} />);
        const backdrop = screen.getByRole("dialog").parentElement || screen.getByText("Novo Agendamento").closest("div");
        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalled();
    });


    it('não deve chamar onClose ao clicar dentro do conteúdo do modal', () => {
        const onClose = jest.fn();
        render(<NewAppointmentModal isOpen={true} onClose={onClose} />);
        const content = screen.getByText("Novo Agendamento");
        fireEvent.click(content);
        expect(onClose).not.toHaveBeenCalled();
    });


    it('deve chamar onClose ao clicar no botão de fechar (ícone)', () => {
        const onClose = jest.fn();
        render(<NewAppointmentModal isOpen={true} onClose={onClose} />);
        const closeButton = screen.getByRole("button", { name: "" }); 
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalled();
    });


    it('deve renderizar as seções principais', () => {
        render(<NewAppointmentModal isOpen={true} onClose={jest.fn()} />);

        expect(screen.getByText("Informações do Cliente")).toBeInTheDocument();
        expect(screen.getByText("Informações do Serviço")).toBeInTheDocument();
        expect(screen.getByText("Data e Horário")).toBeInTheDocument();
        expect(screen.getByText("Status do Agendamento")).toBeInTheDocument();
        expect(screen.getByText("Observações (opcional)")).toBeInTheDocument();
    });


    it('deve exibir campos principais de entrada', () => {
        render(<NewAppointmentModal isOpen={true} onClose={jest.fn()} />);

        expect(screen.getByPlaceholderText("Nome do Pet")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Nome do Tutor")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Telefone")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    });


    it('deve exibir os selects e opções esperadas', () => {
        render(<NewAppointmentModal isOpen={true} onClose={jest.fn()} />);

        expect(screen.getByLabelText("Tipo de Serviço")).toBeInTheDocument();
        expect(screen.getByText("Consulta")).toBeInTheDocument();
        expect(screen.getByText("Banho")).toBeInTheDocument();

        expect(screen.getByLabelText("Horário")).toBeInTheDocument();
        expect(screen.getByLabelText("Duração")).toBeInTheDocument();
    });


    it('deve renderizar o campo de texto de observações', () => {
        render(<NewAppointmentModal isOpen={true} onClose={jest.fn()} />);
        expect(
        screen.getByPlaceholderText("Informações adicionais sobre o agendamento...")
        ).toBeInTheDocument();
    });


    it('deve exibir e permitir seleção de status do agendamento', () => {
        render(<NewAppointmentModal isOpen={true} onClose={jest.fn()} />);
        const radioAgendado = screen.getByDisplayValue("Agendado");
        const radioConfirmado = screen.getByDisplayValue("Confirmado");

        expect(radioAgendado).toBeChecked();
        fireEvent.click(radioConfirmado);
        expect(radioConfirmado).toBeChecked();
    });


    it('deve renderizar os botões "Cancelar" e "Salvar"', () => {
        render(<NewAppointmentModal isOpen={true} onClose={jest.fn()} />);
        expect(screen.getByText("Cancelar")).toBeInTheDocument();
        expect(screen.getByText("Salvar")).toBeInTheDocument();
    });


    it('deve chamar onClose ao clicar no botão "Cancelar"', () => {
        const onClose = jest.fn();
        render(<NewAppointmentModal isOpen={true} onClose={onClose} />);
        const cancelButton = screen.getByText("Cancelar");
        fireEvent.click(cancelButton);
        expect(onClose).toHaveBeenCalled();
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    })
})

