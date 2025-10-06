import { BsCashCoin } from "react-icons/bs";
import { FiCheckCircle, FiUsers, FiStar } from "react-icons/fi";

const statsData = [
  {
    id: 1,
    title: "Agendamentos de Hoje",
    value: "3",
    subText: "2 confirmados",
    icon: FiCheckCircle,
    iconColor: "text-green-600",
  },
  {
    id: 2,
    title: "Total de Clientes",
    value: "156",
    subText: "+15 do mês passado",
    icon: FiUsers,
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    title: "Faturamento do Mês",
    value: "R$ 4.560",
    subText: "+8% do mês passado",
    icon: BsCashCoin,
    iconColor: "text-indigo-600",
  },
  {
    id: 4,
    title: "Avaliação Média",
    value: "4.9",
    subText: "89 avaliações",
    icon: FiStar,
    iconColor: "text-yellow-600",
  },
];

const StatCard = ({ title, value, subText, icon: Icon, iconColor }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between border border-gray-100">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-extrabold text-gray-900 mt-1">{value}</p>
        <p className={`text-xs mt-1 font-semibold ${iconColor}`}>{subText}</p>
      </div>
      <div className={`p-3 rounded-full ${iconColor} bg-opacity-10`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
    </div>
  );
};

const DashboardStats = () => {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;
