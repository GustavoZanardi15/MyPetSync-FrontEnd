import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ProfilePage from "../ProfilePage";
import { MemoryRouter } from "react-router-dom";

import { fetchProviderProfile } from "../../services/providerService";
import { fetchDashboardStats } from "../../services/dashboardService";

jest.mock("../../services/providerService", () => ({
  fetchProviderProfile: jest.fn(),
}));

jest.mock("../../services/dashboardService", () => ({
  fetchDashboardStats: jest.fn(),
}));

jest.mock("../../components/profile/ProfileCard", () => () => (
  <div data-testid="profile-card">MOCK PROFILE</div>
));

jest.mock("../../components/profile/ProfileInfoBlock", () => (props) => (
  <div data-testid={`info-block-${props.title}`}>MOCK BLOCK</div>
));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderPage = () =>
  render(
    <MemoryRouter>
      <ProfilePage />
    </MemoryRouter>
  );

describe('ProfilePage', () => {
  it('exibe mensagem de carregamento inicialmente', async () => {
    fetchProviderProfile.mockResolvedValue({});
    fetchDashboardStats.mockResolvedValue({});

    renderPage();

    await waitFor(() =>
      expect(screen.getByText(/carregando perfil/i)).toBeInTheDocument()
    );
  });

  it('carrega e exibe dados corretamente', async () => {
    fetchProviderProfile.mockResolvedValue({
      profile: { name: "Petshop ABC", type: "COMPANY" },
    });

    fetchDashboardStats.mockResolvedValue({
      stats: { reviews: { average: 4.8, count: 10 }, clients: 50 },
    });

    renderPage();

    await waitFor(() =>
      expect(screen.getByTestId("profile-card")).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        screen.getByTestId("info-block-Informações Básicas")
      ).toBeInTheDocument()
    );
  });

  it('navega para /edit-profile ao clicar no botão', async () => {
    fetchProviderProfile.mockResolvedValue({ profile: {} });
    fetchDashboardStats.mockResolvedValue({ stats: {} });

    renderPage();

    await waitFor(() =>
      expect(screen.getByTestId("profile-card")).toBeInTheDocument()
    );

    const btn = screen.getByRole("button", { name: /editar perfil/i });

    fireEvent.click(btn);

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/edit-profile")
    );
  });
});
