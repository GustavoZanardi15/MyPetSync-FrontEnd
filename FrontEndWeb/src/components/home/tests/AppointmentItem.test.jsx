import { render, screen } from "@testing-library/react";
import AppointmentItem from "../AppointmentItem";

describe('AppointmentItem', () => {
    const defaultProps = {
        petName: "Rex",
        tutorName: "Anna",
        date: "10/12/2025",
        time: "14:00",
        phone: "(11) 99999-9999",
        status: "Confirmado",
    };

    it('renderiza corretamente todos os textos', () => {
        render(<AppointmentItem {...defaultProps} />);

        expect(screen.getByText("Rex")).toBeInTheDocument();
        expect(screen.getByText("Anna")).toBeInTheDocument();
        expect(screen.getByText("10/12/2025 às 14:00")).toBeInTheDocument();
        expect(screen.getByText("(11) 99999-9999")).toBeInTheDocument();
        expect(screen.getByText("Confirmado")).toBeInTheDocument();
    })

    it('aplica classe correta quando status é "Confirmado"', () => {
        render(<AppointmentItem {...defaultProps} />);

        const statusBadge = screen.getByText("Confirmado");

        expect(statusBadge.className).toMatch(/bg-teal-700/);
    });

    it('aplica classe correta quando status é "Agendado"', () => {
        render(<AppointmentItem {...defaultProps} status="Agendado" />);

        const statusBadge = screen.getByText("Agendado");

        expect(statusBadge.className).toMatch(/bg-gray-400/);
    });

    it('aplica classe correta quando status é "Pendente"', () => {
        render(<AppointmentItem {...defaultProps} status="Pendente" />);

        const statusBadge = screen.getByText("Pendente");

        expect(statusBadge.className).toMatch(/bg-yellow-600/);
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});