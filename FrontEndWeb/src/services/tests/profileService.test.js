import api from "../../utils/Api";
import { fetchProviderProfile, updateProviderProfile } from "../profileService";

jest.mock("../../utils/Api");

describe('profileService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterAll(() => {
        console.error.mockRestore();
    });

    describe('fetchProviderProfile', () => {
        it('deve retornar dados do perfil do prestador com sucesso', async () => {
            const mockProfile = { id: "1", name: "Anna", email: "anna@test.com" };
            api.get.mockResolvedValueOnce({ data: mockProfile });

            const result = await fetchProviderProfile();

            expect(api.get).toHaveBeenCalledWith("/providers/me");
            expect(result).toEqual(mockProfile);
        });

        it('deve lançar erro com mensagem amigável ao falhar', async () => {
            api.get.mockRejectedValueOnce(new Error("Erro de rede"));

            await expect(fetchProviderProfile()).rejects.toThrow(
                "Não foi possível carregar os dados do perfil."
            );
            expect(console.error).toHaveBeenCalledWith(
                "Falha ao buscar o perfil do prestador:",
                expect.any(Error)
            );
        });
    });

    describe('updateProviderProfile', () => {
        it('deve atualizar perfil com sucesso', async () => {
            const mockProfileData = { name: "Anna Atualizada" };
            const mockResponse = { data: { sucess: true } };
            api.patch.mockResolvedValueOnce(mockResponse);

            const result = await updateProviderProfile(mockProfileData);

            expect(api.patch).toHaveBeenCalledWith("/providers/me", mockProfileData);
            expect(result).toEqual({ sucess: true });
        });

        it('deve lançar erro com mensagem amigável ao falhar', async () => {
            api.patch.mockRejectedValueOnce(new Error("Falha no servidor"));

            await expect(updateProviderProfile({})).rejects.toThrow(
                "Não foi possível salvar as alterações."
            );
            expect(console.error).toHaveBeenCalledWith(
                "Falha ao atualizar o perfil:",
                expect.any(Error)
            );
        });
    });
});