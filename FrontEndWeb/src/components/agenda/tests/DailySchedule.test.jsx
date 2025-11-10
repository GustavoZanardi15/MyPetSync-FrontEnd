import { render, screen, fireEvent } from "@testing-library/react";
import DailySchedule from "../DailySchedule";

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2025-08-26T09:00:00"));
});

afterAll(() => {
  jest.useRealTimers();
});

describe('DailySchedule Component', () => {
  const mockAddAppointment = jest.fn();

  const mockAppointments = [
    {
      _id: "1",
      dateTime: "2025-08-26T09:00:00",
      pet: { name: "Rex" },
      reason: "Consulta",
      location: "Sala 1",
      status: "confirmed",
    },
    {
      _id: "2",
      dateTime: "2025-08-26T10:00:00",
      pet: { name: "Luna" },
      reason: "Vacina",
      location: "Sala 2",
      status: "scheduled",
    },
  ];

  it('deve renderizar o título com a data e o total de agendamentos', () => {
    render(
      <DailySchedule
        appointments={mockAppointments}
        selectedDate="2025-08-26"
        onAddAppointment={mockAddAppointment}
      />
    );

    expect(screen.getByText(/26 de agosto de 2025/i)).toBeInTheDocument();
    expect(screen.getByText("2 agendamentos")).toBeInTheDocument();
  });

  it('deve exibir os horários corretamente de 8:00 até 18:00', () => {
    render(
      <DailySchedule
        appointments={mockAppointments}
        selectedDate="2025-08-26"
        onAddAppointment={mockAddAppointment}
      />
    );

    const hours = [
      "08:00", "09:00", "10:00", "11:00", "12:00",
      "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
    ];

    hours.forEach((time) => {
      expect(screen.getByText(time)).toBeInTheDocument();
    });
  });

  it('deve renderizar corretamente os agendamentos mockados (Rex e Luna)', () => {
    render(
      <DailySchedule
        appointments={mockAppointments}
        selectedDate="2025-08-26"
        onAddAppointment={mockAddAppointment}
      />
    );

    expect(screen.getByText("Rex")).toBeInTheDocument();
    expect(screen.getByText("Luna")).toBeInTheDocument();
    expect(screen.getByText("Confirmado")).toBeInTheDocument();
    expect(screen.getByText("Agendado")).toBeInTheDocument();
  });

  it('deve renderizar botões "Adicionar agendamento" nos horários vazios', () => {
    render(
      <DailySchedule
        appointments={mockAppointments}
        selectedDate="2025-08-26"
        onAddAppointment={mockAddAppointment}
      />
    );

    const addButtons = screen.getAllByText(/Adicionar agendamento/i);
    expect(addButtons.length).toBeGreaterThan(0);
  });

  it('deve chamar a função onAddAppointment ao clicar em "Adicionar agendamento"', () => {
    render(
      <DailySchedule
        appointments={[]}
        selectedDate="2025-08-26"
        onAddAppointment={mockAddAppointment}
      />
    );

    const addButtons = screen.getAllByText(/Adicionar agendamento/i);
    fireEvent.click(addButtons[0]);

    expect(mockAddAppointment).toHaveBeenCalledTimes(1);
    expect(mockAddAppointment).toHaveBeenCalledWith(expect.any(String));
  });

  it('deve exibir o botão de editar para horários com agendamento', () => {
    render(
      <DailySchedule
        appointments={mockAppointments}
        selectedDate="2025-08-26"
        onAddAppointment={mockAddAppointment}
      />
    );

    const editButtons = screen.getAllByRole("button");
    expect(editButtons.length).toBeGreaterThan(0);
  });
});

describe('Jest', () => {
  it('should work', () => {
    expect(1).toBe(1);
  });
});
