import DashboardStats from "../components/home/DashboardStats";
import WelcomeBanner from "../components/home/WelcomeBanner";
import NextAppointments from "../components/home/NextAppointments";
import HomeSidePanel from "../components/home/HomeSidePanel";

const HomePage = () => {
  return (
    <div className="px-8 pt-4 pb-8">
      <WelcomeBanner />
      <DashboardStats />
      <div className="flex gap-8 mt-8">
        <div className="flex-grow">
          <NextAppointments />
        </div>
        <div className="w-80">
          <HomeSidePanel />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
