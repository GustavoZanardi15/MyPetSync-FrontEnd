import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-y-auto overflow-x-hidden">
        <Header />
        <main className="flex-grow w-full">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
