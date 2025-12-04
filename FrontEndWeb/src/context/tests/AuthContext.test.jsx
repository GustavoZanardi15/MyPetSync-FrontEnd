import React from "react";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";
import {
  isAuthenticated,
  logout as apiLogout,
} from "../../services/authService";
import { fetchCurrentUser } from "../../services/userService";

jest.mock("../../services/authService", () => ({
  isAuthenticated: jest.fn(),
  logout: jest.fn(),
}));

jest.mock("../../services/userService", () => ({
  fetchCurrentUser: jest.fn(),
}));

const TestConsumer = () => {
  const {
    isLoggedIn,
    isLoading,
    user,
    loginContext,
    logoutContext,
    forceProfileReload,
  } = useAuth();

  return (
    <div>
      <p>isLoggedIn: {isLoggedIn ? "true" : "false"}</p>
      <p>isLoading: {isLoading ? "true" : "false"}</p>
      <p>User: {user ? user.nome : "null"}</p>

      <button onClick={loginContext}>login</button>
      <button onClick={logoutContext}>logout</button>
      <button onClick={forceProfileReload}>reload</button>
    </div>
  );
};

const renderWithProvider = async () => {
  let utils;
  await act(async () => {
    utils = render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
  });
  return utils;
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('carrega usuário com sucesso quando autenticado', async () => {
    isAuthenticated.mockReturnValue(true);
    fetchCurrentUser.mockResolvedValue({
      id: "1234567890123",
      nome: "Anna",
      email: "anna@test.com",
    });

    await renderWithProvider();
    
    await waitFor(() => {
      expect(screen.getByText(/isLoggedIn: true/)).toBeInTheDocument();
      expect(screen.getByText(/User: Anna/)).toBeInTheDocument();
    });
  });

  it('não autentica quando isAuthenticated retorna false', async () => {
    isAuthenticated.mockReturnValue(false);

    await renderWithProvider();

    await waitFor(() => {
      expect(screen.getByText(/isLoggedIn: false/)).toBeInTheDocument();
      expect(screen.getByText(/User: null/)).toBeInTheDocument();
    });
  });

  it('loginContext carrega usuário', async () => {
    isAuthenticated.mockReturnValue(false);

    fetchCurrentUser.mockResolvedValue({
      id: "1234567890123",
      nome: "Anna",
      email: "anna@test.com",
    });

    await renderWithProvider();

    await waitFor(() => {
      expect(screen.getByText(/isLoggedIn: false/)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("login"));
    });

    await waitFor(() => {
      expect(screen.getByText(/isLoggedIn: true/)).toBeInTheDocument();
      expect(screen.getByText(/User: Anna/)).toBeInTheDocument();
    });
  });

  it('logoutContext limpa usuário e login', async () => {
    isAuthenticated.mockReturnValue(true);

    fetchCurrentUser.mockResolvedValue({
      id: "1234567890123",
      nome: "Anna",
      email: "anna@test.com",
    });

    await renderWithProvider();

    await waitFor(() => {
      expect(screen.getByText(/isLoggedIn: true/)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("logout"));
    });

    expect(apiLogout).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText(/isLoggedIn: false/)).toBeInTheDocument();
      expect(screen.getByText(/User: null/)).toBeInTheDocument();
    });
  });

  it('forceProfileReload dispara novo carregamento do usuário', async () => {
    isAuthenticated.mockReturnValue(true);

    fetchCurrentUser.mockResolvedValueOnce({
      id: "1234567890123",
      nome: "Anna",
      email: "anna@test.com",
    });

    await renderWithProvider();

    await waitFor(() => {
      expect(screen.getByText(/User: Anna/)).toBeInTheDocument();
    });

    fetchCurrentUser.mockResolvedValueOnce({
      id: "9999999999999",
      nome: "Bruna",
      email: "bruna@test.com",
    });

    await act(async () => {
      fireEvent.click(screen.getByText("reload"));
    });

    await waitFor(() => {
      expect(screen.getByText(/User: Bruna/)).toBeInTheDocument();
    });
  });
});

describe('Jest', () => {
  it('should work', () => {
    expect(1).toBe(1);
  });
});
