import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TimeSlotButton from "../TimeSlotButton";

describe('TimeSlotButton Component', () => {
    it('deve renderizar o horário corretamente', () => {
        render(<TimeSlotButton time="10:00" onAddAppointment={jest.fn()} />);
        expect(screen.getByText("10:00")).toBeInTheDocument();
    });


    it('deve exibir o texto "Adicionar agendamento"', () => {
        render(<TimeSlotButton time="14:00" onAddAppointment={jest.fn()} />);
        expect(screen.getByText("+ Adicionar agendamento")).toBeInTheDocument();
    });


    it('deve chamar a função onAddAppointment com o horário ao clicar', () => {
        const mockOnAddAppointment = jest.fn();
        render(<TimeSlotButton time="16:30" onAddAppointment={mockOnAddAppointment} />);

        const addButton = screen.getByText("+ Adicionar agendamento");
        fireEvent.click(addButton);

        expect(mockOnAddAppointment).toHaveBeenCalledTimes(1);
        expect(mockOnAddAppointment).toHaveBeenCalledWith("16:30");
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    })
})