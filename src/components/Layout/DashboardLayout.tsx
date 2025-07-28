
import React from 'react';
import Sidebar from './Sidebar';
import '../../styles/DashboardLayout.css';
interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'user' | 'facility' | 'admin';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-content">
        <Sidebar role={role} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;