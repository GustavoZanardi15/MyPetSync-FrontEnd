import React, { useState, useEffect } from "react";
import DashboardStats from "../components/home/DashboardStats";
import WelcomeBanner from "../components/home/WelcomeBanner";
import NextAppointments from "../components/home/NextAppointments";
import HomeSidePanel from "../components/home/HomeSidePanel";
import { useAuth } from "../context/AuthContext";
import * as providerService from "../services/providerService";
import {
  fetchDashboardStats,
  fetchRecentActivities,
} from "../services/dashboardService";
import { FiCheckCircle, FiUsers, FiStar } from "react-icons/fi";
import { VscStarFull } from "react-icons/vsc";

const IconComponents = {
  FiCheckCircle: FiCheckCircle,
  FiUsers: FiUsers,
  FiStar: FiStar,
  VscStarFull: VscStarFull,
};

const formatRating = (rating) => {
  return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
};

const HomePage = () => {
  const { isLoggedIn, user, refreshKey } = useAuth();

  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const provider = await providerService.fetchProviderProfile();
        const providerId = provider.id || provider._id;

        if (!providerId) {
          throw new Error("ID do Prestador não encontrado no perfil.");
        }

        const [statsData] = await Promise.all([fetchDashboardStats()]);
        const recentActivitiesData = [];

        const appointments = statsData.appointments || {
          total: 0,
          confirmed: 0,
        };
        const reviews = statsData.reviews || { average: 0, count: 0 };
        const clients = statsData.clients || 0;

        const activitiesToMap =
          recentActivitiesData && Array.isArray(recentActivitiesData)
            ? recentActivitiesData
            : [];

        const mappedActivities = activitiesToMap
          .map((activity) => ({
            id: activity._id,
            type: "Avaliação Recebida",
            detail: `${formatRating(activity.rating)} por ${
              activity.author?.name || activity.pet?.nome || "Cliente"
            }`,
            iconName: "VscStarFull",
            color: "bg-yellow-500",
          }))
          .map((activity) => ({
            ...activity,
            icon: IconComponents[activity.iconName],
          }));

        const mappedStats = [
          {
            id: 1,
            title: "Agendamentos de Hoje",
            value: String(appointments.total),
            subText: `${appointments.confirmed} confirmados`,
            iconName: "FiCheckCircle",
          },
          {
            id: 2,
            title: "Total de Clientes",
            value: String(clients),
            subText: "Atualizado agora",
            iconName: "FiUsers",
          },
          {
            id: 3,
            title: "Avaliação Média",
            value: reviews.average ? reviews.average.toFixed(1) : "0.0",
            subText: `${reviews.count} avaliações`,
            iconName: "FiStar",
          },
        ].map((stat) => ({
          ...stat,
          icon: IconComponents[stat.iconName],
        }));

        setStats(mappedStats);
        setActivities(mappedActivities);
      } catch (err) {
        console.error("ERRO DE PROCESSAMENTO DE DASHBOARD: ", err);
        setError(err.message || "Falha ao processar dados.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn && user && user.userId) {
      loadDashboardData();
    }
  }, [isLoggedIn, user, refreshKey]);

  return (
    <div className="px-8 pt-4 pb-8">
      <WelcomeBanner />
      {isLoading && (
        <p className="text-center text-gray-500 py-8">
          Carregando estatísticas...
        </p>
      )}
      {error && <p className="text-center text-red-600 py-8">Erro: {error}</p>}

      {!isLoading && !error && stats && <DashboardStats stats={stats} />}

      <div className="flex gap-8 mt-8">
        <div className="flex-grow">{isLoggedIn && <NextAppointments />}</div>
        <div className="w-80">
          <HomeSidePanel />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
