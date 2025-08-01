
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
// import HeroSection from './components/HeroSection';
import ChatBarSection from './components/ChatBarSection';
import ChatboxPage from './components/ChatBoxPage';
// import LongevityGrid from './components/LongevityGrid';
import Slideshow from './components/Slideshow';
// import ExpertiseSection from './components/ExpertiseSection';
// import FAQSection from './components/FAQSection';
import WellnessInsightSection from './components/WellnessInsightSection';
import PricingSection from './components/PricingSection';
import LuxuryRetreats from './components/LuxuryRetreats';
import Footer from './components/Footer';
import ImmersiveScrollSection from './components/ImmersiveScrollingSection';
import PricingPage from './components/PricingPage';

import AboutPage from './pages/AboutPage';


// Public Pages
import ExplorePage from './pages/ExplorePage';
import ProgramListPage from './pages/ProgramListsPage';
import ProgramDetailsPage from './pages/ProgramDetailsPage';

// Dashboard Components
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
import HomeProgramPage from './components/HomeProgramPage';
import ProgramsSection from './components/ProgramsSection';


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
      <Slideshow />
      <ChatBarSection />
      <HomeProgramPage/>
      <ProgramsSection/>
      <WellnessInsightSection />
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
      { path: 'about', element: <AboutPage /> },
      { 
        path: '/chat',
        element: <ChatboxPage />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const searchParams = new URLSearchParams(url.search);
          const message = searchParams.get('message');
          return { initialMessage: message || "I'd like to learn about wellness programs" };
        }
      },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'programs', element: <ProgramListPage /> },
      { path: 'program-details', element: <ProgramDetailsPage /> },
       {
  path: 'pricing',
  element: <PricingPage />
},
      // User Dashboard Routes
      {
        path: 'dashboard/user',
        element: (
          <ProtectedRoute allowedRoles={['user']}>
            <Outlet />
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
            <Outlet />
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
            <Outlet />
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