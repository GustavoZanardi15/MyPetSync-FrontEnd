import { VscCheck, VscStarFull } from "react-icons/vsc";

const activitiesData = [
  {
    id: 1,
    type: "Agendamento Confirmado",
    detail: "Rex - 25/08 às 14:00",
    icon: VscCheck,
    color: "bg-green-600",
  },
  {
    id: 2,
    type: "Avaliação Recebida",
    detail: "★★★★★ por João Santos",
    icon: VscStarFull,
    color: "bg-yellow-500",
  },
];
const RecentActivities = () => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        Atividades Recentes
      </h3>

      <div className="space-y-4">
        {activitiesData.map((activity) => (
          <div
            key={activity.id}
            className="p-3 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div
                className={`p-1 rounded-full text-white mr-3 ${activity.color}`}
              >
                <activity.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {activity.type}
                </p>
                <p className="text-xs text-gray-500">{activity.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
