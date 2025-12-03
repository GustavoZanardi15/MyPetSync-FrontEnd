import { render, screen } from "@testing-library/react";
import DashboardStats from "../DashboardStats";
import { FaDog } from "react-icons/fa";

describe('DashboardStats', () => {
    it('não renderiza nada quando stats está vazio', () => {
        const { container } = render(<DashboardStats stats={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it('renderiza corretamente os cards quando stats é válido', () => {
        const mockStats = [
            {
                id: 1,
                title: "Total Pets",
                value: 32,
                subText: "+5 este mês",
                icon: FaDog,
                iconColor: "text-teal-600",
            },
            {
                id: 2,
                title: "Consultas",
                value: 12,
                subText: "Hoje",
                icon: FaDog,
                iconColor: "text-yellow-600",
            },
        ];

        render(<DashboardStats stats={mockStats} />);

        expect(screen.getAllByText(/Pets|Consultas/i).length).toBe(2);

        expect(screen.getByText("32")).toBeInTheDocument();
        expect(screen.getByText("12")).toBeInTheDocument();

        expect(screen.getByText("+5 este mês")).toBeInTheDocument();
        expect(screen.getByText("Hoje")).toBeInTheDocument();
    });

    it('renderiza ícone quando passado', () => {
        const mockStats = [
            {
                id: 1,
                title: "Test",
                value: 1,
                subText: "ok",
                icon: FaDog,
                iconColor: "text-teal-600",
            },
        ];

        render(<DashboardStats stats={mockStats} />);

        const svgIcon = document.querySelector("svg");
        expect(svgIcon).toBeInTheDocument();
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});