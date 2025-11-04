import { render, screen , within } from "@testing-library/react";
import DailySummary from "../DailySummary";

describe('DailySummary Component', () => {
    it('deve renderizar o título "Resumo do Dia"', () => {
        render(<DailySummary />);
        expect(screen.getByText("Resumo do Dia")).toBeInTheDocument();
    });


    it('deve exibir o total de agendamentos', () => {
        render(<DailySummary />);
        const totalSection = screen.getByText("Total de agendamentos").closest("div");
        expect(totalSection).toBeInTheDocument();
        expect(within(totalSection).getByText("2")).toBeInTheDocument();
    });


    it('deve exibir o total de agendamentos confirmados', () => {
        render(<DailySummary />);
        const confirmedSection = screen.getByText("Confirmados").closest("div");
        expect(confirmedSection).toBeInTheDocument();
        expect(within(confirmedSection).getByText("1")).toBeInTheDocument();
    });


    it('deve exibir o total de agendamentos pendentes', () => {
        render(<DailySummary />);
        const pendingSection = screen.getByText("Pendentes").closest("div");
        expect(pendingSection).toBeInTheDocument();
        expect(within(pendingSection).getByText("1")).toBeInTheDocument();
    });


    it('deve conter os ícones correspondentes de cada seção', () => {
        render(<DailySummary />);
        
        const icons = document.querySelectorAll("svg");
        expect(icons.length).toBe(3);
    });


    it('deve renderiza exatamente 3 cards de resumo', () => {
        render(<DailySummary />);
        const cards = screen.getAllByText(/agendamentos|Confirmados|Pendentes/);
        expect(cards.length).toBe(3);
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    })
})