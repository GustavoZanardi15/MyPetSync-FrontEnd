import { render, screen } from "@testing-library/react";
import Features from "../Features";

jest.mock("../../assets/cadastroPet.png", () => "cadastroPet.png");
jest.mock("../../assets/agendaCompromisso.png", () => "agendaCompromisso.png");
jest.mock("../../assets/servicos.png", () => "servicos.png");
jest.mock("../../assets/dashboardInterativo.png", () => "dashboardInterativo.png");
jest.mock("../../assets/gestaoCuidadosMedicamentos.png", () => "gestaoCuidadosMedicamentos.png");

jest.mock("../../assets/gerenciamentoPerfil.png", () => "gerenciamentoPerfil.png");
jest.mock("../../assets/avaliacaoCliente.png", () => "avaliacaoCliente.png");
jest.mock("../../assets/agendaExclusiva.png", () => "agendaExclusiva.png");

describe('Features Component', () => {
    it('renderiza o título "Aplicativo"', () => {
        render(<Features />);
        expect(
            screen.getByRole("heading", { name: /aplicativo/i })
        ).toBeInTheDocument();
    });

    it('renderiza todos os cards de AppFeatures', () => {
        render(<Features />);

        const appItems = [
            "Cadastro de Pets",
            "Agenda de Compromisso",
            "Serviços",
            "Dashboard Interativo",
            "Gestão de cuidados e medicamentos",
        ];

        appItems.forEach((title) => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    it('renderiza as descrições dos AppFeatures', () => {
        render(<Features />);

        expect(
            screen.getByText(/informações detalhadas sobre seu pet/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/agenda inteligente/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/serviços oferecidos por profissionais/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/bem-estar do seu pet/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/organize os registros médicos/i)
        ).toBeInTheDocument();
    });

    it('renderiza o título "Portal Web"', () => {
        render(<Features />);
        expect(
            screen.getByRole("heading", { name: /portal web/i })
        ).toBeInTheDocument();
    });

    it('renderiza todos os cards de PortalFeatures', () => {
        render(<Features />);

        const portalItems = [
            "Gerenciamento do Perfil",
            "Avaliação de Clientes",
            "Agenda Exclusiva",
        ];

        portalItems.forEach((title) => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    it('renderiza as descrições dos PortalFeatures', () => {
        render(<Features />);

        expect(
            screen.getByText(/crie e gerencie o perfil da empresa/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/os clientes podem avaliar/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                /Acompanhe e gerencie agendamentos em uma agenda exclusiva, podendo aceitar, recusar ou reagendar serviços\./i
            )
        ).toBeInTheDocument();
    });

    it('renderiza todas as imagens dos cards', () => {
        render(<Features />);

        const images = screen.getAllByRole("img");
        expect(images.length).toBeGreaterThanOrEqual(8);

        images.forEach((img) => {
            expect(img).toHaveAttribute("src");
            expect(img).toHaveAttribute("alt");
        });
    });

    it('aplica classes principais no container root', () => {
        const { container } = render(<Features />);
        const root = container.firstChild;

        expect(root).toHaveClass("bg-[#A8E6CF]", "py-20", "px-4");
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});