import { BsCashCoin } from "react-icons/bs";
import { FiCheckCircle, FiUsers, FiStar } from "react-icons/fi";
import { useMemo } from "react";

const IconComponents = {
    BsCashCoin: BsCashCoin,
    FiCheckCircle: FiCheckCircle,
    FiUsers: FiUsers,
    FiStar: FiStar,
};

const StatCard = ({ title, value, subText, icon: Icon, iconColor }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between border border-gray-100">
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">{value}</p>
                <p className={`text-xs mt-1 font-semibold ${iconColor}`}>{subText}</p>
            </div>
            <div className={`p-3 rounded-full ${iconColor} bg-opacity-10`}>
                {Icon && <Icon className={`w-8 h-8 ${iconColor}`} />}
            </div>
        </div>
    );
};

const DashboardStats = ({ statsData }) => {
    if (!statsData || statsData.length === 0) return null;

    const mappedStats = useMemo(() => {
        return statsData.map(stat => ({
            ...stat,
            icon: IconComponents[stat.iconName]
        }));
    }, [statsData]);

    return (
        <section className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mappedStats.map((stat) => (
                    <StatCard key={stat.id} {...stat} />
                ))}
            </div>
        </section>
    );
};

export default DashboardStats;