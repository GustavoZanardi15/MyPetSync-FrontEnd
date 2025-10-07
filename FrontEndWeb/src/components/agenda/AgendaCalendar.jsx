import React, { useState, useEffect, useMemo, useCallback } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

const dayNames = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];
const ptDayNames = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];
const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const getWeekData = (startDate) => {
  const weekData = [];
  const current = new Date(startDate);

  const startOfWeek =
    current.getDate() - current.getDay() + (current.getDay() === 0 ? -6 : 1);
  current.setDate(startOfWeek);

  for (let i = 0; i < 7; i++) {
    const date = new Date(current);
    date.setDate(current.getDate() + i);

    const mockAppointments =
      date.getDate() === 25
        ? [
            { pet: "Rex", time: "09:00" },
            { pet: "Luna", time: "16:00" },
          ]
        : date.getDate() === 28
        ? [{ pet: "Buddy", time: "10:00" }]
        : [];

    weekData.push({
      date: date,
      dayNumber: date.getDate(),
      dayName: ptDayNames[i],
      appointments: mockAppointments,
    });
  }
  return weekData;
};

const AgendaCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonthYear = `${
    monthNames[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;

  const weekData = useMemo(() => getWeekData(currentDate), [currentDate]);

  const goToNextWeek = useCallback(() => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextDate);
  }, [currentDate]);

  const goToPreviousWeek = useCallback(() => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevDate);
  }, [currentDate]);
  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <div className="flex justify-between items-center pb-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          {currentMonthYear}
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousWeek}
            className="text-gray-600 hover:text-teal-600 p-1 transition-colors"
          >
            <VscChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToToday}
            className="bg-[#058789] hover:bg-teal-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Hoje
          </button>
          <button
            onClick={goToNextWeek}
            className="text-gray-600 hover:text-teal-600 p-1 transition-colors"
          >
            <VscChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mt-4">
        {weekData.map((day, index) => (
          <div
            key={day.date.toISOString()}
            className={`flex flex-col bg-teal-600 h-60 text-white rounded-lg overflow-hidden transition-all
                                                                ${
                                                                  day.date.toDateString() ===
                                                                  new Date().toDateString()
                                                                    ? "ring-4 ring-teal-500 shadow-xl"
                                                                    : ""
                                                                }`}
          >
            <div className="p-2 border-b border-teal-500">
              <div className="font-bold text-base">{day.dayName}</div>
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
