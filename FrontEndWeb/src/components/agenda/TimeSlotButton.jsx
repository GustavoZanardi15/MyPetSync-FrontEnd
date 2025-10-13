const TimeSlotButton = ({ time, onAddAppointment }) => {
  return (
    <div className="flex justify-between items-center py-2 px-4 border-b">
      <div className="w-16 font-semibold">{time}</div>

      <div
        className="flex-1 text-[#058789] cursor-pointer hover:underline"
        onClick={() => onAddAppointment(time)}
      >
        + Adicionar agendamento
      </div>
    </div>
  );
};

export default TimeSlotButton;
