import { render, screen } from "@testing-library/react";
import Hero from "../Hero";

jest.mock("../../../assets/dogAndCat.png", () => "dogAndCat.png");

describe('Hero Component', () => {
    it('renderiza o título corretamente', () => {
        render(<Hero />);
        expect(
            screen.getByRole("heading", { name: /bem vindo ao my pet sync/i })
        ).toBeInTheDocument();
    });

    it('renderiza a descrição corretamente', () => {
        render(<Hero />);
        expect(
            screen.getByText(
                /centralize, gerencie e sincronize os cuidados do seu pet em um só lugar\./i
            )
        ).toBeInTheDocument();
    });

    it('renderiza a imagem com alt correto', () => {
        render(<Hero />);
        const img = screen.getByAltText(/cachorro e gato juntos/i);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "dogAndCat.png");
    });

    it('possui um container principal com id "home"', () => {
        const { container } = render(<Hero />);
        expect(container.querySelector("#home")).toBeInTheDocument();
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});