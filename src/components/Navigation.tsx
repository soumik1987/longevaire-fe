// src/components/Navigation.tsx
import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, Menu, X, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';
import ContactModal from './ContactModal';
import SignInModal from './SignInModal';

// Mock authentication service
const AuthService = {
  signIn: (userData: any): Promise<any> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const userToStore = {
          displayName: userData.displayName || 'Demo User',
          email: userData.email || 'demo@example.com',
          photoURL: userData.photoURL || 'https://i.pravatar.cc/150?img=3',
          token: 'fake-auth-token-123',
          phone: userData.phone || ''
        };
        localStorage.setItem('fakeAuthUser', JSON.stringify(userToStore));
        console.log('AuthService: User signed in and stored:', userToStore); // Debug log
        resolve(userToStore);
      }, 1000);
    });
  },

  signOut: (): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('AuthService: Attempting to remove fakeAuthUser from localStorage.'); // Debug log
        localStorage.removeItem('fakeAuthUser');
        console.log('AuthService: fakeAuthUser after removal:', localStorage.getItem('fakeAuthUser')); // Debug log
        resolve();
      }, 500);
    });
  },

  getCurrentUser: (): any => {
    const user = localStorage.getItem('fakeAuthUser');
    console.log('AuthService: Current user from localStorage:', user ? JSON.parse(user).email : 'None'); // Debug log
    return user ? JSON.parse(user) : null;
  }
};

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<any>(AuthService.getCurrentUser());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      
      // Close general dropdowns (Discover, Support) when clicking outside
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

      // Close user menu when clicking outside
      if (showUserMenu) {
        const userDropdownElement = document.querySelector('.user-dropdown');
        const userDropdownButtonElement = document.querySelector('.user-dropdown-button');
        if (userDropdownElement && userDropdownButtonElement && 
            !userDropdownElement.contains(event.target as Node) && 
            !userDropdownButtonElement.contains(event.target as Node)) {
          setShowUserMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen, activeDropdown, showUserMenu]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleModalSignIn = async (userData: any) => {
    try {
      const signedInUser = await AuthService.signIn(userData);
      setUser(signedInUser);
      setShowSignInModal(false);
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop propagation to prevent parent elements from handling the click
    
    console.log('handleSignOut: Clicked, attempting sign out...'); // Debug log
    try {
      setIsLoggingOut(true); // Set loading state
      await AuthService.signOut(); // Perform the asynchronous sign out

      // Crucial: Update state ONLY after AuthService.signOut completes
      setUser(null); // Clear the user state to null
      setShowUserMenu(false); // Close the user menu
      setIsMobileMenuOpen(false); // Close mobile menu if open

      console.log('handleSignOut: User successfully signed out. User state is now:', user); // Debug log
    } catch (error) {
      console.error('handleSignOut: Sign out failed:', error);
    } finally {
      setIsLoggingOut(false); // Reset loading state
      console.log('handleSignOut: Sign out process finished.'); // Debug log
    }
  };

  const toggleUserMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop propagation to prevent closing immediately
    setShowUserMenu(!showUserMenu);
  };

  const renderUserDropdown = () => (
    <div className="user-dropdown">
      <button 
        onClick={toggleUserMenu} 
        className="user-dropdown-button"
        aria-label="User menu"
        aria-expanded={showUserMenu}
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt="User avatar" className="user-avatar" />
        ) : (
          <UserCircle size={32} />
        )}
      </button>
      {showUserMenu && (
        <div className="user-menu">
          <p className="user-name">{user.displayName || 'User'}</p>
          <p className="user-email">{user.email}</p>
          <button 
            onClick={handleSignOut} // Direct call to handleSignOut
            className="logout-button"
            disabled={isLoggingOut} // Disable during logout
          >
            {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
          </button>
        </div>
      )}
    </div>
  );

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
                  if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                }}
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="mobile-join">
            {!user ? (
              <button 
                className="join-btn" 
                onClick={() => {
                  setShowSignInModal(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign In
              </button>
            ) : (
              // User is logged in for mobile view
              <div className="user-dropdown">
                <button 
                  onClick={toggleUserMenu} 
                  className="user-dropdown-button"
                  aria-label="User menu"
                  aria-expanded={showUserMenu}
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User avatar" className="user-avatar" />
                  ) : (
                    <UserCircle size={24} />
                  )}
                </button>
                {showUserMenu && (
                  <div className="user-menu">
                    <p className="user-name">{user.displayName || 'User'}</p>
                    <p className="user-email">{user.email}</p>
                    <button 
                      onClick={handleSignOut} // Direct call to handleSignOut
                      className="logout-button"
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
                    </button>
                  </div>
                )}
              </div>
            )}
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
          {!user ? (
            <button 
              className="join-btn" 
              onClick={() => setShowSignInModal(true)}
            >
              Sign In
            </button>
          ) : (
            // User is logged in for desktop view
            renderUserDropdown()
          )}
        </div>
      </div>
      
      {showSignInModal && (
        <SignInModal 
          onClose={() => setShowSignInModal(false)} 
          onSignIn={handleModalSignIn}
        />
      )}
      
      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </nav>
  );
};

export default Navigation;