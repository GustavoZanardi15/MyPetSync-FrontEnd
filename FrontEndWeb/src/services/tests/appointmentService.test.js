import api from "../../utils/Api";
import { fetchNextAppointments } from "../appointmentService";

jest.mock("../../utils/Api");

describe('appointmentService', () => {
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
                            _id: "abc123",
                            dateTime: "2025-11-10T14:00:00.000Z",
                            status: "scheduled",
                            pet: {
                                nome: "Bolt",
                                tutorId: { name: "Maria", phone: "99999-8888" },
                            },
                        },
                    ],
                },
            };

            api.get.mockResolvedValueOnce(mockData);

            const result = await fetchNextAppointments();

            expect(api.get).toHaveBeenCalledWith("/appointments", expect.any(Object));
            expect(result).toHaveLength(1);
            expect(result[0]).toMatchObject({
                id: "abc123",
                petName: "Bolt",
                tutorName: "Maria",
                phone: "99999-8888",
                status: "Agendado",
            });
        });

        it('deve lançar erro se a resposta não contiver um array válido', async () => {
            api.get.mockResolvedValueOnce({ data: { items: null } });

            await expect(fetchNextAppointments()).rejects.toThrow(
                "Não foi possível carregar os agendamentos."
            );
            expect(console.error).toHaveBeenCalled();
        });

        it('deve lançar erro se exibir mensagem de falha ao buscar agendamentos', async () => {
            api.get.mockRejectedValueOnce(new Error("Erro de rede"));

            await expect(fetchNextAppointments()).rejects.toThrow(
                "Não foi possível carregar os agendamentos."
            );
            expect(console.error).toHaveBeenCalledWith(
                "Falha ao buscar agendamentos:",
                expect.any(Error)
            );
        });
    });
});