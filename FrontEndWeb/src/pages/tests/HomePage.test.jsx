import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../../pages/HomePage";
import { useAuth } from "../../context/AuthContext";
import * as providerService from "../../services/providerService";
import {
  fetchDashboardStats,
  fetchRecentActivities,
} from "../../services/dashboardService";

jest.mock("../../context/AuthContext");
jest.mock("../../services/providerService");
jest.mock("../../services/dashboardService");


jest.mock("../../components/home/WelcomeBanner", () => () => (
  <div data-testid="welcome-banner" />
));

jest.mock("../../components/home/DashboardStats", () => ({ stats }) => (
  <div data-testid="dashboard-stats">{JSON.stringify(stats)}</div>
));

jest.mock("../../components/home/NextAppointments", () => () => (
  <div data-testid="next-appointments" />
));

jest.mock("../../components/home/HomeSidePanel", () => ({ activities }) => (
  <div data-testid="side-panel">{JSON.stringify(activities)}</div>
));

jest.spyOn(console, "error").mockImplementation((msg) => {
  if (
    msg.includes("act(") ||
    msg.includes("An update to") ||
    msg.includes("Warning:")
  ) {
    return;
  }
});

describe('HomePage', () => {
  const setupAuth = (props = {}) => {
    useAuth.mockReturnValue({
      isLoggedIn: true,
      user: { userId: "user123" },
      refreshKey: 0,
      ...props,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupAuth();

    providerService.fetchProviderProfile.mockResolvedValue({
      id: "prov123",
    });

    fetchDashboardStats.mockResolvedValue({
      appointments: { total: 10, confirmed: 5 },
      reviews: { average: 4.8, count: 20 },
      clients: 50,
    });

    fetchRecentActivities.mockResolvedValue([
      { id: 1, message: "Novo agendamento" },
    ]);
  });

  const renderPage = () => render(<HomePage />);

  it('exibe mensagem de carregamento inicialmente', () => {
    renderPage();
    expect(screen.getByText(/carregando estatísticas/i)).toBeInTheDocument();
  });

  it('carrega e envia os dados corretos para DashboardStats', async () => {
    renderPage();

    await waitFor(() =>
        expect(screen.getByTestId("dashboard-stats")).toBeInTheDocument()
    );

    const parsed = JSON.parse(screen.getByTestId("dashboard-stats").textContent);

    expect(parsed.length).toBe(3);

    expect(parsed[0].title).toBe("Agendamentos de Hoje");
    expect(parsed[0].value).toBe("10");
    expect(parsed[0].subText).toBe("5 confirmados");

    expect(parsed[1].title).toBe("Total de Clientes");
    expect(parsed[1].value).toBe("50");

    expect(parsed[2].title).toBe("Avaliação Média");
    expect(parsed[2].value).toBe("4.8");
    expect(parsed[2].subText).toBe("20 avaliações");
  });

  it('exibe atividades no HomeSidePanel', async () => {
    renderPage();

    await waitFor(() =>
        expect(screen.getByTestId("side-panel")).toBeInTheDocument()
    );

    await waitFor(() => {
        const parsed = JSON.parse(screen.getByTestId("side-panel").textContent);
        expect(parsed.length).toBe(1);
        expect(parsed[0].message).toBe("Novo agendamento");
    });
  });

  it('mostra erro quando fetchProviderProfile falha', async () => {
    providerService.fetchProviderProfile.mockRejectedValueOnce(
      new Error("Falhou")
    );

    renderPage();

    await waitFor(() =>
      expect(screen.getByText(/erro: falhou/i)).toBeInTheDocument()
    );
  });

  it('mostra erro quando providerId não existe', async () => {
    providerService.fetchProviderProfile.mockResolvedValueOnce({});

    renderPage();

    await waitFor(() =>
      expect(
        screen.getByText(/id do prestador não encontrado/i)
      ).toBeInTheDocument()
    );
  });

  it('não renderiza NextAppointments quando usuário não está logado', async () => {
    setupAuth({ isLoggedIn: false });
    renderPage();

    await waitFor(() => {
      expect(
        screen.queryByTestId("next-appointments")
      ).not.toBeInTheDocument();
    });
  });

  it('renderiza NextAppointments quando usuário está logado', async () => {
    renderPage();

    await waitFor(() =>
      expect(screen.getByTestId("next-appointments")).toBeInTheDocument()
    );
  });

  it('executa novo carregamento quando refreshKey muda', async () => {
    const { rerender } = render(<HomePage />);

    await waitFor(() =>
      expect(fetchDashboardStats).toHaveBeenCalledTimes(1)
    );

    setupAuth({ refreshKey: 1 });

    rerender(<HomePage />);

    await waitFor(() =>
      expect(fetchDashboardStats).toHaveBeenCalledTimes(2)
    );
  });
});
