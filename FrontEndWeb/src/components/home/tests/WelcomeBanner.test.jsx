import { render } from "@testing-library/react";
import WelcomeBanner from "../WelcomeBanner";

describe('WelcomeBanner', () => {
    it('renderiza o ícone BsClipboard2DataFill', () => {
        const { container } = render(<WelcomeBanner />);

        const svg = container.querySelector("svg");

        expect(svg).toBeInTheDocument();

        expect(svg.getAttribute("class")).toContain("w-8");
        expect(svg.getAttribute("class")).toContain("h-8");
        expect(svg.getAttribute("class")).toContain("text-green-600");
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});