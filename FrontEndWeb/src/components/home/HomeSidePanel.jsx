import QuickActions from "./QuickActions";
import RecentActivities from "./RecentActivities";

const HomeSidePanel = ({ activities }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200 sticky top-4">
      <QuickActions />
      <div className="border-t border-gray-200 my-6"></div>
      <RecentActivities activitiesData={activities} />
    </div>
  );
};

export default HomeSidePanel;
