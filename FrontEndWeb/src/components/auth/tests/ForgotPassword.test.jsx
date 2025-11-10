import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPassword from "../ForgotPassword";
import { MemoryRouter } from "react-router-dom";
import { requestPasswordReset } from "../../../services/authService";

jest.mock("../../../services/authService", () => ({
  requestPasswordReset: jest.fn(),
}));
jest.mock("../../../assets/dogAndCat.png", () => "dog-cat-mock.png");
jest.mock("../AuthSidebar", () => ({ children }) => (
  <div data-testid="auth-sidebar">{children}</div>
));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('ForgotPassword Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza corretamente os textos iniciais e botão', () => {
        render(
        <MemoryRouter>
            <ForgotPassword />
        </MemoryRouter>
        );

        expect(screen.getByText(/Esqueceu sua senha/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Insira seu e-mail abaixo para recuperar sua senha/i)
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /ENVIAR/i })).toBeInTheDocument();
    });


    it('renderiza o campo de e-mail e permite digitar', () => {
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText(/email/i);
        fireEvent.change(input, { target: { value: "teste@email.com" } });
        expect(input.value).toBe("teste@email.com");
    });


    it('exibe mensagem de sucesso e redireciona após envio bem-sucedido', async () => {
        requestPasswordReset.mockResolvedValueOnce({});
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText(/email/i);
        fireEvent.change(input, { target: { value: "teste@email.com" } });
        fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

        await waitFor(() =>
            expect(
                screen.getByText(/Um link de recuperação de senha foi enviado/i)
            ).toBeInTheDocument()
        );

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith("/verify-code", {
                state: { email: "teste@email.com" },
            })
        );
    });


    it('exibe mensagem de erro quando o envio falha', async () => {
        requestPasswordReset.mockRejectedValueOnce(
            new Error("Erro ao enviar e-mail")
        );
        render(
        <MemoryRouter>
            <ForgotPassword />
        </MemoryRouter>
        );

        const input = screen.getByPlaceholderText(/email/i);
        fireEvent.change(input, { target: { value: "teste@email.com" } });
        fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

        await waitFor(() =>
            expect(screen.getByText(/Erro ao enviar e-mail/i)).toBeInTheDocument()
        );
    });


    it('mostra "ENVIANDO..." enquanto o request está em andamento', async () => {
        let resolveFn;
        const promise = new Promise((resolve) => (resolveFn = resolve));
        requestPasswordReset.mockReturnValueOnce(promise);

        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        const button = screen.getByRole("button", { name: /enviar/i });
        fireEvent.click(button);

    
        expect(screen.getByRole("button", { name: /ENVIANDO/i })).toBeInTheDocument();

        resolveFn();
        await waitFor(() =>
            expect(screen.getByRole("button", { name: /ENVIAR/i })).toBeInTheDocument()
        );
    }); 


    it('renderiza o link para voltar ao login', () => {
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        const link = screen.getByText(/Volte para o Login/i);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/login");
    });


    it('renderiza a imagem corretamente', () => {
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        const image = screen.getByAltText(/Cachorro e Gato/i);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "dog-cat-mock.png");
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});