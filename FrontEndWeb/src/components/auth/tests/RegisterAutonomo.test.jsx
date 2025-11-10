import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterAutonomo from "../RegisterAutonomo";
import { signup } from "../../../services/authService";

jest.mock("../../../services/authService", () => ({
  signup: jest.fn(),
}));

jest.mock("../../common/InputWithIcon", () => (props) => (
  <input
    data-testid={props.name}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
    name={props.name}
  />
));

jest.mock("../../common/ServiceDropdown", () => ({ services, value, onChange }) => (
  <select
    data-testid="service-dropdown"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">Selecione</option>
    {services.map((s) => (
      <option key={s} value={s}>
        {s}
      </option>
    ))}
  </select>
));

jest.mock("../AuthSidebar", () => ({ children }) => <div>{children}</div>);


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));


describe('RegisterAutonomo Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza os campos e o botão corretamente', () => {
        render(
            <MemoryRouter>
                <RegisterAutonomo />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Nome do Profissional")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("CPF")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /criar conta/i })).toBeInTheDocument();
    });


    it('atualiza os campos quando o usuário digita', () => {
        render(
            <MemoryRouter>
                <RegisterAutonomo />
            </MemoryRouter>
        );

        const nameInput = screen.getByPlaceholderText("Nome do Profissional");
        fireEvent.change(nameInput, { target: { value: "Ana" } });
        expect(nameInput.value).toBe("Ana");
    });


    it('envia o formulário com sucesso e navega para /login', async() => {
        signup.mockResolvedValueOnce({});
        render(
            <MemoryRouter>
                <RegisterAutonomo />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "ana@email.com" } });
        fireEvent.change(screen.getByPlaceholderText("Senha"), { target: { value: "123456" } });
        fireEvent.change(screen.getByPlaceholderText("Nome do Profissional"), { target: { value: "Ana" } });
        fireEvent.change(screen.getByPlaceholderText("CPF"), { target: { value: "12345678900" } });
        fireEvent.change(screen.getByTestId("service-dropdown"), { target: { value: "Veterinário Autônomo" } });

        fireEvent.submit(screen.getByRole("button", { name: /criar conta/i }));
        
        await waitFor(() => {
            expect(signup).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });
    });

    it('exibe mensagem de erro quando o signup falha', async () => {
        signup.mockRejectedValueOnce({
            response: { data: { message: "Erro ao criar conta" } },
        });

        render(
            <MemoryRouter>
                <RegisterAutonomo />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "ana@email.com" } });
        fireEvent.change(screen.getByPlaceholderText("Senha"), { target: { value: "123456" } });
        fireEvent.change(screen.getByPlaceholderText("Nome do Profissional"), { target: { value: "Ana" } });
        fireEvent.change(screen.getByPlaceholderText("CPF"), { target: { value: "12345678900" } });
        fireEvent.change(screen.getByTestId("service-dropdown"), { target: { value: "Pet Sistter" } });

        fireEvent.submit(screen.getByRole("button", { name: /criar conta/i }));

        await waitFor(() => {
            expect(screen.getByText("Erro ao criar conta")).toBeInTheDocument();
        });
    });


    it('mostra "CRIANDO CONTA..." enquanto o formulário está enviando', async () => {
        let resolveSignup;
        signup.mockImplementationOnce(
            () => new Promise((resolve) => (resolveSignup = resolve))
        );

        render(
            <MemoryRouter>
                <RegisterAutonomo />
            </MemoryRouter>
        );

        fireEvent.submit(screen.getByRole("button", { name: /criar conta/i }));

        expect(screen.getByText("CRIANDO CONTA...")).toBeInTheDocument();

        resolveSignup();
        await waitFor(() => {
        expect(signup).toHaveBeenCalled();
        });
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});