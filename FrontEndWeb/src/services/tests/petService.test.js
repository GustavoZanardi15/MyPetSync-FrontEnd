import api from "../../utils/Api.jsx";
import { searchPets } from "../petService";

jest.mock("../../utils/Api.jsx");

describe('petService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterAll(() => {
        console.error.mockRestore();
    });

    describe('SearchPets', () => {
        it('deve retornar lista de pets quando a query for válida', async () => {
            const mockPets = [{ id: "1", nome: "Rex" }];
            api.get.mockResolvedValueOnce({ data: mockPets });

            const result = await searchPets("rex");

            expect(api.get).toHaveBeenCalledWith("/pets/search", { params: { q: "rex" } });
            expect(result).toEqual(mockPets);
        });


        it('deve chamar a API se a query for muito curta (< 3 caracteres)', async () => {
            const result = await searchPets("re");
            expect(api.get).not.toHaveBeenCalled();
            expect(result).toEqual([]);
        });

        it('não deve chamar a API se a query for vazia', async () => {
            const result = await searchPets("");
            expect(api.get).not.toHaveBeenCalled();
            expect(result).toEqual([]);
        });

        it('deve retornar array vazio e registrar erro se a API falhar', async () => {
            api.get.mockRejectedValueOnce(new Error("Falha de rede"));

            const result = await searchPets("rex");

            expect(console.error).toHaveBeenCalledWith(
                "Erro ao buscar pets:",
                expect.any(Error)
            );
            expect(result).toEqual([]);
        });
    });
});