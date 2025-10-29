import axios from "axios";

const API_URL = "http://localhost:3000/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🚨 CORREÇÃO ESSENCIAL: Tenta carregar o token imediatamente na inicialização
// Isso garante que requisições assíncronas ao carregar a página já tenham o token
const initialToken = localStorage.getItem("myPetSyncToken");
if (initialToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${initialToken}`;
}

api.interceptors.request.use(
  (config) => {
    // O interceptor garante que requisições enviadas após o login (sem refresh) também recebam o token
    const token = localStorage.getItem("myPetSyncToken");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Limpa o token se o servidor rejeitar a requisição por não autorizado (401)
    if (error.response?.status === 401) {
      localStorage.removeItem("myPetSyncToken");
      delete api.defaults.headers.common["Authorization"];
      // Se o 401 persistir, adicione aqui o código para forçar um redirecionamento para /login
    }
    return Promise.reject(error);
  }
);

export default api;
