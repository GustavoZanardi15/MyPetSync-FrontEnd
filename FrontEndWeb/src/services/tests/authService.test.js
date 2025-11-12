import api from "../../utils/Api";
import {
  signup,
  login,
  requestPasswordReset,
  verifyResetCode,
  resetPassword,
  isAuthenticated,
  logout,
} from "../authService";

jest.mock("../../utils/Api");

beforeAll(() => {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => (store[key] = value.toString()),
      removeItem: (key) => delete store[key],
      clear: () => (store = {}),
    };
  })();
  Object.defineProperty(global, 'localStorage', { value: localStorageMock });
});


describe('authService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    describe('signup', () => {
        it('deve registrar usuário e salvar token', async () => {
            const mockResponse = {
                data: { token: "abc123", user: { id: "1", name: "Anna" } },
            };
            api.post.mockResolvedValueOnce(mockResponse);

            const user = await signup({ name: "Anna" });

            expect(api.post).toHaveBeenCalledWith("/auth/signup", {name: "Anna" });
            expect(localStorage.getItem("myPetSyncToken")).toBe("abc123");
            expect(user).toEqual({ id: "1", name: "Anna" });
        });

        it('deve lançar erro com mensagem da API (string)', async () => {
            api.post.mockRejectedValueOnce({
                response: { data: { message: "Email já cadastrado" } },
            });

            await expect(signup({})).rejects.toThrow("Email já cadastrado");
        });

        it('deve lançar erro com múltiplas mensagens da API (array)', async () => {
            api.post.mockRejectedValueOnce({
                response: { data: { message: ["Campo obrigatório", "Formato inválido"] } },
            });

            await expect(signup({})).rejects.toThrow("Campo obrigatório\nFormato inválido");
        });

        it('deve lançar erro genérico se não houver resposta da API', async () => {
            api.post.mockRejectedValueOnce({});
            await expect(signup({})).rejects.toThrow(
                "Falha na comunicação com o servidor. Tente novamente."
            );
        });
    });

    describe('login', () => {
        it('deve logar usuário e salvar token', async () => {
            const mockResponse = {
                data: { token: "xyz789", user: { id: "2", name: "Maria" } },
            };
            api.post.mockResolvedValueOnce(mockResponse);

            const user = await login("teste@email.com", "123456");

            expect(api.post).toHaveBeenCalledWith("/auth/login", {
                email: "teste@email.com",
                senha: "123456",
            });
            expect(localStorage.getItem("myPetSyncToken")).toBe("xyz789");
            expect(user).toEqual({ id: "2", name: "Maria" });
        });

        it('deve lançar erro com mensagem da API (string)', async () => {
            api.post.mockRejectedValueOnce({
                response: { data: { message: "Credenciais inválidas" } },
            });

            await expect(login("a@b.com", "123")).rejects.toThrow("Credenciais inválidas");
        });

        it('deve lançar erro genérico se não houver resposta da API', async () => {
            api.post.mockRejectedValueOnce({});
            await expect(login("a@b.com", "123")).rejects.toThrow(
                "Falha na comunicação com o servidor. Tente novamente."
            );
        });
    });

    describe('requestPasswordReset', () => {
        it('deve solicitar redefinição de senha com sucesso', async () => {
            const mockResponse = { data: { message: "Email enviado" } };
            api.post.mockResolvedValueOnce(mockResponse);

            const result = await requestPasswordReset("teste@email.com");

            expect(api.post).toHaveBeenCalledWith("/auth/esqueci-senha", {
                email: "teste@email.com",
            });
            expect(result).toEqual({ message: "Email enviado" });
        });

        it('deve lançar erro com mensagem da API', async () => {
            api.post.mockRejectedValueOnce({
                response: { data: { message: "Email não encontrado" } },
            });
            await expect(requestPasswordReset("x")).rejects.toThrow("Email não encontrado");
        });

        it('deve lançar erro genérico', async () => {
            api.post.mockRejectedValueOnce({});
            await expect(requestPasswordReset("x")).rejects.toThrow(
                "Falha na comunicação com o servidor ao solicitar recuperação de senha."
            );
        });
    });

    describe('resetPassword', () => {
        it('deve redefinir senha com sucesso', async () => {
            const mockResponse = { data: { success: true } };
            api.post.mockResolvedValueOnce(mockResponse);

            const result = await resetPassword("a@b.com", "code123", "novaSenha");

            expect(api.post).toHaveBeenCalledWith("/auth/reset-password", {
                token: "code123",
                newPassword: "novaSenha",
            });
            expect(result).toEqual({ success: true });
        });

        it('deve lançar erro com mensagem da API', async () => {
            api.post.mockRejectedValueOnce({
                response: { data: { message: "Token inválido" } },
            });
            await expect(resetPassword("a", "b", "c")).rejects.toThrow("Token inválido");
        });

        it('deve lançar erro genérico', async () => {
            api.post.mockRejectedValueOnce({});
            await expect(resetPassword("a", "b", "c")).rejects.toThrow(
                "Falha ao redefinir a senha. Verifique o código e tente novamente."
            );
        });
    });

    describe('autenticação local', () => {
        it('deve retornar true se o token existir', () => {
            localStorage.setItem("myPetSyncToken", "123");
            expect(isAuthenticated()).toBe(true);
        });

        it('deve retornar false se o token não existir', () => {
            expect(isAuthenticated()).toBe(false);
        });

        it('deve remover token e cabeçalho ao deslogar', () => {
            localStorage.setItem("myPetSyncToken", "123");
            api.defaults.headers.common["Authorization"] = "Bearer 123";

            logout();

            expect(localStorage.getItem("myPetSyncToken")).toBeNull();
            expect(api.defaults.headers.common["Authorization"]).toBeUndefined();
        });
    });


});