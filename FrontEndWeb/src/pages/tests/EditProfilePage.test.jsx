import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditProfilePage from "../../pages/EditProfilePage";
import { useAuth } from "../../context/AuthContext";
import {
  fetchProviderProfile,
  updateProviderProfile,
} from "../../services/providerService";
import { updateCurrentUser } from "../../services/userService";
import { fetchDashboardStats } from "../../services/dashboardService";
import { useNavigate } from "react-router-dom";

jest.mock("../../context/AuthContext");
jest.mock("../../services/providerService");
jest.mock("../../services/userService");
jest.mock("../../services/dashboardService");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../components/profile/ProfileCard", () => () => (
  <div data-testid="profile-card" />
));
jest.mock("../../components/profile/ProfileInfoBlock", () => (props) => (
  <div data-testid={`block-${props.title}`} />
));

describe('EditProfilePage', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        useNavigate.mockReturnValue(mockNavigate);
        useAuth.mockReturnValue({
            forceProfileReload: jest.fn(),
        });

        fetchProviderProfile.mockResolvedValue({
            name: "PetShop Lua",
            email: "pet@lua.com",
            phone: "11999999999",
            whatsapp: "11999999999",
            street: "Rua A",
            number: "123",
            city: "São Paulo",
            state: "SP",
            bio: "Descrição",
            openingHours: ["Seg: 8-18"],
            servicesOffered: ["Banho", "Tosa"],
            type: "company",
            profilePictureUrl: "",
        });

        fetchDashboardStats.mockResolvedValue({
            reviews: { average: 4.8, count: 32 },
            clients: 120,
        });
    });

    const renderPage = () => render(<EditProfilePage />);

    it('mostra o estado de carregamento', async () => {
        fetchProviderProfile.mockImplementationOnce(
            () => new Promise(() => {})
        );

        renderPage();

        expect(
            screen.getByText("Carregando formulário...")
        ).toBeInTheDocument();
    });

    it('exibe erros se falhar ao carregar', async () => {
        fetchProviderProfile.mockRejectedValueOnce(new Error("Falha"));

        renderPage();

        await waitFor(() =>
            expect(screen.getByText("Falha")).toBeInTheDocument()
        );
    });

    it('renderiza os blocos do formulário após carregar', async () => {
        renderPage();

        await waitFor(() =>
            expect(screen.getByTestId("profile-card")).toBeInTheDocument()
        );

        expect(screen.getByTestId("block-Informações Básicas")).toBeInTheDocument();
        expect(screen.getByTestId("block-Informações de Contato")).toBeInTheDocument();
        expect(screen.getByTestId("block-Informações Adicionais")).toBeInTheDocument();
    });

    it('navega ao clicar em Cancelar', async () => {
        renderPage();

        await waitFor(() =>
            expect(screen.getByTestId("profile-card")).toBeInTheDocument()
        );

        const cancelBtn = screen.getByRole("button", { name: /cancelar/i });
        fireEvent.click(cancelBtn);

        expect(mockNavigate).toHaveBeenCalledWith("/profile");
    });

    it('salva os dados chamando updateUser e updateProvider', async () => {
        updateCurrentUser.mockResolvedValue({});
        updateProviderProfile.mockResolvedValue({});

        renderPage();

        await waitFor(() =>
            expect(screen.getByTestId("profile-card")).toBeInTheDocument()
        );

        const saveBtn = screen.getByRole("button", { name: /salvar/i });
        fireEvent.click(saveBtn);

        await waitFor(() =>
            expect(updateProviderProfile).toHaveBeenCalled()
        );
        expect(mockNavigate).toHaveBeenCalledWith("/profile");
    });

    it('mostra erro amigável quando receber 409', async () => {
        updateProviderProfile.mockRejectedValueOnce({
            response: {
                status: 409,
                data: { message: "Email já usado" },
            },
        });

        renderPage();

        await waitFor(() =>
            expect(screen.getByTestId("profile-card")).toBeInTheDocument()
        );

        const saveBtn = screen.getByRole("button", { name: /salvar/i });
        fireEvent.click(saveBtn);

        await waitFor(() =>
            expect(
                screen.getByText("Email já usado")
            ).toBeInTheDocument()
        );
    });

    it('mostra erro genérico ao salvar', async () => {
        updateProviderProfile.mockRejectedValueOnce(new Error("Falhou"));

        renderPage();

        await waitFor(() =>
            expect(screen.getByTestId("profile-card")).toBeInTheDocument()
        );

        const saveBtn = screen.getByRole("button", { name: /salvar/i });
        fireEvent.click(saveBtn);

        await waitFor(() =>
            expect(
                screen.getByText("Erro ao salvar: Falhou")
            ).toBeInTheDocument()
        );
    });
});