

import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, Menu, X, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { auth, provider } from '../firebase';
import '../styles/Navigation.css';
import ContactModal from './ContactModal';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const apiResponse = await axios.post('https://your-backend-api.com/auth/google', {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });
      console.log('✅ Google user:', user);
      console.log('📡 API Response:', apiResponse.data);
      setUser({ ...user });
      alert(`Welcome ${user.displayName}!`);
    } catch (error: any) {
      console.warn('⚠️ Falling back to mock login due to:', error.message);
      handleFakeGoogleSignIn();
    }
  };

  const handleFakeGoogleSignIn = () => {
    const mockUser = {
      displayName: 'John Doe',
      email: 'johndoe@example.com',
      photoURL: 'https://i.pravatar.cc/150?img=68',
    };
    setUser(mockUser);
    alert(`Welcome ${mockUser.displayName}!`);
  };

  const handleSignOut = () => {
    setUser(null);
    setShowUserMenu(false);
    alert('Successfully logged out');
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
            >
              Discover <ChevronDown size={16} className={`dropdown-arrow ${activeDropdown === 'discover' ? 'rotated' : ''}`} />
            </button>
            <div className={`dropdown-content ${activeDropdown === 'discover' ? 'active' : ''}`}>
              <div className="dropdown-grid">
                <div className="dropdown-section">
                  <h4>LONGEVITY PROGRAMS</h4>
                  <a href="#clinic-access">
                    <div>
                      <strong>Clinic Access</strong>
                      <p>Connect with top clinics worldwide</p>
                    </div>
                  </a>
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
            >
              Support <ChevronDown size={16} className={`dropdown-arrow ${activeDropdown === 'support' ? 'rotated' : ''}`} />
            </button>
            <div className={`dropdown-content ${activeDropdown === 'support' ? 'active' : ''}`}>
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
              <button className="join-btn" onClick={handleGoogleSignIn}>Join now</button>
            ) : (
              <div className="user-dropdown">
                <button onClick={() => setShowUserMenu(!showUserMenu)}>
                  <UserCircle size={24} />
                </button>
                {showUserMenu && (
                  <div className="user-menu">
                    <button onClick={handleSignOut}>Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="nav-right">
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {!user ? (
            <button className="join-btn" onClick={handleGoogleSignIn}>Join now</button>
          ) : (
            <div className="user-dropdown">
              <button onClick={() => setShowUserMenu(!showUserMenu)}>
                <img src={user.photoURL} alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%' }} />
              </button>
              {showUserMenu && (
                <div className="user-menu">
                  <p>{user.displayName}</p>
                  <button onClick={handleSignOut}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </nav>
  );
};

export default Navigation;