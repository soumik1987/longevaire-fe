import React from 'react';

import '../styles/ElevateSection.css';

const ElevateSection: React.FC = () => {
  return (
    <section className="elevate-section">
      <div className="elevate-overlay">
        <div className="container">
          <div className="elevate-content fade-in-up">
            <h2 className="elevate-title">Elevate your longevity journey</h2>
            <p className="elevate-description">
              Discover leading insights, expert strategies, and premier destinations in longevity. 
              Access the latest research, wellness innovations, and exclusive global clinics for 
              optimal health and extended vitality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElevateSection;