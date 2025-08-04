import React from 'react';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import { useAuth } from '../../../contexts/AuthContext';
import UserServices from './UserServices';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout role="user">
      <div className="user-dashboard">
        <h1>Welcome, {user?.firstName}!</h1>
        <p>Explore wellness services and manage your account</p>
      </div>
      <UserServices/>
    </DashboardLayout>
  );
};

export default UserDashboard;