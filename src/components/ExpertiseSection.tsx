import React from 'react';
import '../styles/global.css';
import '../styles/ExpertiseSection.css';
import IrisImage from '../assets/irisphoto.jpg';
import SoumikImage from '../assets/soumik.jpg';
import { FaLinkedin } from 'react-icons/fa';

interface Expert {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

const ExpertiseSection: React.FC = () => {
  // Local expert data
  const experts: Expert[] = [
    {
      name: "Soumik",
      role: "Founder",
      image: SoumikImage,
      linkedin: "https://www.linkedin.com/in/soumik-ghosh-466b0956/"
    },
    {
      name: "Iris",
      role: "Operations",
      image: IrisImage,
      linkedin: "https://www.linkedin.com/in/iris-zhorov-69a21b1a2/"
    }
    
  ];

  return (
    <section className="expertise-section">
      <div className="container">
        <div className="expertise-header fade-in-up">
          <h2>Our Global Expertise</h2>
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
                <img 
                  src={expert.image} 
                  alt={expert.name} 
                  loading="lazy"
                  width={300}
                  height={400}
                  decoding="async"
                />
              </div>
              <div className="expert-info">
                <div className="name-container">
                  <h3 className="expert-name">{expert.name}</h3>
                  <a 
                    href={expert.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="linkedin-link"
                    aria-label={`${expert.name}'s LinkedIn profile`}
                  >
                    <FaLinkedin className="linkedin-icon" />
                  </a>
                </div>
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