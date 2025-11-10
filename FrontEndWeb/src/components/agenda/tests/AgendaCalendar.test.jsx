import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AgendaCalendar from "../AgendaCalendar";
import { VscCheck, VscCalendar, VscHistory } from "react-icons/vsc";

const Wrapper = ({ initialDate = "2024-05-20", appointments = [] }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  return (
    <AgendaCalendar
      appointments={appointments}
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
    />
  );
};

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2024-05-25T09:00:00")); 
});

afterAll(() => {
  jest.useRealTimers();
});

const mockAppointments = [
  {
    _id: "1",
    dateTime: "2024-05-21T09:00:00",
    pet: { nome: "Rex" },
  },
  {
    _id: "2",
    dateTime: "2024-05-23T16:00:00",
    pet: { nome: "Luna" },
  },
];

describe('AgendaCalendar Component', () => {
    it('deve renderizar o mês e ano atuais', () => {
        render(<AgendaCalendar selectedDate="2024-05-25" appointments={[]} />);
        expect(screen.getByText(/maio de 2024/i)).toBeInTheDocument();
    });


    it('deve renderizar 7 dias por semana', () => {
        const { container } = render(
            <AgendaCalendar selectedDate="2024-05-25" appointments={[]} />
        );
        const dias = container.querySelectorAll(".grid.grid-cols-7 > div");
        expect(dias.length).toBe(7);
    })


    it('deve exibir os nomes dos dias da semana em português', () => {
        render(<AgendaCalendar selectedDate="2024-05-25" appointments={[]} />);
        const dias = [
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado",
            "Domingo",
        ];
        dias.forEach((dia) => expect(screen.getByText(dia)).toBeInTheDocument());
    });


    it('deve destacar o dia atual', () => {
        const { container } = render(
            <AgendaCalendar selectedDate="2024-05-25" appointments={[]} />
        );
        const hoje = container.querySelector(".ring-4");
        expect(hoje).toBeInTheDocument();
    });


    it('deve exibir os compromissos simulados corretamente', () => {
        render(
            <AgendaCalendar selectedDate="2024-05-25" appointments={mockAppointments} />
        );
        expect(screen.getByText(/Rex 09:00/)).toBeInTheDocument();
        expect(screen.getByText(/Luna 16:00/)).toBeInTheDocument();
    });


    it('deve mudar a semana ao clicar no botão de próxima semana', () => {
        render(<Wrapper />);
        const primeiroDiaAntes = screen.getAllByText(/^[0-9]+$/)[0].textContent;

        const btnNext = screen.getByRole("button", { name: /próximo/i });
        fireEvent.click(btnNext);

        const primeiroDiaDepois = screen.getAllByText(/^[0-9]+$/)[0].textContent;
        expect(primeiroDiaDepois).not.toEqual(primeiroDiaAntes);
    });


    it('deve mudar a semana ao clicar no botão de semana anterior', () => {
        render(<Wrapper />);
        const primeiroDiaAntes = screen.getAllByText(/^[0-9]+$/)[0].textContent;

        const btnPrev = screen.getByRole("button", { name: /anterior/i });
        fireEvent.click(btnPrev);

        const primeiroDiaDepois = screen.getAllByText(/^[0-9]+$/)[0].textContent;
        expect(primeiroDiaDepois).not.toEqual(primeiroDiaAntes);
    });


    it('deve voltar para hoje ao clicar no botão "Hoje"', () => {
        render(<AgendaCalendar selectedDate="2024-05-25" appointments={[]} />);
        const btnNext = screen.getByRole("button", { name: /próximo/i });
        const btnHoje = screen.getByRole("button", { name: /hoje/i });

        fireEvent.click(btnNext);
        fireEvent.click(btnHoje);

        expect(screen.getByText(/maio de 2024/i)).toBeInTheDocument();
    });


    it('deve ter botões acessíveis com rótulos "Anterior", "Hoje" e "Próximo"', () => {
        render(<AgendaCalendar selectedDate="2024-05-25" appointments={[]} />);
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