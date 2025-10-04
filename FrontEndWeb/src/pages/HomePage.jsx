import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import DashboardStats from "../components/home/DashboardStats";
import WelcomeBanner from "../components/home/WelcomeBanner";

const HomePage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="px-8 pt-4 pb-8 bg-gray-100 flex-grow">
          <WelcomeBanner />
          <DashboardStats />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
