import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterCompany from "../RegisterCompany";
import { signup } from "../../../services/authService";

jest.mock("../../../services/authService", () => ({
  signup: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../../components/common/InputWithIcon", () => (props) => {
  const { placeholder, name, value, onChange } = props;
  return (
    <input
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      data-testid={name}
    />
  );
});

jest.mock("../../../components/common/ServiceDropdown", () => (props) => {
  const { services, value, onChange } = props;
  return (
    <select
      data-testid="service"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Selecione...</option>
      {services.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
});

jest.mock("../AuthSidebar", () => ({ children }) => <div>{children}</div>);


describe('RegisterCompany Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza corretamente os campos e botão', () => {
        render(
            <MemoryRouter>
                <RegisterCompany />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Nome da Empresa")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("CNPJ")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /criar conta/i })).toBeInTheDocument();
    });


    it('preenche e envia o formulário com sucesso', async () => {
        signup.mockResolvedValueOnce({});
        render(
            <MemoryRouter>
                <RegisterCompany />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Email"), {
            target: { value: "empresa@teste.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Senha"), {
            target: { value: "123456" },
        });
        fireEvent.change(screen.getByPlaceholderText("Nome da Empresa"), {
            target: { value: "Pet Feliz" },
        });
        fireEvent.change(screen.getByPlaceholderText("CNPJ"), {
            target: { value: "12345678000100" },
        });
        fireEvent.change(screen.getByTestId("service"), {
            target: { value: "Pet Shop" },
        });

        fireEvent.click(screen.getByRole("button", { name: /criar conta/i }));

        await waitFor(() => {
            expect(signup).toHaveBeenCalledWith(
                expect.objectContaining({
                    nome: "Pet Feliz",
                    email: "empresa@teste.com",
                    senha: "123456",
                    cnpj: "12345678000100",
                    service: "Pet Shop",
                    tipo_usuario: "provider",
                    type: "empresa"
                })
            );
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });
    });


    it('exibe mensagem de erro quando signup falha', async () => {
        signup.mockRejectedValueOnce(new Error("Erro ao criar conta"));
        render(
            <MemoryRouter>
                <RegisterCompany />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Email"), {
            target: { value: "empresa@teste.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Senha"), {
            target: { value: "123456" },
        });
        fireEvent.change(screen.getByPlaceholderText("Nome da Empresa"), {
            target: { value: "Pet Feliz" },
        });
        fireEvent.change(screen.getByPlaceholderText("CNPJ"), {
            target: { value: "12345678000100" },
        });

        fireEvent.click(screen.getByRole("button", { name: /criar conta/i }));


        await waitFor(() => {
            expect(screen.getByText("Erro ao criar conta")).toBeInTheDocument();
        });
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});