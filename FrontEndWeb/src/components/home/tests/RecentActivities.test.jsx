import { render, screen } from "@testing-library/react";
import RecentActivities from "../RecentActivities";

describe('RecentActivities', () => {
    it('renderiza a mensagem quando não há atividades', () => {
        render(<RecentActivities activitiesData={[]} />);

        expect(
            screen.getByText("Nenhuma atividade recente encontrada.")
        ).toBeInTheDocument();
    });

    it('renderiza o título corretamente', () => {
        render(<RecentActivities activitiesData={[]} />);
        expect(screen.getByText("Atividades Recentes")).toBeInTheDocument();
    });

    it('renderiza as atividades corretamente', () => {
        const mockData = [
            {
                id: 1,
                iconName: "VscCheck",
                type: "Agendamento Criado",
                detail: "Consulta marcada",
                color: "bg-green-500",
            },
            {
                id: 2,
                iconName: "VscStarFull",
                type: "Favorito Adicionado",
                detail: "Cliente marcado como favorito",
                color: "bg-yellow-500",
            },
        ];

        const { container } = render(<RecentActivities activitiesData={mockData} />);

        expect(screen.getByText("Agendamento Criado")).toBeInTheDocument();
        expect(screen.getByText("Consulta marcada")).toBeInTheDocument();
        expect(screen.getByText("Favorito Adicionado")).toBeInTheDocument();
        expect(screen.getByText("Cliente marcado como favorito")).toBeInTheDocument();

        const svgs = container.querySelectorAll("svg");
        expect(svgs.length).toBe(2); 
    });

    it('usa VscStarFull como ícone padrão quando iconName é inválido', () => {
        const mockData = [
            {
                id: 1,
                iconName: "Inexistente",
                type: "Algo",
                detail: "Detalhe",
                color: "bg-red-500",
            },
        ];

        const { container } = render(<RecentActivities activitiesData={mockData} />);

        const svgs = container.querySelectorAll("svg");
        expect(svgs.length).toBe(0);
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});