import AppointmentItem from "./AppointmentItem";

const mockAppointments = [
  {
    id: 1,
    petName: "Rex",
    tutorName: "Ana Silva",
    date: "25/08/2025",
    time: "09:00",
    phone: "(11) 99999-1111",
    status: "Confirmado",
  },
  {
    id: 2,
    petName: "Luna",
    tutorName: "João Santos",
    date: "25/08/2025",
    time: "16:00",
    phone: "(11) 99999-2222",
    status: "Agendado",
  },
  {
    id: 3,
    petName: "Buddy",
    tutorName: "Ana Costa",
    date: "28/08/2025",
    time: "10:00",
    phone: "(11) 99999-3333",
    status: "Confirmado",
  },
];

const NextAppointments = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-end mb-4 border-b pb-3 border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">
          Próximos Agendamentos
        </h2>
        <a
          href="/agenda"
          className="text-teal-600 hover:text-teal-700 text-sm font-medium"
        >
          Ver todos
        </a>
      </div>
      <div className="flex flex-col space-y-3">
        {mockAppointments.map((appointment) => (
          <AppointmentItem
            key={appointment.id}
            petName={appointment.petName}
            tutorName={appointment.tutorName}
            date={appointment.date}
            time={appointment.time}
            phone={appointment.phone}
            status={appointment.status}
          />
        ))}
      </div>
    </div>
  );
};

export default NextAppointments;
