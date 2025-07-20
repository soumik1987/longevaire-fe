import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, Menu, X } from 'lucide-react';
import '../styles/Navigation.css';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-left">
          <div className="logo">
            <Star size={24} fill="currentColor" />
          </div>
          <span className="welcome-text">Welcome to your journey of rejuvenation</span>
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
              <div className="dropdown-section">
                <h4>LONGEVITY PROGRAMS</h4>
                <a href="#clinic-access">
                  <span className="dropdown-icon">📋</span>
                  <div>
                    <strong>Clinic Access</strong>
                    <p>Connect with top clinics worldwide</p>
                  </div>
                </a>
                <a href="#wellness-retreats">
                  <span className="dropdown-icon">🏖️</span>
                  <div>
                    <strong>Wellness Retreats</strong>
                    <p>Indulge in luxury spa escapes</p>
                  </div>
                </a>
                <a href="#medical-concierge">
                  <span className="dropdown-icon">👨‍⚕️</span>
                  <div>
                    <strong>Medical Concierge</strong>
                    <p>Tailored health plans just for you</p>
                  </div>
                </a>
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
              <a href="#contact">Contact concierge</a>
              <a href="#help">Help center</a>
            </div>
          </div>
          
          {/* Mobile-only Join button */}
          <div className="mobile-join">
            <button className="join-btn" onClick={closeMobileMenu}>Join now</button>
          </div>
        </div>
        
        <div className="nav-right">
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button className="join-btn">Join now</button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;