import { render, screen } from "@testing-library/react";
import LandingPage from "../../pages/LandingPage";

jest.mock("../../components/shared/SharedHeader", () => () => (
  <div data-testid="shared-header">HEADER</div>
));
jest.mock("../../components/landing/Hero", () => () => (
  <div data-testid="hero">HERO</div>
));
jest.mock("../../components/landing/About", () => () => (
  <div data-testid="about">ABOUT</div>
));
jest.mock("../../components/landing/Features", () => () => (
  <div data-testid="features">FEATURES</div>
));
jest.mock("../../components/landing/Providers", () => () => (
  <div data-testid="providers">PROVIDERS</div>
));
jest.mock("../../components/shared/Footer", () => () => (
  <div data-testid="footer">FOOTER</div>
));

describe('LandingPage', () => {
    it('renderiza todos os componentes da landing page', () => {
        render(<LandingPage />);

        expect(screen.getByTestId("shared-header")).toBeInTheDocument();
        expect(screen.getByTestId("hero")).toBeInTheDocument();
        expect(screen.getByTestId("about")).toBeInTheDocument();
        expect(screen.getByTestId("features")).toBeInTheDocument();
        expect(screen.getByTestId("providers")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it('renderiza os componentes na ordem correta', () => {
        const { container } = render(<LandingPage />);

        const order = [
            "shared-header",
            "hero",
            "about",
            "features",
            "providers",
            "footer",
        ];

        const renderedOrder = Array.from(container.children).map(
            (child) => child.dataset.testid
        );

        expect(renderedOrder).toEqual(order);
    });

    it('corresponde ao snapshot', () => {
        const { asFragment } = render(<LandingPage />);
        expect(asFragment()).toMatchSnapshot();
    });
});