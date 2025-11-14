import api from "../../utils/Api";
import {
  fetchNextAppointments,
  getAppointments,
  createAppointment,
  updateAppointment,
} from "../agendaService";

jest.mock("../../utils/Api");

describe('agendaService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

        describe('fetchNextAppointments', () => {
            beforeAll(() => {
                jest.spyOn(console, "error").mockImplementation(() => {});
            });
            afterAll(() => {
                console.error.mockRestore();
            });
            it('deve retornar agendamentos formatados corretamente', async () => {
                const mockData = {
                    data: {
                        items: [
                            {
                                _id: "123",
                                dateTime: "2025-11-10T14:00:00.000Z",
                                status: "scheduled",
                                pet: {
                                    nome: "Rex",
                                    tutorId: { name: "João", phone: "9999-8888" },
                                },
                            },
                        ],
                    },
                };

                api.get.mockResolvedValueOnce(mockData);

                const result = await fetchNextAppointments();

                expect(api.get).toHaveBeenCalledWith("/providers/me/appointments", expect.any(Object));
                expect(result).toHaveLength(1);
                expect(result[0]).toMatchObject({
                    id: "123",
                    petName: "Rex",
                    tutorName: "João",
                    phone: "9999-8888",
                    status: "Agendado",
                });
            });

            it('deve lançar erro quando a resposta não contem array', async () => {
                api.get.mockResolvedValueOnce({ data: { items: null } });

                await expect(fetchNextAppointments()).rejects.toThrow(
                    "Não foi possível carregar os agendamentos."
                );
            });
        });

        describe('getAppointments', () => {
            it('deve retornar lista de agendamentos quando providerId for válido', async () => {
                const mockResponse = { data: { items: [{ id: "1" }] } };
                api.get.mockResolvedValueOnce(mockResponse);

                const result = await getAppointments("2025-11-10", "2025-11-11", "123456789012345678901234");

                expect(api.get).toHaveBeenCalledWith(
                    "/providers/123456789012345678901234/appointments",
                    expect.any(Object)
                );
                expect(result).toEqual([{ id: "1" }]);
            });

            it('deve retornar array vazio se providerId for inválido', async () => {
                const result = await getAppointments("2025-11-10", "2025-11-11", null);
                expect(result).toEqual([]);
            });
        });

        describe('createAppointment', () => {
            it('deve criar agendamento com sucesso', async () => {
                const mockAppointment = { pet: "pet123", reason: "Banho" };
                const mockResponse = { data: { id: "1", ...mockAppointment } };
                api.post.mockResolvedValueOnce(mockResponse);

                const result = await createAppointment(mockAppointment, "123456789012345678901234");

                expect(api.post).toHaveBeenCalledWith(
                    "/providers/123456789012345678901234/appointments",
                    mockAppointment
                );
                expect(result).toEqual(mockResponse.data);
            });

            it('deve lançar erro se providerId for inválido', async () => {
                await expect(createAppointment({}, "123")).rejects.toMatchObject({
                    response: {
                        data: {
                            message: expect.stringContaining("ID do Prestador inválido"),
                        },
                    },
                });
            });

            it('deve aceitar objeto com providerData', async () => {
                const mockAppointment = { pet: "pet123" };
                const providerObj = { _id: "123456789012345678901234" };
                const mockResponse = { data: { id: "ok" } };
                api.post.mockResolvedValueOnce(mockResponse);

                const result = await createAppointment(mockAppointment, providerObj);

                expect(api.post).toHaveBeenCalledWith(
                    "/providers/123456789012345678901234/appointments",
                    mockAppointment
                );
                expect(result).toEqual({ id: "ok" });
            });
        });

        describe('updateAppointment', () => {
            beforeEach(() => {
                jest.clearAllMocks();
            });
            it('deve atualizar um agendamento com sucesso', async () => {
                const mockResponse = { data: { id: "1", status: "confirmed" } };
                api.patch.mockResolvedValueOnce(mockResponse);

                const result = await updateAppointment("1", { status: "confirmed" });

                expect(api.patch).toHaveBeenCalledWith("/appointments/1", { status: "confirmed" });
                expect(result).toEqual(mockResponse.data);
            });

            it('deve lançar erro se o id não for informado', async () => {
                await expect(updateAppointment(null, {})).rejects.toThrow(
                    "ID do agendamento obrigatório para atualização."
                );
            });

            it('deve lançar erro personalizado da API', async () => {
                api.patch.mockRejectedValueOnce({
                    response: { data: { message: "Erro personalizado" } },
                });

                await expect(updateAppointment("123", {})).rejects.toThrow("Erro personalizado");
            });

            it('deve lançar erro genérico se não houver mensagem da API', async () => {
                api.patch.mockRejectedValueOnce(new Error("Falha interna"));
                await expect(updateAppointment("123", {})).rejects.toThrow("Falha interna");
            });
        });
});

