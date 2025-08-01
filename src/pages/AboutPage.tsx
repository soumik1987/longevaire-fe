import React from 'react';
import FAQSection from '../components/FAQSection';
import LongevityGrid from '../components/LongevityGrid';
import ExpertiseSection from '../components/ExpertiseSection';

import ProgramsSection from '../components/ProgramsSection';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
     <LongevityGrid />
     <ExpertiseSection />
      <FAQSection />
      <ProgramsSection/>
    </div>
  );
};

export default AboutPage;
