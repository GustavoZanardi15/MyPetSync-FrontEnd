import api from "../../utils/Api";
import { fetchCurrentUser, updateCurrentUser } from "../userService";

jest.mock("../../utils/Api");

describe('userService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchCurrentUser', () => {
        beforeAll(() => {
            jest.spyOn(console, "error").mockImplementation(() => {});
        });

        afterAll(() => {
            console.error.mockRestore();
        });

        it('deve retornar os dados do usuário logado com sucesso', async () => {
            const mockUser = { id: "123", name: "Anna" };
            api.get.mockResolvedValueOnce({ data: mockUser });

            const result = await fetchCurrentUser();

            expect(api.get).toHaveBeenCalledWith("/users/me");
            expect(result).toEqual(mockUser);
        });

        it('deve lançar erro e registrar log quando a API falhar', async () => {
            api.get.mockRejectedValueOnce(new Error("Falha inesperada"));

            await expect(fetchCurrentUser()).rejects.toThrow(
                "Não foi possível carregar o perfil do usuário."
            );

            expect(console.error).toHaveBeenCalledWith(
                "Falha ao buscar usuário logado:",
                expect.any(Error)
            );
        });
    });

    describe('updateCurrentUser', () => {
        beforeAll(() => {
            jest.spyOn(console, "error").mockImplementation(() => {});
        });

        afterAll(() => {
            console.error.mockRestore();
        });

        it('deve atualizar o usuário com sucesso', async () => {
            const updateData = { name: "Novo Nome" };
            const mockResponse = { id: "123", name: "Novo Nome" };

            api.patch.mockResolvedValueOnce({ data: mockResponse });

            const result = await updateCurrentUser(updateData);

            expect(api.patch).toHaveBeenCalledWith("/users/me", updateData);
            expect(result).toEqual(mockResponse);
        });

        it('deve lançar erro e registrar log ao falhar atualização', async () => {
            const mockError = new Error("Erro interno");
            api.patch.mockRejectedValueOnce(mockError);

            await expect(updateCurrentUser({})).rejects.toThrow("Erro interno");

            expect(console.error).toHaveBeenCalledWith(
                "Falha ao atualizar o usuário:",
                mockError
            );
        });
    });
});