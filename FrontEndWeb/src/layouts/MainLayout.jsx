import React from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow">
            {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;