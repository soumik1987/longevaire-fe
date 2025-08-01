import React from 'react';
import FAQSection from '../components/FAQSection';
import LongevityGrid from '../components/LongevityGrid';
import ExpertiseSection from '../components/ExpertiseSection';

import ProgramsSection from '../components/ProgramsSection';
import HeroSection from '../components/HeroSection';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <HeroSection />
     <LongevityGrid />
     <ExpertiseSection />
      <FAQSection />
      <ProgramsSection/>
    </div>
  );
};

export default AboutPage;
