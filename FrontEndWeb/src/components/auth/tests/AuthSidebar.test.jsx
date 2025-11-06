import { render, screen } from "@testing-library/react";
import AuthSidebar from "../AuthSidebar";

jest.mock("../../../assets/Logo.png", () => "logo-mock.png");

describe('AuthSidebar Component', () => {
    it('renderiza os textos principais corretamente', () => {
        render(<AuthSidebar />);

        expect(screen.getByText(/Portal/i)).toBeInTheDocument();
        expect(screen.getByText(/Prestador de Serviço/i)).toBeInTheDocument();
    });


    it('renderiza o logo com o alt correto', () => {
        render(<AuthSidebar />);
        const logo = screen.getByAltText(/logo/i);
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("src", "logo-mock.png");
    });


    it('renderiza o conteúdo filho dentro da área de formulário', () => {
        render(
        <AuthSidebar>
            <div data-testid="child-element">Conteúdo filho</div>
        </AuthSidebar>
        );

        expect(screen.getByTestId("child-element")).toBeInTheDocument();
        expect(screen.getByText("Conteúdo filho")).toBeInTheDocument();
    });


    it('aplica a cor de fundo correta (#058789)', () => {
        const { container } = render(<AuthSidebar />);
        const sidebar = container.firstChild;
        expect(sidebar).toHaveStyle({ backgroundColor: "#058789" });
    });


    it('usa a classe de largura padrão quando nenhuma é passada', () => {
        const { container } = render(<AuthSidebar />);
        expect(container.firstChild).toHaveClass("md:w-2/5");
    });


    it('permite sobrescrever a classe de largura via prop', () => {
        const { container } = render(<AuthSidebar widthClass="lg:w-1/2" />);
        expect(container.firstChild).toHaveClass("lg:w-1/2");
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});