import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

const HomePage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="p-8 bg-gray-100 flex-grow"></main>
      </div>
    </div>
  );
};

export default HomePage;
