import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, CreditCard, Settings, LogOut, Home, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Sidebar.css';

interface SidebarProps {
  role: 'user' | 'facility' | 'admin';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [isLeftSide, setIsLeftSide] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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
    ]
  };

  const menuItems = [...commonMenuItems, ...roleSpecificItems[role]];

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebarPosition = () => {
    setIsLeftSide(!isLeftSide);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth <= 768) {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && 
            toggleRef.current && !toggleRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Toggle button */}
      <button 
        ref={toggleRef}
        className={`sidebar-toggle ${isLeftSide ? 'left' : 'right'} ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      >
        {isLeftSide ? (
          isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />
        ) : (
          isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />
        )}
      </button>

      {/* Position toggle button (only visible when sidebar is open) */}
      {isOpen && (
        <button 
          className="sidebar-position-toggle"
          onClick={toggleSidebarPosition}
        >
          {isLeftSide ? '→' : '←'}
        </button>
      )}

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`sidebar ${isOpen ? 'open' : ''} ${isLeftSide ? 'left' : 'right'}`}
      >
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
    </>
  );
};

export default Sidebar;