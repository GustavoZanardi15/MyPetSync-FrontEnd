import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import QuickActions from "../QuickActions";

describe('QuickActions', () => {
    const renderComponent = () =>
        render(
            <MemoryRouter>
                <QuickActions />
            </MemoryRouter>
        );

    it('renderiza o título corretamente', () => {
        renderComponent();
        expect(screen.getByText("Ações Rápidas")).toBeInTheDocument();
    });

    it('renderiza o botão "Novo Agendamento" com o link correto', () => {
        renderComponent();

        const newScheduleLink = screen.getByText("Novo Agendamento").closest("a");
        expect(newScheduleLink).toBeInTheDocument();
        expect(newScheduleLink).toHaveAttribute("href", "/agenda?new=true");
    });

    it('renderiza o botão "Ver Agenda Completa" com o link correto', () => {
        renderComponent();

        const fullAgendaLink = screen.getByText("Ver Agenda Completa").closest("a");
        expect(fullAgendaLink).toBeInTheDocument();
        expect(fullAgendaLink).toHaveAttribute("href", "/agenda");
    });

    it('renderiza os ícones corretamente', () => {
        renderComponent();

        const svgs = document.querySelectorAll("svg");
        expect(svgs.length).toBe(2);
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});