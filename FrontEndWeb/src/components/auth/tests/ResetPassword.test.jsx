import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";


const mockNavigate = jest.fn();
const mockUseLocation = jest.fn();


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => mockUseLocation(),
}));

jest.mock("../../common/InputWithIcon", () => ({ Icon, name, value, onChange, placeholder, type }) => (
  <input
    data-testid={name}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
  />
));

jest.mock("../AuthSidebar", () => ({ children }) => <div>{children}</div>);

jest.mock("../../../services/authService", () => ({
  resetPassword: jest.fn(),
}));

import ResetPassword from "../ResetPassword";
import { resetPassword } from "../../../services/authService";

describe('ResetPassword Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseLocation.mockReturnValue({
            state: { email: "teste@email.com", code: "123456" },
        });
    });

    const setup = () => 
        render(
            <MemoryRouter>
                <ResetPassword />
            </MemoryRouter>
        );

    it('renderiza corretamente os campos e o botão', () => {
        setup();

        expect(screen.getByText(/Defina sua nova senha/i)).toBeInTheDocument();
        const inputs = screen.getAllByPlaceholderText("123abc@");
        expect(inputs).toHaveLength(2);
        expect(screen.getByRole("button", { name: /DEFINIR SENHA/i })).toBeInTheDocument();
    });


    it('mostra erro se a senha for menor que 6 caracteres', async () => {
        setup();

        const passwordInput = screen.getAllByPlaceholderText("123abc@")[0];
        const confirmInput = screen.getAllByPlaceholderText("123abc@")[1];
        const button = screen.getByRole("button", { name: /DEFINIR SENHA/i });

        fireEvent.change(passwordInput, { target: { value: "123" } });
        fireEvent.change(confirmInput, { target: { value: "123" } });
        fireEvent.click(button);

        expect(
            await screen.findByText(/A senha deve ter no mínimo 6 caracteres/i)
        ).toBeInTheDocument();
    });


    it('mostra erro se as senhas não coincidirem', async () => {
        setup();

        const passwordInput = screen.getAllByPlaceholderText("123abc@")[0];
        const confirmInput = screen.getAllByPlaceholderText("123abc@")[1];
        const button = screen.getByRole("button", { name: /DEFINIR SENHA/i });

        fireEvent.change(passwordInput, { target: { value: "123456" } });
        fireEvent.change(confirmInput, { target: { value: "654321" } });
        fireEvent.click(button);

        expect(await screen.findByText(/As senhas não coincidem/i)).toBeInTheDocument();
    });


    it('mostra erro se não houver email ou código', async () => {
        mockUseLocation.mockReturnValue({ state: {} });
        
        render(
            <MemoryRouter>
                <ResetPassword />
            </MemoryRouter>
        );

        const passwordInput = screen.getAllByPlaceholderText("123abc@")[0];
        const confirmInput = screen.getAllByPlaceholderText("123abc@")[1];
        const button = screen.getByRole("button", { name: /DEFINIR SENHA/i });

        fireEvent.change(passwordInput, { target: { value: "123456" } });
        fireEvent.change(confirmInput, { target: { value: "123456" } });

        fireEvent.click(button);

        const errorMessage = await screen.findByText(/Informações de redefinição incompletas/i);
        expect(errorMessage).toBeInTheDocument();
    });
    
    it('mostra mensagem de sucesso e redireciona após redefinir senha', async () => {
        resetPassword.mockResolvedValueOnce({});
        setup();

        const passwordInput = screen.getAllByPlaceholderText("123abc@")[0];
        const confirmInput = screen.getAllByPlaceholderText("123abc@")[1];
        const button = screen.getByRole("button", { name: /DEFINIR SENHA/i });

        fireEvent.change(passwordInput, { target: { value: "123456" } });
        fireEvent.change(confirmInput, { target: { value: "123456" } });
        fireEvent.click(button);

        expect(await screen.findByText(/Senha redefinida com sucesso/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        }, { timeout: 3000 }); 
    });


    it('mostra erro se a redefinição falhar', async () => {
        resetPassword.mockRejectedValueOnce(new Error("Erro ao redefinir senha"));
        setup();

        const passwordInput = screen.getAllByPlaceholderText("123abc@")[0];
        const confirmInput = screen.getAllByPlaceholderText("123abc@")[1];
        const button = screen.getByRole("button", { name: /DEFINIR SENHA/i });

        fireEvent.change(passwordInput, { target: { value: "123456" } });
        fireEvent.change(confirmInput, { target: { value: "123456" } });
        fireEvent.click(button);

        expect(await screen.findByText(/Erro ao redefinir senha/i)).toBeInTheDocument();
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});