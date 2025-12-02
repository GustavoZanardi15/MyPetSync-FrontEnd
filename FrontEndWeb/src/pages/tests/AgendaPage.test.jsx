import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AgendaPage from "../../pages/AgendaPage";
import { useAuth } from "../../context/AuthContext";
import { getAppointments } from "../../services/agendaService";
import { fetchProviderProfile } from "../../services/providerService";
import { useSearchParams } from "react-router-dom";

jest.mock("../../context/AuthContext");
jest.mock("../../services/agendaService");
jest.mock("../../services/providerService");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

jest.mock("../../components/agenda/AgendaCalendar", () => () => (
  <div data-testid="calendar" />
));
jest.mock("../../components/agenda/DailySchedule", () => () => (
  <div data-testid="schedule" />
));
jest.mock("../../components/agenda/DailySummary", () => () => (
  <div data-testid="summary" />
));

let modalProps = {};

jest.mock("../../components/agenda/NewAppointmentModal", () => (props) => {
  modalProps = props; 
  return (
    <div data-testid="modal" data-open={props.isOpen ? "true" : "false"} />
  );
});

describe('AgendaPage', () => {
    let setSearchParamsMock;

    beforeEach(() => {
        jest.clearAllMocks();

        setSearchParamsMock = jest.fn();

        useSearchParams.mockReturnValue([
            new URLSearchParams(),
            setSearchParamsMock,
        ]);

        useAuth.mockReturnValue({
            user: { providerId: "provider123" },
        });

        getAppointments.mockResolvedValue([]);
        fetchProviderProfile.mockResolvedValue({_id: "provider123" });
    });

    const renderPage = () => render(<AgendaPage />);

    it('deve mostrar mensagem de carregamento enquanto busca agendamentos', async () => {
        getAppointments.mockResolvedValueOnce([]);

        renderPage();

        expect(
            screen.getByText("Carregando Agendamentos...")
        ).toBeInTheDocument();

        await waitFor(() => expect(getAppointments).toHaveBeenCalled());
    });

    it('deve renderizar calendário, agenda diária e resumo após carregar', async () => {
        renderPage();

        await waitFor(() =>
            expect(screen.getByTestId("calendar")).toBeInTheDocument()
        );

        expect(screen.getByTestId("schedule")).toBeInTheDocument();
        expect(screen.getByTestId("summary")).toBeInTheDocument();
    });

    it('deve abrir o modal quando URL possui new=true', async () => {
        useSearchParams.mockReturnValue([
            new URLSearchParams({ new: "true" }),
            setSearchParamsMock,
        ]);

        renderPage();

        await waitFor(() => expect(modalProps.isOpen).toBe(true));
    });

    it('deve abrir modal ao clicar no botão de Novo Agendamento', async () => {
        renderPage();

        await waitFor(() => expect(getAppointments).toHaveBeenCalled());

        const btn = screen.getByRole("button", { name: /novo agendamento/i });
        fireEvent.click(btn);

        expect(setSearchParamsMock).toHaveBeenCalledWith({ new: true });
    });


    it('deve chamar getAppointment com providerId do usuário', async () => {
        renderPage();

        await waitFor(() =>
            expect(getAppointments).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(String),
                "provider123"
            )
        );
    });


    it('deve buscar providerProfile quando user não tiver providerId', async () => {
        useAuth.mockReturnValueOnce({
            user: { id: "user123", name: "Anna", providerId: null },
        });

        fetchProviderProfile.mockResolvedValueOnce({ _id: "abc999" });

        renderPage();

        await waitFor(() => expect(fetchProviderProfile).toHaveBeenCalled());

        await waitFor(() => 
            expect(getAppointments).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(String),
                "abc999"
            )
        );
    });

    it('deve fechar modal quando onClose é chamado', async () => {
        useSearchParams.mockReturnValue([
            new URLSearchParams({ new: "true" }),
            setSearchParamsMock,
        ]);

        renderPage();

        await waitFor(() =>
            expect(screen.getByTestId("modal").dataset.open).toBe("true")
        );

        await waitFor(() => {
            modalProps.onClose();
        });

        expect(setSearchParamsMock).toHaveBeenCalledWith({});
    });

    it('deve desabilitar botão de novo agendamento enquanto providerId estiver carregando', async () => {
        useAuth.mockReturnValue({
            user: { providerId: null },
        });

        fetchProviderProfile.mockImplementation(
            () => new Promise(() => {})  
        );

        renderPage();

        const btn = await screen.findByRole("button");

        expect(btn).toBeDisabled();
        expect(btn).toHaveTextContent("Carregando ID...");
    });
});