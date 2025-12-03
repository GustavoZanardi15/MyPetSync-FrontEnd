import { render, screen, fireEvent } from "@testing-library/react";
import ServiceDropdown from "../ServiceDropdown";

describe('ServiceDropdown Component', () => {
    const servicesMock = ["Banho", "Tosa", "Consulta"];

    it('renderiza botão com placeholder quando nenhum valor é selecionado', () => {
        render(<ServiceDropdown services={servicesMock} />);
        expect(screen.getByRole("button")).toHaveTextContent("Selecione o Tipo de Serviço");
    });

    it('renderiza botão com valor selecionado quando prop value é passada', () => {
        render(<ServiceDropdown services={servicesMock} value="Banho" />);
        expect(screen.getByRole("button")).toHaveTextContent("Banho");
    });

    it('abre e fecha o dropdown ao clicar no botão', () => {
        render(<ServiceDropdown services={servicesMock} />);
        const button = screen.getByRole("button");

        expect(screen.queryByText("Banho")).not.toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.getByText("Banho")).toBeInTheDocument();
        expect(screen.getByText("Tosa")).toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.queryByText("Banho")).not.toBeInTheDocument();
    });

    it('chama onChange ao selecionar um serviço e fecha o dropdown', () => {
        const handleChange = jest.fn();
        render(<ServiceDropdown services={servicesMock} onChange={handleChange} />);
        const button = screen.getByRole("button");

        fireEvent.click(button);
        const item = screen.getByText("Tosa");

        fireEvent.click(item);
        expect(handleChange).toHaveBeenCalledWith("Tosa");

        expect(screen.queryByText("Tosa")).not.toBeInTheDocument();
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});