
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
  Navigate
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Global Layout Components
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import LongevityGrid from './components/LongevityGrid';
import ElevateSection from './components/ElevateSection';
import Slideshow from './components/Slideshow';
import ExpertiseSection from './components/ExpertiseSection';
import FAQSection from './components/FAQSection';
import WellnessInsightsSection from './components/WellnessInsightSection';
import PricingSection from './components/PricingSection';
import LuxuryRetreats from './components/LuxuryRetreats';
import Footer from './components/Footer';
import ImmersiveScrollSection from './components/ImmersiveScrollingSection';

// Public Pages
import ExplorePage from './pages/ExplorePage';
import ProgramListPage from './pages/ProgramListsPage';
import ProgramDetailsPage from './pages/ProgramDetailsPage';

// Dashboard Components
// import DashboardLayout from './components/Layout/DashboardLayout';
import UserDashboard from './pages/dashboard/User/UserDashboard';
import UserServices from './pages/dashboard/User/UserServices';
import FacilityServices from './pages/dashboard/Facility/FacilityServices';
import ServiceForm from './pages/dashboard/Facility/ServiceForm';
import UserServiceForm from './pages/dashboard/User/UserServiceForm';
import AdminPanel from './pages/dashboard/Admin/AdminPanel';
import PersonalInfo from './pages/dashboard/Shared/PersonalInfo';
import Payment from './pages/dashboard/Shared/Payment';
import Preferences from './pages/dashboard/Shared/Preferences';

// Styles
import './styles/App.css';
import './styles/global.css';
import './styles/FacilityServices.css';
import './styles/ServiceForm.css';

// Protected Route Component with Role Checking
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode;
  allowedRoles?: ('user' | 'facility' | 'admin')[];
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// HomePage layout
const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ElevateSection />
      <LongevityGrid />
      <Slideshow />
      <ExpertiseSection />
      <FAQSection />
      <WellnessInsightsSection />
      <ImmersiveScrollSection />
      <PricingSection />
      <LuxuryRetreats />
    </>
  );
};

// Main layout
const Layout = () => {
  return (
    <div className="App min-h-screen bg-white">
      <Navigation />
      <ScrollRestoration />
      <div className="page-content-smooth">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

// App Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'programs', element: <ProgramListPage /> },
      { path: 'program-details', element: <ProgramDetailsPage /> },

      // User Dashboard Routes
      {
        path: 'dashboard/user',
        element: (
          <ProtectedRoute allowedRoles={['user']}>
            {/* <DashboardLayout role="user"> */}
              <Outlet />
            {/* </DashboardLayout> */}
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <UserDashboard /> },
          { path: 'services', element: <UserServices /> },
          { path: 'services/new', element: <UserServiceForm /> },
          { path: 'services/edit/:id', element: <UserServiceForm /> },
          { path: 'personal-info', element: <PersonalInfo role="user" /> },
          { path: 'payment', element: <Payment role="user" /> },
          { path: 'preferences', element: <Preferences role="user" /> }
        ]
      },

      // Facility Dashboard Routes
      {
        path: 'dashboard/facility',
        element: (
          <ProtectedRoute allowedRoles={['facility']}>
            {/* <DashboardLayout role="facility"> */}
              <Outlet />
            {/* </DashboardLayout> */}
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <FacilityServices /> },
          { path: 'services/new', element: <ServiceForm /> },
          { path: 'services/edit/:id', element: <ServiceForm /> },
          { path: 'personal-info', element: <PersonalInfo role="facility" /> },
          { path: 'payment', element: <Payment role="facility" /> },
          { path: 'preferences', element: <Preferences role="facility" /> }
        ]
      },

      // Admin Dashboard Routes
      {
        path: 'dashboard/admin',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            {/* <DashboardLayout role="admin"> */}
              <Outlet />
            {/* </DashboardLayout> */}
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminPanel /> },
          { path: 'personal-info', element: <PersonalInfo role="admin" /> },
          { path: 'payment', element: <Payment role="admin" /> },
          { path: 'preferences', element: <Preferences role="admin" /> }
        ]
      },

      // Fallback route
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]);

// Final App Component
const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;