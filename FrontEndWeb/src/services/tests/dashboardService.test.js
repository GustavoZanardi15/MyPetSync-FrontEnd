import api from "../../utils/Api";
import { fetchDashboardStats, fetchRecentActivities } from "../dashboardService";

jest.mock("../../utils/Api");

describe('dashboardService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchDashboardStats', () => {
        it('deve retornar estatísticas corretamente', async () => {
            const mockAppointments = { data: { totalAppointments: 5 } };
            const mockClients = { data: { totalClients: 12 } };
            const mockReviews = { data: { averageRating: 4.8 } };

            api.get 
                .mockResolvedValueOnce(mockAppointments)
                .mockResolvedValueOnce(mockClients)
                .mockResolvedValueOnce(mockReviews);

            const result = await fetchDashboardStats();
            
            expect(api.get).toHaveBeenNthCalledWith(1, "/appointments/stats/today");
            expect(api.get).toHaveBeenNthCalledWith(2, "/appointments/stats/clients");
            expect(api.get).toHaveBeenNthCalledWith(3, "/reviews/stats/average");

            expect(result).toEqual({
                appointments: mockAppointments.data,
                clients: 12,
                reviews: mockReviews.data,
            });
        });

        it('deve lançar erro se uma das chamadas falhar', async () => {
            api.get.mockRejectedValueOnce(new Error("Falha de rede"));
            await expect(fetchDashboardStats()).rejects.toThrow("Falha de rede");
        });
    });

    describe('fetchRecentActivities', () => {
        it('deve retornar lista formatada corretamente', async () => {
            const mockActivities = {
                data: [
                    { _id: "1", rating: 5, author: { name: "Maria" } },
                    { _id: "2", rating: 4, author: { name: "João" } },
                ],
            };
            api.get.mockResolvedValueOnce(mockActivities);

            const result = await fetchRecentActivities();

            expect(api.get).toHaveBeenCalledWith("/reviews/recent");
            expect(result).toHaveLength(2);
            expect(result[0]).toMatchObject({
                id: "1",
                type: "Avaliação Recebida",
                detail: "Nota 5 por Maria",
                rating: 5,
                iconName: "VscStarFull",
                color: "bg-yellow-500",
            });
        });

        it('deve usar "Cliente" se o nome do autor não estiver disponível', async () => {
            const mockActivities = {
                data: [{ _id: "3", rating: 3, author: null }],
            };
            api.get.mockResolvedValueOnce(mockActivities);

            const result = await fetchRecentActivities();
            expect(result[0].detail).toBe("Nota 3 por Cliente");
        });

        it('deve retornar array vazio se a resposta não for um array', async () => {
            api.get.mockResolvedValueOnce({ data: null });
            const result = await fetchRecentActivities();
            expect(result).toEqual([]);
        });

        it('deve lançar erro se a requisição falhar', async () => {
            api.get.mockRejectedValueOnce(new Error("Falha de rede"));
            await expect(fetchRecentActivities()).rejects.toThrow("Falha de rede");
        });
    });
});