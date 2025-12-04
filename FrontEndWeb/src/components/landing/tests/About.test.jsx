import { render, screen } from "@testing-library/react";
import About from "../About";

describe('About Component', () => {
    it('renderiza o título "Sobre o My Pet Sync"', () => {
        render(<About />);

        expect(
        screen.getByRole("heading", { name: /sobre o my pet sync/i })
        ).toBeInTheDocument();
    });

    it('renderiza o texto descritivo corretamente', () => {
        render(<About />);

        expect(
        screen.getByText(/ajuda tutores a organizarem/i)
        ).toBeInTheDocument();
    });

    it('aplica as classes e estilos principais do container', () => {
        const { container } = render(<About />);
        const root = container.firstChild;

        expect(root).toHaveClass(
            "py-10",
            "px-4",
            "min-h-[600px]",
            "flex",
            "items-center",
            "justify-center"
        );

        expect(root).toHaveStyle({ backgroundColor: "#058789" });
    });


});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});