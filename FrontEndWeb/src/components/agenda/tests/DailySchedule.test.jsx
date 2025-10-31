import { render, screen, fireEvent } from "@testing-library/react";
import DailySchedule from "../DailySchedule";

describe('DailySchedule Component', () => {
    it('deve renderizar o título com a data e o total de agendamentos', () => {
        render(<DailySchedule onAddAppointment={jest.fn()} />);

        expect(screen.getByText("26 de Agosto de 2025")).toBeInTheDocument();
        expect(screen.getByText("2 agendamentos")).toBeInTheDocument();
    });


    it('deve exibir os horários corretamente de 8:00 até 18:00', () => {
        render(<DailySchedule onAddAppointment={jest.fn()} />);
        
        const hours = [
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
        ];

        hours.forEach((time) => {
            expect(screen.getByText(time)).toBeInTheDocument();
        });
    });


    it('deve renderizar corretamente os agendamentos mockados (Rex e Luna)', () => {
        render(<DailySchedule onAddAppointment={jest.fn()} />);

        expect(screen.getByText("Rex")).toBeInTheDocument();
        expect(screen.getByText("Luna")).toBeInTheDocument();

        expect(screen.getByText("Mário Silva")).toBeInTheDocument();
        expect(screen.getByText("João Santos")).toBeInTheDocument();

        expect(screen.getByText("Confirmado")).toBeInTheDocument();
        expect(screen.getByText("Pendente")).toBeInTheDocument();  
    });


    it('deve renderizar botões "Adicionar agendamento" nos horários vazios', () => {
        render(<DailySchedule onAddAppointment={jest.fn()} />);

        const addButtons = screen.getAllByText("Adicionar agendamento");
        expect(addButtons.length).toBe(9);
    });


    it('deve chamar a função onAddAppointment ao clicar em "Adicionar agendamento"', () => {
        const mockAddAppointment = jest.fn();
        render(<DailySchedule onAddAppointment={mockAddAppointment} />);

        const addButtons = screen.getAllByText("Adicionar agendamento");
        fireEvent.click(addButtons[0]);

        expect(mockAddAppointment).toHaveBeenCalledTimes(1);
        expect(mockAddAppointment).toHaveBeenCalledWith(expect.any(String));
    });


    it('deve exibir o botão de editar para horários com agendamento', () => {
        render(<DailySchedule onAddAppointment={jest.fn()} />);

        const editButtons = screen.getAllByRole("button", { name: "" });
        expect(editButtons.length).toBeGreaterThanOrEqual(2);
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    })
})