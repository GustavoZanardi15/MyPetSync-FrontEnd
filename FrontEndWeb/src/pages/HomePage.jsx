import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import DashboardStats from "../components/home/DashboardStats";

const HomePage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="p-8 bg-gray-100 flex-grow"></main>
        <DashboardStats />
      </div>
    </div>
  );
};

export default HomePage;
