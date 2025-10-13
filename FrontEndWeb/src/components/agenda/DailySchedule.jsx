import { VscAdd, VscEdit } from "react-icons/vsc";

const scheduleHours = Array.from({ length: 11 }, (_, i) => {
  const hour = 8 + i;
  return `${hour < 10 ? "0" : ""}${hour}:00`;
});

const mockDailyAppointments = [
  {
    time: "09:00",
    pet: "Rex",
    client: "Mário Silva",
    status: "Confirmado",
    id: 1,
  },
  {
    time: "16:00",
    pet: "Luna",
    client: "João Santos",
    status: "Pendente",
    id: 2,
  },
];
const DailySchedule = ({ onAddAppointment }) => {
  const getAppointmentByTime = (time) => {
    return mockDailyAppointments.find((appt) => appt.time === time);
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          26 de Agosto de 2025
        </h2>
        <span className="text-gray-500 font-medium">
          {mockDailyAppointments.length} agendamentos
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {scheduleHours.map((time) => {
          const appointment = getAppointmentByTime(time);
          return (
            <div
              key={time}
              className="flex items-center border border-gray-200 rounded-lg p-3 transition-shadow hover:shadow-md"
            >
              <div className="w-20 font-bold text-gray-800 text-lg flex-shrink-0">
                {time}
              </div>
              <div className="flex-grow ml-4 border-l border-teal-600 pl-4">
                {appointment ? (
                  <div className="flex justify-between items-center text-teal-700">
                    <div>
                      <p className="font-bold">{appointment.pet}</p>
                      <p className="text-sm text-gray-500">
                        {appointment.client}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full 
                               ${
                                 appointment.status === "Confirmado"
                                   ? "bg-green-100 text-green-700"
                                   : "bg-yellow-100 text-yellow-700"
                               }`}
                      >
                        {appointment.status}
                      </span>
                      <button className="text-gray-500 hover:text-teal-600 p-1 rounded">
                        <VscEdit className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => onAddAppointment(time)}
                    className="flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors"
                  >
                    <VscAdd className="w-4 h-4 mr-2" />
                    Adicionar agendamento
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailySchedule;
