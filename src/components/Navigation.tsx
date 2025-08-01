// import React, { useState, useEffect, useRef } from 'react';
// import { Menu, X, User, LogOut, Building, Shield } from 'lucide-react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import '../styles/Navigation.css';
// import ContactModal from './ContactModal';
// import { useAuth } from '../contexts/AuthContext';
// import AuthModal from './Auth/AuthModal';
// import premiyaLogo from '../assets/premiya_logo.jpg';

// const Navigation: React.FC = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showContactModal, setShowContactModal] = useState(false);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
//   const location = useLocation();

//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();
//   const profileDropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (isMobileMenuOpen) {
//         const mobileSidebar = document.querySelector('.mobile-sidebar');
//         const mobileToggle = document.querySelector('.mobile-menu-toggle');

//         if (
//           mobileSidebar &&
//           mobileToggle &&
//           !mobileSidebar.contains(event.target as Node) &&
//           !mobileToggle.contains(event.target as Node)
//         ) {
//           setIsMobileMenuOpen(false);
//         }
//       }

//       if (
//         showProfileDropdown &&
//         profileDropdownRef.current &&
//         !profileDropdownRef.current.contains(event.target as Node)
//       ) {
//         setShowProfileDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isMobileMenuOpen, showProfileDropdown]);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     if (!isMobileMenuOpen) {
//       setShowProfileDropdown(false);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     setShowProfileDropdown(false);
//     navigate('/');
//   };

//   const handleSignIn = () => {
//     setAuthMode('signin');
//     setShowAuthModal(true);
//     setIsMobileMenuOpen(false);
//     document.body.style.overflow = 'hidden';
//   };

//   const handleCloseAuthModal = () => {
//     setShowAuthModal(false);
//     document.body.style.overflow = 'auto';
//   };

//   const navigateToDashboard = (path: string) => {
//     navigate(path);
//     setShowProfileDropdown(false);
//     setIsMobileMenuOpen(false);
//   };

//   const getInitials = () => {
//     if (!user) return '';
//     return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
//   };

//   const getDashboardPath = () => {
//     if (!user) return '/';
//     switch (user.role) {
//       case 'user': return '/dashboard/user';
//       case 'facility': return '/dashboard/facility';
//       case 'admin': return '/dashboard/admin';
//       default: return '/';
//     }
//   };

//   const getDashboardLabel = () => {
//     if (!user) return 'Dashboard';
//     switch (user.role) {
//       case 'user': return 'User Dashboard';
//       case 'facility': return 'Facility Dashboard';
//       case 'admin': return 'Admin Panel';
//       default: return 'Dashboard';
//     }
//   };

//   const getDashboardIcon = () => {
//     if (!user) return <User size={16} />;
//     switch (user.role) {
//       case 'user': return <User size={16} />;
//       case 'facility': return <Building size={16} />;
//       case 'admin': return <Shield size={16} />;
//       default: return <User size={16} />;
//     }
//   };

//   const isHomeActive = location.pathname === '/';
//   const isDestinationsActive = location.pathname === '/explore' &&
//     location.state?.initialTab === 'destinations';
//   const isProgramsActive = location.pathname === '/explore' &&
//     (!location.state?.initialTab || location.state?.initialTab === 'programs');
//   const isAboutActive = location.pathname === '/about';
//   const isSubscriptionActive = location.pathname === '/pricing';
//   const isBlogsActive = location.pathname === '/blogs';

//   const handleDestinationsClick = (_e: React.MouseEvent) => {
//     navigate('/explore', {
//       state: { initialTab: 'destinations', forceReload: true },
//       replace: false
//     });
//     setIsMobileMenuOpen(false);
//   };

//   const handleProgramsClick = (_e: React.MouseEvent) => {
//     navigate('/explore', {
//       state: { initialTab: 'programs', forceReload: true },
//       replace: false
//     });
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <>
//       <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
//         <div className="nav-container">
//           <div className="nav-left">
//             <Link to="/" className="logo">
//               <img src={premiyaLogo} alt="Premiya Beyond Wellness" className="logo-image" />
//             </Link>
//           </div>

//           {/* Desktop Navigation Center */}
//           <div className="nav-center">
//             <Link
//               to="/"
//               className={`nav-item ${isHomeActive ? 'active' : ''}`}
//             >
//               Home
//             </Link>

//              <Link
//               to="/explore"
//               className={`nav-item ${isProgramsActive ? 'active' : ''}`}
//               onClick={handleProgramsClick}
//               state={{ initialTab: 'programs', forceReload: true }}
//             >
//               Wellness Programs
//             </Link>

//             <Link
//               to="/explore"
//               className={`nav-item ${isDestinationsActive ? 'active' : ''}`}
//               onClick={handleDestinationsClick}
//               state={{ initialTab: 'destinations', forceReload: true }}
//             >
//               Destinations
//             </Link>

//             <Link
//               to="/about"
//               className={`nav-item ${isAboutActive ? 'active' : ''}`}
//             >
//               About
//             </Link>

//             <Link
//               to="/pricing"
//               className={`nav-item ${isSubscriptionActive ? 'active' : ''}`}
//             >
//               Subscription
//             </Link>

//             <a href="https://longenomics.substack.com/" target="_blank" rel="noopener noreferrer" className={`nav-item ${isBlogsActive ? 'active' : ''}`}>
//             Blogs
//             </a>

//           </div>

//           <div className="nav-right">
//             {/* Desktop Auth/Profile Section */}
//             <div className="desktop-auth-section">
//               {!isAuthenticated ? (
//                 <button className="desktop-join-btn" onClick={handleSignIn}>
//                   JOIN NOW
//                 </button>
//               ) : (
//                 <div className="profile-dropdown-container" ref={profileDropdownRef}>
//                   <button
//                     className="profile-button"
//                     onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//                     aria-expanded={showProfileDropdown}
//                   >
//                     <div className="profile-avatar">{getInitials()}</div>
//                   </button>

//                   {showProfileDropdown && (
//                     <div className="profile-dropdown">
//                       <div className="dropdown-user-info">
//                         <div className="dropdown-name">{user?.firstName} {user?.lastName}</div>
//                         <div className="dropdown-email">{user?.email}</div>
//                         <div className="dropdown-role">{user?.role?.toUpperCase()}</div>
//                       </div>
//                       <div className="dropdown-divider"></div>
//                       <button className="dropdown-item" onClick={() => navigateToDashboard(getDashboardPath())}>
//                         {getDashboardIcon()}
//                         <span>{getDashboardLabel()}</span>
//                       </button>
//                       <div className="dropdown-divider"></div>
//                       <button className="dropdown-item logout-item" onClick={handleLogout}>
//                         <LogOut size={16} />
//                         <span>Logout</span>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Mobile Profile and Menu Section */}
//             <div className="mobile-nav-section">
//               {/* Mobile Profile (only shown when authenticated) */}
//               {/* {isAuthenticated && (
//                 <div className="mobile-profile-button">
//                   <div className="profile-avatar">{getInitials()}</div>
//                 </div>
//               )} */}
              
//               {/* Mobile Menu Toggle */}
//               <button
//                 className="mobile-menu-toggle"
//                 onClick={toggleMobileMenu}
//                 aria-label="Toggle menu"
//               >
//                 {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Sidebar */}
//           <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
//             <div className="sidebar-content">
//               {isAuthenticated && (
//                 <div className="mobile-profile-info">
//                   <div className="profile-avatar">{getInitials()}</div>
//                   <div>
//                     <div className="dropdown-name">{user?.firstName} {user?.lastName}</div>
//                     <div className="dropdown-email">{user?.email}</div>
//                   </div>
//                 </div>
//               )}

//               <div className="mobile-nav-items">
//                 <Link
//                   to="/"
//                   className={`mobile-nav-item ${isHomeActive ? 'active' : ''}`}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Home
//                 </Link>

//                 <Link
//                   to="/explore"
//                   className={`mobile-nav-item ${isProgramsActive ? 'active' : ''}`}
//                   onClick={handleProgramsClick}
//                   state={{ initialTab: 'programs', forceReload: true }}
//                 >
//                   Wellness Programs
//                 </Link>

//                 <Link
//                   to="/explore"
//                   className={`mobile-nav-item ${isDestinationsActive ? 'active' : ''}`}
//                   onClick={handleDestinationsClick}
//                   state={{ initialTab: 'destinations', forceReload: true }}
//                 >
//                   Destinations
//                 </Link>

                

//                 <Link
//                   to="/about"
//                   className={`mobile-nav-item ${isAboutActive ? 'active' : ''}`}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   About
//                 </Link>

//                 <Link
//                   to="/pricing"
//                   className={`mobile-nav-item ${isSubscriptionActive ? 'active' : ''}`}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Subscription
//                 </Link>

//                 <a href="https://longenomics.substack.com/" target="_blank" rel="noopener noreferrer" className={`mobile-nav-item ${isBlogsActive ? 'active' : ''}`}>
//                   Blogs
//                </a>

//                 {isAuthenticated && (
//                   <>
//                     <button 
//                       className="mobile-nav-item dashboard-item"
//                       onClick={() => {
//                         navigateToDashboard(getDashboardPath());
//                         setIsMobileMenuOpen(false);
//                       }}
//                     >
//                       {getDashboardIcon()}
//                       <span>{getDashboardLabel()}</span>
//                     </button>
//                     <button 
//                       className="mobile-nav-item logout-item"
//                       onClick={handleLogout}
//                     >
//                       <LogOut size={16} />
//                       <span>Logout</span>
//                     </button>
//                   </>
//                 )}
//               </div>

//               {!isAuthenticated && (
//                 <button 
//                   className="mobile-join-btn"
//                   onClick={handleSignIn}
//                 >
//                   JOIN NOW
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Backdrop for mobile sidebar */}
//       {isMobileMenuOpen && (
//         <div 
//           className="mobile-sidebar-backdrop"
//           onClick={toggleMobileMenu}
//         />
//       )}

//       {/* Keep the modals the same */}
//       {showAuthModal && (
//         <AuthModal
//           mode={authMode}
//           onClose={handleCloseAuthModal}
//           onSwitchMode={(mode) => setAuthMode(mode)}
//         />
//       )}

//       {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
//     </>
//   );
// };

// export default Navigation;



import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut, Building, Shield } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';
import ContactModal from './ContactModal';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './Auth/AuthModal';
import premiyaLogo from '../assets/premiya_logo.jpg';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const location = useLocation();

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');

        if (
          mobileSidebar &&
          mobileToggle &&
          !mobileSidebar.contains(event.target as Node) &&
          !mobileToggle.contains(event.target as Node)
        ) {
          setIsMobileMenuOpen(false);
        }
      }

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
  }, [isMobileMenuOpen, showProfileDropdown]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setShowProfileDropdown(false);
    }
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

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'user': return '/dashboard/user';
      case 'facility': return '/dashboard/facility';
      case 'admin': return '/dashboard/admin';
      default: return '/';
    }
  };

  const getDashboardLabel = () => {
    if (!user) return 'Dashboard';
    switch (user.role) {
      case 'user': return 'User Dashboard';
      case 'facility': return 'Facility Dashboard';
      case 'admin': return 'Admin Panel';
      default: return 'Dashboard';
    }
  };

  const getDashboardIcon = () => {
    if (!user) return <User size={16} />;
    switch (user.role) {
      case 'user': return <User size={16} />;
      case 'facility': return <Building size={16} />;
      case 'admin': return <Shield size={16} />;
      default: return <User size={16} />;
    }
  };

  const isHomeActive = location.pathname === '/';
  const isDestinationsActive = location.pathname === '/explore' &&
    location.state?.initialTab === 'destinations';
  const isProgramsActive = location.pathname === '/explore' &&
    (!location.state?.initialTab || location.state?.initialTab === 'programs');
  const isAboutActive = location.pathname === '/about';
  const isSubscriptionActive = location.pathname === '/pricing';
  const isBlogsActive = location.pathname === '/blogs';

  const handleDestinationsClick = (_e: React.MouseEvent) => {
    navigate('/explore', {
      state: { initialTab: 'destinations', forceReload: true },
      replace: false
    });
    setIsMobileMenuOpen(false);
  };

  const handleProgramsClick = (_e: React.MouseEvent) => {
    navigate('/explore', {
      state: { initialTab: 'programs', forceReload: true },
      replace: false
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/" className="logo">
              <img src={premiyaLogo} alt="Premiya Beyond Wellness" className="logo-image" />
            </Link>
          </div>

          {/* Desktop Navigation Center */}
          <div className="nav-center">
            <Link
              to="/"
              className={`nav-item ${isHomeActive ? 'active' : ''}`}
            >
              Home
            </Link>

            <Link
              to="/explore"
              className={`nav-item ${isProgramsActive ? 'active' : ''}`}
              onClick={handleProgramsClick}
              state={{ initialTab: 'programs', forceReload: true }}
            >
              Wellness Programs
            </Link>

            <Link
              to="/explore"
              className={`nav-item ${isDestinationsActive ? 'active' : ''}`}
              onClick={handleDestinationsClick}
              state={{ initialTab: 'destinations', forceReload: true }}
            >
              Destinations
            </Link>

            <Link
              to="/about"
              className={`nav-item ${isAboutActive ? 'active' : ''}`}
            >
              About
            </Link>

            <Link
              to="/pricing"
              className={`nav-item ${isSubscriptionActive ? 'active' : ''}`}
            >
              Subscription
            </Link>

            <a href="https://longenomics.substack.com/" target="_blank" rel="noopener noreferrer" className={`nav-item ${isBlogsActive ? 'active' : ''}`}>
              Blogs
            </a>
          </div>

          <div className="nav-right">
            {/* Desktop Auth/Profile Section */}
            <div className="desktop-auth-section">
              {!isAuthenticated ? (
                <button className="desktop-join-btn" onClick={handleSignIn}>
                  JOIN NOW
                </button>
              ) : (
                <div className="profile-dropdown-container" ref={profileDropdownRef}>
                  <button
                    className="profile-button"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    aria-expanded={showProfileDropdown}
                  >
                    <div className="profile-avatar">{getInitials()}</div>
                  </button>

                  {showProfileDropdown && (
                    <div className="profile-dropdown">
                      <div className="dropdown-user-info">
                        <div className="dropdown-name">{user?.firstName} {user?.lastName}</div>
                        <div className="dropdown-email">{user?.email}</div>
                        <div className="dropdown-role">{user?.role?.toUpperCase()}</div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item" onClick={() => navigateToDashboard(getDashboardPath())}>
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

            {/* Mobile Profile and Menu Section */}
            <div className="mobile-nav-section">
              {/* Mobile Join Now Button */}
              {!isAuthenticated && (
                <button 
                  className="desktop-join-btn"
                  onClick={handleSignIn}
                >
                  JOIN NOW
                </button>
              )}
              
              {/* Mobile Menu Toggle */}
              <button
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="sidebar-content">
              {isAuthenticated && (
                <div className="mobile-profile-info">
                  <div className="profile-avatar">{getInitials()}</div>
                  <div>
                    <div className="dropdown-name">{user?.firstName} {user?.lastName}</div>
                    <div className="dropdown-email">{user?.email}</div>
                  </div>
                </div>
              )}

              <div className="mobile-nav-items">
                <Link
                  to="/"
                  className={`mobile-nav-item ${isHomeActive ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>

                <Link
                  to="/explore"
                  className={`mobile-nav-item ${isProgramsActive ? 'active' : ''}`}
                  onClick={handleProgramsClick}
                  state={{ initialTab: 'programs', forceReload: true }}
                >
                  Wellness Programs
                </Link>

                <Link
                  to="/explore"
                  className={`mobile-nav-item ${isDestinationsActive ? 'active' : ''}`}
                  onClick={handleDestinationsClick}
                  state={{ initialTab: 'destinations', forceReload: true }}
                >
                  Destinations
                </Link>

                <Link
                  to="/about"
                  className={`mobile-nav-item ${isAboutActive ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>

                <Link
                  to="/pricing"
                  className={`mobile-nav-item ${isSubscriptionActive ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Subscription
                </Link>

                <a href="https://longenomics.substack.com/" target="_blank" rel="noopener noreferrer" className={`mobile-nav-item ${isBlogsActive ? 'active' : ''}`}>
                  Blogs
                </a>

                {isAuthenticated && (
                  <>
                    <button 
                      className="mobile-nav-item dashboard-item"
                      onClick={() => {
                        navigateToDashboard(getDashboardPath());
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {getDashboardIcon()}
                      <span>{getDashboardLabel()}</span>
                    </button>
                    <button 
                      className="mobile-nav-item logout-item"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>

              {!isAuthenticated && (
                <button 
                  className="mobile-join-btn"
                  onClick={handleSignIn}
                >
                  JOIN NOW
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile sidebar */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-sidebar-backdrop"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Keep the modals the same */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={handleCloseAuthModal}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}

      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </>
  );
};

export default Navigation;