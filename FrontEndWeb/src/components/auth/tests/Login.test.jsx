import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";
import { login } from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";

jest.mock("../../../services/authService", () => ({
  login: jest.fn(),
}));

jest.mock("../../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
    const mockLoginContext = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useAuth.mockReturnValue({ loginContext: mockLoginContext });
    });

    it('renderiza corretamente os textos e campos iniciais', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByText("Entre na sua conta")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
        expect(screen.getByText("Esqueceu sua senha?")).toBeInTheDocument();
    });


    it('permite digitar nos campos de email e senha', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText("Email");
        const senhaInput = screen.getByPlaceholderText("Senha");

        fireEvent.change(emailInput, { target: { value: "teste@email.com" } });
        fireEvent.change(senhaInput, { target: { value: "123456" } });

        expect(emailInput.value).toBe("teste@email.com");
        expect(senhaInput.value).toBe("123456");
    });


    it('exibe mensagem de erro quando o login falha', async () => {
        login.mockRejectedValueOnce(new Error("Credenciais inválidas"));

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText("Email");
        const senhaInput = screen.getByPlaceholderText("Senha");
        const botao = screen.getByRole("button", { name: /entrar/i });

        fireEvent.change(emailInput, { target: { value: "erro@email.com" } });
        fireEvent.change(senhaInput, { target: { value: "senhaerrada" } });

        await act(async () => {
            fireEvent.click(botao);
        });

        await waitFor(() => {
            expect(screen.getByText("Credenciais inválidas")).toBeInTheDocument();
        });

        expect(login).toHaveBeenCalledWith("erro@email.com", "senhaerrada");
        expect(mockNavigate).not.toHaveBeenCalled();
    });


    it('chama loginContext e redireciona ao fazer login com sucesso', async () => {
        login.mockResolvedValueOnce(
            () => new Promise ((resolve) => setTimeout(() => resolve({ token: "fake-token" }), 5))
        );

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText("Email");
        const senhaInput = screen.getByPlaceholderText("Senha");
        const botao = screen.getByRole("button", { name: /entrar/i });

        fireEvent.change(emailInput, { target: { value: "user@email.com" } });
        fireEvent.change(senhaInput, { target: { value: "senha123" } });

        await act(async () => {
            fireEvent.click(botao);
        });

        await waitFor(() => {
            expect(login).toHaveBeenCalledWith("user@email.com", "senha123");
            expect(mockLoginContext).toHaveBeenCalled();
            expect(mockNavigate).toHaveBeenCalledWith("/homePage", { replace: true });
        });
    });


    it('mostra o texto "ENTRANDO..." enquanto o login está em andamento', async () => {
        let resolveLogin;
        const mockPromise = new Promise((resolve) => (resolveLogin = resolve));
        login.mockReturnValueOnce(mockPromise);

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const botao = screen.getByRole("button", { name: /entrar/i });

        await act(async () => {
            fireEvent.click(botao);
        });

        await waitFor(() => {
            const botaoEntrando = screen.getByRole("button", { name: /entrando.../i });
            expect(botaoEntrando).toBeDisabled();
        });

        await act(async () => {
            resolveLogin();
        });

        await waitFor(() => {
            const botaoFinal = screen.getByRole("button", { name: /entrar/i });
            expect(botaoFinal).not.toBeDisabled();
        });
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});