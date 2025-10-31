import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AgendaCalendar from "../AgendaCalendar";

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2024-05-25T09:00:00")); 
});

afterAll(() => {
  jest.useRealTimers();
});

describe('AgendaCalendar Component', () => {
    it('deve renderizar o mês e ano atuais', () => {
        render(<AgendaCalendar />);
        expect(screen.getByText(/maio de 2024/i)).toBeInTheDocument();
    });


    it('deve renderizar 7 dias por semana', () => {
        render(<AgendaCalendar />);
        const dias = screen.getAllByText(/^[0-9]+$/); 
        expect(dias.length).toBe(7);
    })


    it('deve exibir os nomes dos dias da semana em português', () => {
        render(<AgendaCalendar />);
        const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
        dias.forEach((dia) => {
            expect(screen.getByText(dia)).toBeInTheDocument();
        });
    });


    it('deve destacar o dia atual', () => {
        render(<AgendaCalendar />);
        const hoje = new Date().getDate().toString();
        const elementoDia = screen.getByText(hoje);

        let elementoComDestaque = elementoDia;
        while (elementoComDestaque && !elementoComDestaque.classList?.contains('ring-4')) {
            elementoComDestaque = elementoComDestaque.parentElement;
        }

        expect(elementoComDestaque).not.toBeNull();
        expect(elementoComDestaque).toHaveClass('ring-4');
    });


    it('deve exibir os compromissos simulados corretamente', () => {
        render(<AgendaCalendar />);
        expect(screen.getByText(/Rex 09:00/)).toBeInTheDocument();
        expect(screen.getByText(/Luna 16:00/)).toBeInTheDocument();
    });


    it('deve mudar a semana ao clicar no botão de próxima semana', () => {
        render(<AgendaCalendar />);
        const primeiroDiaAntes = screen.getAllByText(/^[0-9]+$/)[0].textContent;
        const botoes = screen.getAllByRole("button");
        const btnNext = botoes[botoes.length - 1]; 
        
        fireEvent.click(btnNext);

        const primeiroDiaDepois = screen.getAllByText(/^[0-9]+$/)[0].textContent;
        expect(primeiroDiaDepois).not.toEqual(primeiroDiaAntes);
    });


    it('deve mudar a semana ao clicar no botão de semana anterior', () => {
        render(<AgendaCalendar />);
        const primeiroDiaAntes = screen.getAllByText(/^[0-9]+$/)[0].textContent;

        const botoes = screen.getAllByRole("button");
        const btnPrev = botoes[0]; 

        fireEvent.click(btnPrev);

        const primeiroDiaDepois = screen.getAllByText(/^[0-9]+$/)[0].textContent;
        expect(primeiroDiaDepois).not.toEqual(primeiroDiaAntes);
    });


    it('deve voltar para hoje ao clicar no botão "Hoje"', () => {
        render(<AgendaCalendar />);
        const botoes = screen.getAllByRole("button");
        const btnNext = botoes[botoes.length - 1];
        const btnHoje = screen.getByRole("button", { name: /hoje/i });

        fireEvent.click(btnNext);
        fireEvent.click(btnHoje);

        expect(screen.getByText(/de 2024/i)).toBeInTheDocument();
    });


    it('deve ter botões acessíveis com rótulos "Anterior", "Hoje" e "Próximo"', () => {
        render(<AgendaCalendar />);
        expect(screen.getByRole("button", { name: /anterior/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /hoje/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /próximo/i })).toBeInTheDocument();
    });

});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    })
})