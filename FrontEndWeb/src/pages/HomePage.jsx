import React, { useState, useEffect } from "react";
import DashboardStats from "../components/home/DashboardStats";
import WelcomeBanner from "../components/home/WelcomeBanner";
import NextAppointments from "../components/home/NextAppointments";
import HomeSidePanel from "../components/home/HomeSidePanel";
import { useAuth } from "../context/AuthContext";
import * as providerService from "../services/providerService";
import { fetchDashboardStats, fetchRecentActivities } from "../services/dashboardService";

const formatRating = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
};

const HomePage = () => {
    const { isLoggedIn, user } = useAuth(); 
    
    const [stats, setStats] = useState(null);
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const loadDashboardData = async () => {
            if (!user || !user.userId) return;
            try {
                setIsLoading(true);
                setError(null);

                const provider = await providerService.fetchProviderProfile(user.userId);
                const providerId = provider._id;

                if (!providerId) {
                    throw new Error("Perfil de Prestador não encontrado.");
                }

                const [statsData, recentActivitiesData] = await Promise.all([
                    fetchDashboardStats(providerId),
                    fetchRecentActivities(providerId)
                ]);
                
                const mappedActivities = recentActivitiesData.map(activity => ({
                    id: activity._id,
                    type: "Avaliação Recebida",
                    detail: `${formatRating(activity.rating)} por ${activity.author?.name || 'Cliente'}`,
                    iconName: 'VscStarFull', 
                    color: "bg-yellow-500",
                }));

                const mappedStats = [
                    {
                        id: 1,
                        title: "Agendamentos de Hoje",
                        value: statsData.appointments.total.toString(), 
                        subText: `${statsData.appointments.confirmed} confirmados`,
                        iconName: 'FiCheckCircle',
                        iconColor: "text-green-600",
                    },
                    {
                        id: 2,
                        title: "Total de Clientes",
                        value: statsData.clients.toString(), 
                        subText: "Atualizado agora", 
                        iconName: 'FiUsers',
                        iconColor: "text-blue-600",
                    },
                    {
                        id: 3,
                        title: "Faturamento do Mês",
                        value: "R$ 4.560", 
                        subText: "+8% do mês passado", 
                        iconName: 'BsCashCoin',
                        iconColor: "text-indigo-600",
                    },
                    {
                        id: 4,
                        title: "Avaliação Média",
                        value: statsData.reviews.average.toFixed(1),
                        subText: `${statsData.reviews.count} avaliações`,
                        iconName: 'FiStar',
                        iconColor: "text-yellow-600",
                    },
                ];

                setStats(mappedStats);
                setActivities(mappedActivities);
            } catch (err) {
                console.error("Falha ao carregar dados do painel:", err);
                setError(err.message || "Erro ao carregar dados do painel.");
            } finally {
                setIsLoading(false);
            }
        };

        if (isLoggedIn && user && user.userId) {
            loadDashboardData();
        }
    }, [isLoggedIn, user]);


    return (
        <div className="px-8 pt-4 pb-8">
            <WelcomeBanner />
            {isLoading && <p className="text-center text-gray-500 py-8">Carregando estatísticas...</p>}
            {error && <p className="text-center text-red-600 py-8">Erro: {error}</p>}
            
            {!isLoading && !error && stats && (
                <DashboardStats statsData={stats} />
            )}

            <div className="flex gap-8 mt-8">
                <div className="flex-grow">
                    {isLoggedIn && <NextAppointments />}
                    
                    {!isLoading && !error && (
                        <div className="mt-8">
                            <RecentActivities activitiesData={activities} />
                        </div>
                    )}
                </div>
                <div className="w-80">
                    <HomeSidePanel />
                </div>
            </div>
        </div>
    );
};

export default HomePage;