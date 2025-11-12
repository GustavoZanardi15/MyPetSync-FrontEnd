import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VerifyCode from "../VerifyCode";

jest.mock("../AuthSidebar", () => ({ children }) => <div>{children}</div>);
jest.mock("../../common/InputWithIcon", () => ({ value, onChange, ...props }) => (
  <input
    data-testid="input-code"
    value={value}
    onChange={onChange}
  />
));
jest.mock("../../../services/authService", () => ({
  verifyResetCode: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: { email: "teste@exemplo.com" } }),
}));


describe('VerifyCode Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza o título e o email corretamente', () => {
        render(
            <MemoryRouter>
                <VerifyCode />
            </MemoryRouter>
        );

        expect(screen.getByText("Verificar Código")).toBeInTheDocument();
        expect(screen.getByText(/teste@exemplo\.com/)).toBeInTheDocument();
    });


    it('atualiza o estado ao digitar o código', () => {
        render(
            <MemoryRouter>
                <VerifyCode />
            </MemoryRouter>
        );

        const input = screen.getByTestId("input-code");
        fireEvent.change(input, { target: { value: "123456" } });

        expect(input.value).toBe("123456");
    });


    it('chama verifyResetCode com código e email ao enviar o formulário (sucesso)', async () => {
        const { verifyResetCode } = require("../../../services/authService");
        verifyResetCode.mockResolvedValueOnce({});

        render(
            <MemoryRouter>
                <VerifyCode />
            </MemoryRouter>
        );

        const input = screen.getByTestId("input-code");
        fireEvent.change(input, { target: { value: "123456" } });

        const button = screen.getByRole("button", { name: /verificar/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(verifyResetCode).toHaveBeenCalledWith("123456", "teste@exemplo.com");
        });
    });


    it('exibe mensagem de erro se verifyResetCode falhar', async () => {
        const { verifyResetCode } = require("../../../services/authService");
        verifyResetCode.mockRejectedValueOnce(new Error("Código inválido"));

        render(
            <MemoryRouter>
                <VerifyCode />
            </MemoryRouter>
        );

        const input = screen.getByTestId("input-code");
        fireEvent.change(input, { target: { value: "000000" } });

        const button = screen.getByRole("button", { name: /verificar/i });
        fireEvent.click(button);

        expect(await screen.findByText(/Código inválido/i)).toBeInTheDocument();
    });


    it('navega para /reset-password após sucesso', async () => {
        const { verifyResetCode } = require("../../../services/authService");
        verifyResetCode.mockResolvedValueOnce({});

        jest.useFakeTimers();

        render(
            <MemoryRouter>
                <VerifyCode />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId("input-code"), {
            target: { value: "123456" },
        });
        fireEvent.click(screen.getByRole("button", { name: /verificar/i }));

        await waitFor(() =>
            expect(screen.getByText(/Código verificado!/i)).toBeInTheDocument()
        );

        jest.runAllTimers();

        jest.runAllTimers();

        expect(mockNavigate).toHaveBeenCalledWith("/reset-password", {
            state: { email: "teste@exemplo.com", code: "123456" },
        });

        jest.useRealTimers();
    });


    it('desabilita o botão enquanto está carregando', async () => {
        const { verifyResetCode } = require("../../../services/authService");
        verifyResetCode.mockImplementation(
            () => new Promise((resolve) => setTimeout(resolve, 100))
        );

        render(
            <MemoryRouter>
                <VerifyCode />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId("input-code"), {
            target: { value: "123456" },
        });
        fireEvent.click(screen.getByRole("button", { name: /verificar/i }));

        expect(screen.getByRole("button", { name: /verificando/i })).toBeDisabled();
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});