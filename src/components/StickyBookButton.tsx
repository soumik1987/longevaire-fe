import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const StickyBookButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const checkSidebarState = () => {
      const mobileSidebar = document.querySelector('.mobile-sidebar');
      if (mobileSidebar) {
        const isOpen = mobileSidebar.classList.contains('open');
        setIsMobileSidebarOpen(isOpen);
      }
    };

    // Check immediately
    checkSidebarState();

    // Set up observer to watch for class changes
    const observer = new MutationObserver(checkSidebarState);
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    
    if (mobileSidebar) {
      observer.observe(mobileSidebar, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    return () => observer.disconnect();
  }, []);

  // Hide button if not on homepage or if mobile sidebar is open
  if (location.pathname !== '/' || isMobileSidebarOpen) {
    return null;
  }

  const handleBookClick = () => {
    navigate('/explore');
  };

  return (
    <div className="sticky-book-button-container">
      <button 
        className="sticky-book-button"
        onClick={handleBookClick}
      >
        Book Now
      </button>
    </div>
  );
};

export default StickyBookButton;