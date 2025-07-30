import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
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
    badge: program.highlights?.[0] || 'Featured', // Using first highlight as badge
    image: program.imageGallery?.[0] || '', // Using first image from gallery
    title: program.name,
    subtitle: program.details,
    availableDate: program.bookingOptions?.availableDates?.[0] || 'Available soon'
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(programs.length / itemsPerPage);

  const getCurrentPagePrograms = () => {
    const startIndex = currentIndex * itemsPerPage;
    return programs.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const goToPage = (pageIndex: number) => {
    setCurrentIndex(pageIndex);
  };

  return (
    <div className="programs-section-container">
      <div className="programs-grid-container">
        <div className="programs-grid">
          {getCurrentPagePrograms().map((program) => (
            <div key={program.id} className="program-card">
              <div className="program-card-badge">
                {program.badge}
              </div>
              <div className="program-card-image">
                <img src={program.image} alt={program.title} />
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
          ))}
        </div>
        
        <div className="programs-navigation">
          <button 
            onClick={handlePrevious}
            className="programs-nav-btn programs-prev-btn"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="programs-pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`programs-dot ${index === currentIndex ? 'programs-dot-active' : ''}`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={handleNext}
            className="programs-nav-btn programs-next-btn"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramsSection;