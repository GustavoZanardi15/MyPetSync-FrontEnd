import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

const dayNames = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

const mockWeekData = [
  {
    dayName: "Segunda",
    dayNumber: 25,
    appointments: [
      { pet: "Rex", time: "09:00" },
      { pet: "Luna", time: "16:00" },
    ],
  },
  { dayName: "Terça", dayNumber: 26, appointments: [] },
  { dayName: "Quarta", dayNumber: 27, appointments: [] },
  {
    dayName: "Quinta",
    dayNumber: 28,
    appointments: [{ pet: "Buddy", time: "10:00" }],
  },
  { dayName: "Sexta", dayNumber: 29, appointments: [] },
  { dayName: "Sábado", dayNumber: 30, appointments: [] },
  { dayName: "Domingo", dayNumber: 31, appointments: [] },
];

const AgendaCalendar = () => {
  const currentMonthYear = "Agosto 2025";
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <div className="flex justify-between items-center pb-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          {currentMonthYear}
        </h2>
        <div className="flex items-center gap-2">
          <button className="text-gray-600 hover:text-teal-600 p-1">
            <VscChevronLeft className="w-6 h-6" />
          </button>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2 rounded-lg text-sm">
            Hoje
          </button>
          <button className="text-gray-600 hover:text-teal-600 p-1">
            <VscChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mt-4">
        {mockWeekData.map((day, index) => (
          <div
            key={day.dayName}
            className="flex flex-col bg-teal-600 h-60 text-white rounded-lg overflow-hidden"
          >
            <div className="p-2 border-b border-teal-500">
              <div className="font-bold text-base">{dayNames[index]}</div>
              <div className="text-2xl font-semibold">{day.dayNumber}</div>
            </div>
            <div className="flex flex-col p-1 overflow-y-auto flex-grow gap-1">
              {day.appointments.map((appt, idx) => (
                <div
                  key={idx}
                  className="bg-white text-teal-700 p-1 rounded text-xs font-medium text-center hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  {appt.pet} {appt.time}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgendaCalendar;
