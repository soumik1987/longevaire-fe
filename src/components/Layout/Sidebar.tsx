import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, CreditCard, Settings, LogOut, Home, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Sidebar.css';
interface SidebarProps {
  role: 'user' | 'facility' | 'admin';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  // Common menu items for all roles
  const commonMenuItems = [
    { 
      icon: User, 
      label: 'Personal Information', 
      path: `/dashboard/${role}/personal-info`,
      active: location.pathname.includes('personal-info')
    },
    { 
      icon: CreditCard, 
      label: 'Payment Methods', 
      path: `/dashboard/${role}/payment`,
      active: location.pathname.includes('payment')
    },
    { 
      icon: Settings, 
      label: 'Preferences', 
      path: `/dashboard/${role}/preferences`,
      active: location.pathname.includes('preferences')
    }
  ];

  // Role-specific menu items
  const roleSpecificItems = {
    user: [
      { 
        icon: Home, 
        label: 'Services', 
        path: '/dashboard/user/services',
        active: location.pathname.includes('/user/services')
      }
    ],
    facility: [
      { 
        icon: Home, 
        label: 'Facility Services', 
        path: '/dashboard/facility/services',
        active: location.pathname.includes('/facility/services')
      }
    ],
    admin: [
      { 
        icon: Shield, 
        label: 'Admin Panel', 
        path: '/dashboard/admin/panel',
        active: location.pathname.includes('/admin/panel')
       }
      // { 
      //   icon: Users, 
      //   label: 'User Management', 
      //   path: '/dashboard/admin/users',
      //   active: location.pathname.includes('/admin/users')
      // }
    ]
  };

  const menuItems = [...commonMenuItems, ...roleSpecificItems[role]];

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>{role === 'admin' ? 'Admin Dashboard' : 'My Account'}</h2>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.path}
              className={`sidebar-item ${item.active ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <IconComponent size={20} className="sidebar-icon" />
              <span>{item.label}</span>
              <span className="sidebar-arrow">›</span>
            </button>
          );
        })}
        
        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={20} className="sidebar-icon" />
          <span>LOG OUT</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;