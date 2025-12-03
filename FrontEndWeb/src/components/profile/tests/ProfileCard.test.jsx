import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileCard from "../ProfileCard";

describe('ProfileCard Component', () => {
    const defaultProps = {
        name: "Anna",
        category: "Pet Sitter",
        imageUrl: "https://example.com/image.jpg",
        clientCount: 10,
        rating: 4.25,
        reviewCount: 5,
    };

    it('deve renderizar corretamente com os dados', () => {
        render(<ProfileCard {...defaultProps} />);

        expect(screen.getByText("Anna")).toBeInTheDocument();
        expect(screen.getByText("Pet Sitter")).toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
        expect(screen.getByText("4.3")).toBeInTheDocument(); 
        expect(screen.getByText("5")).toBeInTheDocument();
    });

    it('deve renderizar a imagem quando a URL é válida', () => {
        render(<ProfileCard {...defaultProps} />);

        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", defaultProps.imageUrl);
        expect(img).toHaveAttribute("alt", `Logo de ${defaultProps.name}`);
    });

    it('deve renderizar a letra inicial quando a imagem é inválida', () => {
        render(
            <ProfileCard
                {...defaultProps}
                imageUrl="https://placehold.co/128x128/FFBD70/ffffff?text=PET"
            />
        );

        expect(screen.getByText("A")).toBeInTheDocument();
    });

    it('deve renderizar a letra P quando não há nome', () => {
        render(
            <ProfileCard
                {...defaultProps}
                name={undefined}
                imageUrl="https://placehold.co/128x128/FFBD70/ffffff?text=PET"
            />
        );

        expect(screen.getByText("P")).toBeInTheDocument();
    });

    it('deve renderizar children', () => {
        render(
            <ProfileCard {...defaultProps}>
                <div data-testid="child">Conteúdo filho</div>
            </ProfileCard>
        );

        expect(screen.getByTestId("child")).toBeInTheDocument();
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});