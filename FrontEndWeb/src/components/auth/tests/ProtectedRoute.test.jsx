import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { useAuth } from "../../../context/AuthContext";

jest.mock("../../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const MockProtectedPage = () => <div>Conteúdo protegido</div>;

describe('ProtectedRoute Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('exibe "Carregando..." quando isLoading é true', () => {
        useAuth.mockReturnValue({ isLoggedIn: false, isLoading: true });

        render(
            <MemoryRouter initialEntries={["/homePage"]}>
                <Routes>
                    <Route path="/homePage" element={<ProtectedRoute />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Carregando...")).toBeInTheDocument();
    });


    it('redireciona para /login quando o usuário não está logado', () => {
        useAuth.mockReturnValue({ isLoggedIn: false, isLoading: false });

        render(
            <MemoryRouter initialEntries={["/homePage"]}>
                <Routes>
                    <Route path="/homePage" element={<ProtectedRoute />} />
                    <Route path="/login" element={<div>Página de Login</div>} />
                </Routes>
            </MemoryRouter>
        );

       expect(screen.getByText("Página de Login")).toBeInTheDocument(); 
    });


    it('renderiza o conteúdo protegido quando o usuário está logado', () => {
        useAuth.mockReturnValue({ isLoggedIn: true, isLoading: false });

        render(
            <MemoryRouter initialEntries={["/homePage"]}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/homePage" element={<MockProtectedPage />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Conteúdo protegido")).toBeInTheDocument();
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});