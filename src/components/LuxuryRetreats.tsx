import React from 'react';
import '../styles/LuxuryRetreats.css';


const LuxuryRetreats: React.FC = () => {
  return (
    <section className="luxury-retreats-section">
      <div className="retreats-overlay">
        <div className="container">
          <div className="retreats-content fade-in-up">
            <h2 className="retreats-title">Discover luxury retreats for a longer life</h2>
            <a href="#explore" className="btn-primary retreats-btn">Explore now</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryRetreats;