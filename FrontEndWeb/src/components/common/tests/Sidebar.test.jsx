import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../Sidebar";
import Logo from "../../assets/Logo.png";

jest.mock("../../assets/Logo.png", () => "logo-mock.png");

const mockNavigate = jest.fn();
const mockLocation = { pathname: "/homePage" };

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
  Link: ({ children, to, className }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

describe('Sidebar Component', () => {
    it('renderiza logo e textos principais corretamente', () => {
        render(<Sidebar />);
        const logo = screen.getByAltText(/logo my pet sync/i);
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("src", "logo-mock.png");
        expect(screen.getByText(/MyPetSync/i)).toBeInTheDocument();
        expect(screen.getByText(/Portal Prestador de serviço/i)).toBeInTheDocument();
    });

    it('renderiza os links de navegação', () => {
        render(<Sidebar />);
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Agenda")).toBeInTheDocument();
        expect(screen.getByText("Perfil")).toBeInTheDocument();
    });

    it('aplica classe ativa corretamente para Home', () => {
        render(<Sidebar />);
        const homeLink = screen.getByText("Home").closest("a");
        expect(homeLink).toHaveClass("bg-[#2BB6A8]");
    });

    it('chama navigate ao clicar no botão Sair', () => {
        jest.spyOn(console, "log").mockImplementation(() => {});

        render(<Sidebar />);
        const logoutButton = screen.getByText("Sair").closest("button");
        fireEvent.click(logoutButton);
        
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});