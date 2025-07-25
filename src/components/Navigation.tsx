import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronDown, Menu, X, User, LogOut, Building, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';
import ContactModal from './ContactModal';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './Auth/AuthModal';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close mobile menu when clicking outside
      if (isMobileMenuOpen) {
        const navCenter = document.querySelector('.nav-center');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (
          navCenter && 
          mobileToggle &&
          !navCenter.contains(event.target as Node) && 
          !mobileToggle.contains(event.target as Node)
        ) {
          setIsMobileMenuOpen(false);
          setActiveDropdown(null);
        }
      }
      
      // Close general dropdowns when clicking outside
      if (activeDropdown) {
        const dropdown = document.querySelector(`.dropdown-content.${activeDropdown}-dropdown`);
        const trigger = document.querySelector(`[data-dropdown="${activeDropdown}"]`);
        
        if (
          dropdown && 
          trigger &&
          !dropdown.contains(event.target as Node) && 
          !trigger.contains(event.target as Node)
        ) {
          setActiveDropdown(null);
        }
      }

      // Close profile dropdown when clicking outside
      if (
        showProfileDropdown && 
        profileDropdownRef.current && 
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen, activeDropdown, showProfileDropdown]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setActiveDropdown(null);
      setShowProfileDropdown(false);
    }
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
    navigate('/');
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
    document.body.style.overflow = 'auto';
  };

  const navigateToDashboard = (path: string) => {
    navigate(path);
    setShowProfileDropdown(false);
    setIsMobileMenuOpen(false);
  };

  const getInitials = () => {
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  // Get dashboard path based on user role
  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'user': return '/dashboard/user';
      case 'facility': return '/dashboard/facility';
      case 'admin': return '/dashboard/admin';
      default: return '/';
    }
  };

  // Get dashboard label based on user role
  const getDashboardLabel = () => {
    if (!user) return 'Dashboard';
    switch (user.role) {
      case 'user': return 'User Dashboard';
      case 'facility': return 'Facility Dashboard';
      case 'admin': return 'Admin Panel';
      default: return 'Dashboard';
    }
  };

  // Get dashboard icon based on user role
  const getDashboardIcon = () => {
    if (!user) return <User size={16} />;
    switch (user.role) {
      case 'user': return <User size={16} />;
      case 'facility': return <Building size={16} />;
      case 'admin': return <Shield size={16} />;
      default: return <User size={16} />;
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="logo">
            <Star size={24} fill="currentColor" />
          </Link>
          <span className="welcome-text">
            Welcome to your journey of rejuvenation
          </span>
        </div>

        <div className={`nav-center ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-item dropdown">
            <button
              className="dropdown-trigger"
              onClick={() => handleDropdownToggle('discover')}
              data-dropdown="discover"
              aria-expanded={activeDropdown === 'discover'}
            >
              Discover 
              <ChevronDown size={16} className={`dropdown-arrow ${activeDropdown === 'discover' ? 'rotated' : ''}`} />
            </button>
            <div className={`dropdown-content discover-dropdown ${activeDropdown === 'discover' ? 'active' : ''}`}>
              <div className="dropdown-header">
                <h3>Clinic Access</h3>
                <p>Connect with top clinics worldwide</p>
              </div>
              <div className="dropdown-grid">
                <div className="dropdown-section">
                  <h4>LONGEVITY PROGRAMS</h4>
                  <a href="#wellness-retreats">
                    <div>
                      <strong>Wellness Retreats</strong>
                      <p>Indulge in luxury spa escapes</p>
                    </div>
                  </a>
                  <a href="#medical-concierge">
                    <div>
                      <strong>Medical Concierge</strong>
                      <p>Tailored health plans just for you</p>
                    </div>
                  </a>
                </div>
                
                <div className="dropdown-section">
                  <h4>EXPERT GUIDANCE</h4>
                  <a href="#consulting">
                    <div>
                      <strong>Consulting</strong>
                      <p>Get strategic health advice</p>
                    </div>
                  </a>
                </div>
                
                <div className="dropdown-section">
                  <h4>PARTNERSHIPS</h4>
                  <p className="partnerships-text">Collaborate with global leaders</p>
                  
                  <div className="membership-section">
                    <h5>MEMBERSHIP</h5>
                    <div className="membership-item">
                      <div className="membership-bullet"></div>
                      <div>
                        <strong>Elite Access</strong>
                        <p>Enjoy priority support</p>
                      </div>
                    </div>
                    <div className="membership-item">
                      <div className="membership-bullet"></div>
                      <div>
                        <strong>Events</strong>
                        <p>Join global conferences</p>
                      </div>
                    </div>
                    <div className="membership-item">
                      <div className="membership-bullet"></div>
                      <div>
                        <strong>Resources</strong>
                        <p>Access curated content</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="dropdown-footer">
                <p>Elevate your longevity journey</p>
                <p className="footer-subtext">Tailored solutions for optimal health</p>
                <button className="dropdown-button">Learn more</button>
              </div>
            </div>
          </div>
          
          <a href="#about" className="nav-item">About</a>
          <a href="#insights" className="nav-item">Insights</a>
          
          <div className="nav-item dropdown">
            <button
              className="dropdown-trigger"
              onClick={() => handleDropdownToggle('support')}
              data-dropdown="support"
              aria-expanded={activeDropdown === 'support'}
            >
              Support 
              <ChevronDown size={16} className={`dropdown-arrow ${activeDropdown === 'support' ? 'rotated' : ''}`} />
            </button>
            <div className={`dropdown-content support-dropdown ${activeDropdown === 'support' ? 'active' : ''}`}>
              <a href="#faq">FAQ</a>
              <a href="#help">Help Center</a>
              <button 
                className="contact-us-item" 
                onClick={() => {
                  setActiveDropdown(null);
                  setShowContactModal(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        <div className="nav-right">
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {!isAuthenticated ? (
            <button 
              className="auth-button primary" 
              onClick={handleSignIn}
            >
              SIGN IN
            </button>
          ) : (
            <div className="profile-dropdown-container" ref={profileDropdownRef}>
              <button 
                className="profile-button"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                aria-expanded={showProfileDropdown}
              >
                <div className="profile-avatar">
                  {getInitials()}
                </div>
                {!isMobileMenuOpen && (
                  <span className="profile-name">{user?.firstName} {user?.lastName}</span>
                )}
                <ChevronDown size={16} className={`dropdown-arrow ${showProfileDropdown ? 'rotated' : ''}`} />
              </button>
              
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-user-info">
                    <div className="dropdown-name">{user?.firstName} {user?.lastName}</div>
                    <div className="dropdown-email">{user?.email}</div>
                    <div className="dropdown-role">{user?.role?.toUpperCase()}</div>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button 
                    className="dropdown-item"
                    onClick={() => navigateToDashboard(getDashboardPath())}
                  >
                    {getDashboardIcon()}
                    <span>{getDashboardLabel()}</span>
                  </button>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="auth-modal-overlay">
          <div className="auth-modal-wrapper">
            <AuthModal
              mode={authMode}
              onClose={handleCloseAuthModal}
              onSwitchMode={(mode) => setAuthMode(mode)}
            />
          </div>
        </div>
      )}

      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </nav>
  );
};

export default Navigation;