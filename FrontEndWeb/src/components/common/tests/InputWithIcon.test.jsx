import { render, screen, fireEvent } from "@testing-library/react";
import InputWithIcon from "../InputWithIcon";

const MockIcon = () => <svg data-testid="mock-icon" />;

describe('InputWithIcon Component', () => {
    it('renderiza o input com placeholder', () => {
        render(<InputWithIcon placeholder="Digite algo" />);
        expect(screen.getByPlaceholderText("Digite algo")).toBeInTheDocument();
    });

    it('renderiza o ícone quando passado via prop', () => {
        render(<InputWithIcon icon={MockIcon} />);
        expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    });

    it('chama onChange ao digitar no input', () => {
        const handleChange = jest.fn();
        render(<InputWithIcon onChange={handleChange} />);
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "Test" } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('chama onBlur ao desfocar o input', () => {
        const handleBlur = jest.fn();
        render(<InputWithIcon onBlur={handleBlur} />);
        const input = screen.getByRole("textbox");
        fireEvent.blur(input);
        expect(handleBlur).toHaveBeenCalled();
    });

    it('exibe mensagem de erro quando prop error é passada', () => {
        render(<InputWithIcon error="Campo obrigatório" />);
        expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
    });
});


describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});