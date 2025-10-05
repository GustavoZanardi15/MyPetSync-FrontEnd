import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import DashboardStats from "../components/home/DashboardStats";
import WelcomeBanner from "../components/home/WelcomeBanner";
import NextAppointments from "../components/home/NextAppointments";

const HomePage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="px-8 pt-4 pb-8 bg-gray-100 flex-grow">
          <WelcomeBanner />
          <DashboardStats />
          <NextAppointments />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
