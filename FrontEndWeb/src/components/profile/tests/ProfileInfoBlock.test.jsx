import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileInfoBlock from "../ProfileInfoBlock";

describe('ProfileInfoBlock Component', () => {
    const defaultProps = {
        title: "Informações do Perfil",
        data: [
            { label: "Nome", value: <span>Anna</span> },
            { label: "Categoria", value: <span>Pet Sitter</span> },
            { label: "Email", value: <span>anna@example.com</span>, fullWidth: true },
        ],
    };

    it('deve renderizar um título', () => {
        render(<ProfileInfoBlock {...defaultProps} />);
        expect(screen.getByText("Informações do Perfil")).toBeInTheDocument();
    });

    it('deve renderizar todos os labels', () => {
        render(<ProfileInfoBlock {...defaultProps} />);
        
        expect(screen.getByText("Nome")).toBeInTheDocument();
        expect(screen.getByText("Categoria")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it('deve renderizar os valores correspondentes', () => {
        render(<ProfileInfoBlock {...defaultProps} />);

        expect(screen.getByText("Anna")).toBeInTheDocument();
        expect(screen.getByText("Pet Sitter")).toBeInTheDocument();
        expect(screen.getByText("anna@example.com")).toBeInTheDocument();
    });

    it('deve renderizar itens fullWidth com a classe correta', () => {
        render(<ProfileInfoBlock {...defaultProps} />);

        const emailValue = screen.getByText("anna@example.com");
        const parent = emailValue.closest("div");

        expect(parent.className).toContain("md:col-span-2");
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});