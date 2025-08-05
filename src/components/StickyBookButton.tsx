import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const StickyBookButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show on homepage
  if (location.pathname !== '/') {
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