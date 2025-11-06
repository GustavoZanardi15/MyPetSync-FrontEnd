import { VscCheck, VscStarFull } from "react-icons/vsc";
import { useMemo } from "react";

const IconComponents = {
    VscCheck: VscCheck,
    VscStarFull: VscStarFull,
};

const RecentActivities = ({ activitiesData }) => {
    
    const mappedActivities = useMemo(() => {
        if (!activitiesData) return [];
        return activitiesData.map(activity => ({
            ...activity,
            icon: IconComponents[activity.iconName || 'VscStarFull'] 
        }));
    }, [activitiesData]);

    return (
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
                Atividades Recentes
            </h3>

            <div className="space-y-4">
                {mappedActivities.length === 0 && (
                    <p className="text-center text-gray-500 text-sm py-4">
                        Nenhuma atividade recente encontrada.
                    </p>
                )}
                {mappedActivities.map((activity) => (
                    <div
                        key={activity.id}
                        className="p-3 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center">
                            <div
                                className={`p-1 rounded-full text-white mr-3 ${activity.color}`}
                            >
                                {activity.icon && <activity.icon className="w-4 h-4" />}
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