import React, { useMemo, useCallback } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import {
  format,
  startOfWeek,
  addDays,
  subDays,
  isSameDay,
  isValid,
} from "date-fns";
import { ptBR } from "date-fns/locale";

const ptDayNames = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

const createLocalDay = (dateString) => {
  return new Date(dateString?.replace(/-/g, "/") || new Date());
};

const getWeekData = (startDate, appointments = []) => {
  const weekData = [];
  const current = isValid(startDate) ? startDate : new Date();
  const start = startOfWeek(current, { weekStartsOn: 1 });

  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    const dateString = format(date, "yyyy-MM-dd");

    const dailyAppointments = appointments.filter((appt) => {
      if (!appt?.dateTime) return false;
      const apptDate = new Date(appt.dateTime);
      return isValid(apptDate) && format(apptDate, "yyyy-MM-dd") === dateString;
    });

    weekData.push({
      date,
      dayNumber: date.getDate(),
      dayName: ptDayNames[i],
      dateString,
      appointments: dailyAppointments,
    });
  }

  return weekData;
};

const AgendaCalendar = ({
  appointments = [],
  selectedDate,
  onDateSelect = () => {},
}) => {
  const selectedDateObj = useMemo(() => {
    return createLocalDay(selectedDate);
  }, [selectedDate]);

  const selectedDateString = format(selectedDateObj, "yyyy-MM-dd");

  const weekData = useMemo(
    () => getWeekData(selectedDateObj, appointments),
    [selectedDateObj, appointments]
  );

  const weekReferenceDate = weekData[0]?.date || new Date();

  const currentMonthYear = useMemo(() => {
    const formatted = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
    }).format(weekReferenceDate);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }, [weekReferenceDate]);

  const goToNextWeek = useCallback(() => {
    const nextDate = addDays(selectedDateObj, 7);
    onDateSelect(format(nextDate, "yyyy-MM-dd"));
  }, [selectedDateObj, onDateSelect]);

  const goToPreviousWeek = useCallback(() => {
    const prevDate = subDays(selectedDateObj, 7);
    onDateSelect(format(prevDate, "yyyy-MM-dd"));
  }, [selectedDateObj, onDateSelect]);

  const goToToday = useCallback(() => {
    onDateSelect(format(new Date(), "yyyy-MM-dd"));
  }, [onDateSelect]);

  const handleDayClick = useCallback(
    (dateString) => onDateSelect(dateString),
    [onDateSelect]
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <div className="flex justify-between items-center pb-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          {currentMonthYear}
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousWeek}
            aria-label="Anterior"
            className="text-gray-600 hover:text-teal-600 p-1 transition-colors"
          >
            <VscChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToToday}
            aria-label="Hoje"
            className="bg-[#058789] hover:bg-teal-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Hoje
          </button>
          <button
            onClick={goToNextWeek}
            aria-label="Próximo"
            className="text-gray-600 hover:text-teal-600 p-1 transition-colors"
          >
            <VscChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mt-4">
        {weekData.map((day) => {
          const isToday = isSameDay(day.date, new Date());
          const isSelected = day.dateString === selectedDateString;

          let dayClass = "bg-teal-600 cursor-pointer hover:bg-teal-500";
          if (isToday) {
            dayClass =
              "bg-teal-700 ring-4 ring-teal-500 shadow-xl cursor-pointer hover:bg-teal-700";
          }
          if (isSelected) {
            dayClass =
              "bg-teal-500 ring-2 ring-teal-400 shadow-lg cursor-pointer hover:bg-teal-500";
            if (isToday) {
              dayClass =
                "bg-teal-500 ring-4 ring-teal-400 shadow-xl cursor-pointer hover:bg-teal-500";
            }
          }

          return (
            <div
              key={day.dateString}
              onClick={() => handleDayClick(day.dateString)}
              className={`flex flex-col h-60 text-white rounded-lg overflow-hidden transition-all ${dayClass}`}
            >
              <div className="p-2 border-b border-teal-500">
                <div className="font-bold text-base">{day.dayName}</div>
                <div className="text-2xl font-semibold">{day.dayNumber}</div>
              </div>

              <div className="flex flex-col p-1 overflow-y-auto flex-grow gap-1">
                {day.appointments.map((appt) => {
                  let time = "00:00";
                  try {
                    const parsed = new Date(appt.dateTime);
                    if (isValid(parsed)) time = format(parsed, "HH:mm");
                  } catch {}

                  const petName = appt.pet?.nome || appt.pet?.name || "Pet";
                  return (
                    <div
                      key={appt._id}
                      className="bg-white text-teal-700 p-1 rounded text-xs font-medium text-center hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      {petName} {time}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgendaCalendar;
