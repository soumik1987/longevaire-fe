
import {  Calendar } from 'lucide-react';
import { getAllPrograms } from '../data/programs';
import type { Program } from '../data/programs';
import '../styles/ProgramsSection.css';

interface ProgramCard extends Program {
  id: number;
  badge: string;
  image: string;
  title: string;
  subtitle: string;
  availableDate: string;
}

const ProgramsSection: React.FC = () => {
  // Map the programs to include the required properties
  const programs: ProgramCard[] = getAllPrograms().map((program, index) => ({
    ...program,
    id: index + 1,
    badge: program.highlights?.[0] || 'Featured',
    image: program.imageGallery?.[0] || 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg',
    title: program.name,
    subtitle: program.details,
    availableDate: program.bookingOptions?.availableDates?.[0] || 'Available soon'
  }));

  return (
    <div className="programs-section-container">
      <div className="programs-header">
        <h2 className="programs-main-title">OUR WELLNESS PROGRAMS</h2>
        <p className="programs-subtitle">Gain fresh perspectives on physical, spiritual, and mental wellness.</p>
      </div>
      
      <div className="programs-scroll-container">
        <div className="programs-horizontal-scroll">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <div className="program-card-image">
                <img src={program.image} alt={program.title} />
                <div className="program-card-badge">
                  {program.badge}
                </div>
                <div className="program-card-content">
                  <div className="program-card-location">{program.location}</div>
                  <h3 className="program-card-title">{program.title}</h3>
                  <p className="program-card-subtitle">{program.subtitle}</p>
                  <div className="program-card-date">
                    <Calendar size={16} />
                    <span>{program.availableDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramsSection;