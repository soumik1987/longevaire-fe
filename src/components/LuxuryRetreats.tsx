import React from 'react';
import '../styles/LuxuryRetreats.css';
import { Link } from 'react-router-dom';


const LuxuryRetreats: React.FC = () => {
  return (
    <section className="luxury-retreats-section">
      <div className="retreats-overlay">
        <div className="container">
          <div className="retreats-content fade-in-up">
            <h2 className="retreats-title">Travel well, live deeply - experiences that matter</h2>
            <Link to="/explore" className="btn-primary retreats-btn">Explore now</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryRetreats;
