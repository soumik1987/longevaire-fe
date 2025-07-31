import React from 'react';
import FAQSection from '../components/FAQSection';
import LongevityGrid from '../components/LongevityGrid';
import ExpertiseSection from '../components/ExpertiseSection';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
     <LongevityGrid />
     <ExpertiseSection />
      <FAQSection />
    </div>
  );
};

export default AboutPage;
