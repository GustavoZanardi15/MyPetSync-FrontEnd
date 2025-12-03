import { render, screen } from "@testing-library/react";
import Providers from "../Providers";

describe('Providers Component', () => {
    it('deve renderizar título e subtítulo', () => {
        render(<Providers />);

        expect(
            screen.getByRole("heading", { name: /Prestadores de Serviço/i })
        ).toBeInTheDocument();

        expect(
            screen.getByText(/conecta empresas e profissionais autônomos/i)
        ).toBeInTheDocument();
    });

    it('deve renderizar os 4 cards com textos corretos', () => {
        render(<Providers />);

        const textos = [
            "Exiba seus serviços, preços e avaliações de clientes.",
            "Gerencie sua própria agenda de forma prática e organizada.",
            "Aumente a visibilidade do seu negócio no catálogo de prestadores.",
            "Receba contatos diretos dos tutores pelo WhatsApp.",
        ];

        textos.forEach((texto) => {
            expect(screen.getByText(texto)).toBeInTheDocument();
        });
    });

    it('deve renderizar 4 imagens de check', () => {
        render(<Providers />);

        const imagens = screen.getAllByAltText("iconCheck");

        expect(imagens).toHaveLength(4);
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});