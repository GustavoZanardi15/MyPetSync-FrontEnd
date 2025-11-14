import api from "../../utils/Api";
import { fetchProviderProfile, updateProviderProfile } from "../providerService";

jest.mock("../../utils/Api");

describe('providerService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
        jest.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterAll(() => {
        console.error.mockRestore();
        console.warn.mockRestore();
    });

    describe('fetchProviderProfile', () => {
        it('deve retornar dados do prestador quando a resposta é válida', async () => {
            const mockData = { _id: "123", name: "Anna", email: "anna@test.com", role: "provider" };
            api.get.mockResolvedValueOnce({ data: mockData });

            const result = await fetchProviderProfile();

            expect(api.get).toHaveBeenCalledWith("/providers/me");
            expect(result).toEqual(mockData);
        });

        it('deve retornar null e emitir warning se perfil for vazio ou inválido', async () => {
            const mockData = { id: "xyz" };
            api.get.mockResolvedValueOnce({ data: mockData });

            const result = await fetchProviderProfile();

            expect(console.warn).toHaveBeenCalledWith(
                expect.stringContaining("perfil de prestador ausente ou vazio")
            );
            expect(result).toBeNull();
        });

        it('deve retornar null e emitir warning se a API responder 404', async () => {
            const mockError = { response: { status: 404 } };
            api.get.mockRejectedValueOnce(mockError);

            const result = await fetchProviderProfile();

            expect(console.warn).toHaveBeenCalledWith(
                expect.stringContaining("perfil de prestador não encontrado")
            );
            expect(result).toBeNull();
        });

        it('deve lançar erro e registrar mensagem no console para outros erros', async () => {
            const mockError = new Error("Erro interno");
            api.get.mockRejectedValueOnce(mockError);

            await expect(fetchProviderProfile()).rejects.toThrow("Erro interno");
            expect(console.error).toHaveBeenCalledWith(
                "Falha ao buscar perfil do Prestador (API Error):",
                expect.any(String)
            );
        });
    });

    describe('updateProviderProfile', () => {
        it('deve atualizar o perfil com sucesso', async () => {
            const mockUpdate = { name: "Anna Atualizada" };
            const mockResponse = { data: { sucess: true } };
            api.patch.mockResolvedValueOnce(mockResponse);

            const result = await updateProviderProfile(mockUpdate);

            expect(api.patch).toHaveBeenCalledWith("/providers/me", mockUpdate);
            expect(result).toEqual({ sucess: true });
        });

        it('deve lançar erro e registrar mensagem ao falhar na atualização', async () => {
            const mockError = new Error("Falha de servidor");
            api.patch.mockRejectedValueOnce(mockError);

            await expect(updateProviderProfile({})).rejects.toThrow("Falha de servidor");
            expect(console.error).toHaveBeenCalledWith(
                "Falha ao atualizar perfil do Prestador:",
                expect.any(String)
            );
        });

    });
});