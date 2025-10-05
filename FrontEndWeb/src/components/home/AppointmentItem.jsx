const AppointmentItem = ({ petName, tutorName, date, time, phone, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmado":
        return "bg-teal-700 hover:bg-teal-600";
      case "Agendado":
        return "bg-blue-600 hover:bg-blue-500";
      case "Pendente":
        return "bg-yellow-600 hover:bg-yellow-500";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="bg-teal-600 rounded-lg shadow-md p-4 text-white hover:shadow-xl transition-shadow cursor-pointer">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-white rounded-full mr-3 flex-shrink-0"></div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-extrabold truncate">{petName}</h3>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ml-2 
                ${getStatusColor(status)}`}
            >
              {status}
            </span>
          </div>
          <p className="text-sm text-teal-100">{tutorName}</p>
        </div>
      </div>
      <div className="flex items-center text-sm text-teal-100 mt-2 border-t border-teal-500 pt-2">
        <div className="mr-4">
          <p className="font-semibold text-xs">
            {date} às {time}
          </p>
        </div>
        <div>
          <p className="text-xs">{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentItem;
