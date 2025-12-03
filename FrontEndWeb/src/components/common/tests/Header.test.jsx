import { render, screen } from "@testing-library/react";
import Header from "../Header";

jest.mock("../../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from "../../../context/AuthContext";

describe('Header Component', () => {
    it('renderiza "Carregando..." e email padrão quando user é null', () => {
        useAuth.mockReturnValue({ user: null });

        render(<Header />);

        expect(screen.getByText("Carregando...")).toBeInTheDocument();
        expect(screen.getByText("usuario@dominio.com")).toBeInTheDocument();
        expect(screen.getByText("C")).toBeInTheDocument();
    });

    it('renderiza nome e email corretos quando user está definido', () => {
        useAuth.mockReturnValue({
            user: { name: "Anna Julia", email: "anna@email.com", profilePictureUrl: null },
        });

        render(<Header />);

        expect(screen.getByText("Anna Julia")).toBeInTheDocument();
        expect(screen.getByText("anna@email.com")).toBeInTheDocument();
        expect(screen.getByText("A")).toBeInTheDocument();
    });

    it('renderiza a imagem do avatar quando profilePictureUrl é fornecida', () => {
        useAuth.mockReturnValue({
            user: { name: "Anna Julia", email: "anna@email.com", profilePictureUrl: "https://example.com/avatar.png" },
        });

        render(<Header />);
        const avatarImg = screen.getByAltText("Avatar");

        expect(avatarImg).toBeInTheDocument();
        expect(avatarImg).toHaveAttribute("src", "https://example.com/avatar.png");
    });

    it('aplica a classe de estilo do header corretamente', () => {
        useAuth.mockReturnValue({ user: null });
        const { container } = render(<Header />);
        const header = container.firstChild;

        expect(header).toHaveClass("flex", "justify-end", "items-center", "h-20", "px-6", "pb-4", "pt-4", "bg-[#058789]", "w-full", "sticky", "top-0", "z-10", "text-white");
    });
});

