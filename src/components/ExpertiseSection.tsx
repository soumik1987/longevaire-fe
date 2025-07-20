import React from 'react';

import '../styles/ExpertiseSection.css';

const ExpertiseSection: React.FC = () => {
  const experts = [
    { name: "Quinn Foster", role: "Longevity Specialist", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" },
    { name: "Sage Monroe", role: "Wellness Director", image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" },
    { name: "Drew Sinclair", role: "Medical Advisor", image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" },
    { name: "Reese Calder", role: "Research Lead", image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" }
  ];

  return (
    <section className="expertise-section">
      <div className="container">
        <div className="expertise-header fade-in-up">
          <h2 className="section-title">Our Global Expertise</h2>
          <blockquote className="testimonial">
            "Global expertise made my longevity journey effortless and tailored. 
            Every aspect was managed with care and precision."
          </blockquote>
          <cite className="testimonial-author">— Avery, Strategy Consultant</cite>
        </div>
        
        <div className="experts-grid">
          {experts.map((expert, index) => (
            <div key={index} className="expert-card fade-in-up">
              <div className="expert-image">
                <img src={expert.image} alt={expert.name} />
              </div>
              <div className="expert-info">
                <h3 className="expert-name">{expert.name}</h3>
                <p className="expert-role">{expert.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;