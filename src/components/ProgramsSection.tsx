
// src/components/ProgramsSection.tsx
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchHomePrograms } from '../api';
import type { Program } from '../data/programs';
import '../styles/ProgramsSection.css';
import '../styles/loading.css';

interface ProgramCard extends Program {
  id: string;
  badge: string;
  image: string;
  title: string;
  subtitle: string;
  availableDate: string;
}

const ProgramsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<ProgramCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoading(true);
        const homeData = await fetchHomePrograms();
        
        // Transform programs for display
        const transformedPrograms: ProgramCard[] = homeData.recommended.map((program, index) => ({
          ...program,
          id: (program as any).code || program.name.replace(/\s+/g, '-').toLowerCase(),
          badge: program.highlights?.[0] || 'Featured',
          image: program.imageGallery?.[0] || 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg',
          title: program.name,
          subtitle: program.details || program.description || '',
          availableDate: program.bookingOptions?.availableDates?.[0] || 'Available soon',
        }));

        setPrograms(transformedPrograms);
      } catch (err) {
        console.error('Error loading programs:', err);
        setError('Failed to load programs');
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340; // width of a card + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleProgramClick = (program: ProgramCard) => {
    // Use code if available (from backend), otherwise use name
    const identifier = program.id;
    navigate('/program-details', { state: { programName: program.name, programCode: identifier } });
  };

  if (loading) {
    return (
      <div className="programs-section-container">
        <div className="programs-header">
          <h2 className="programs-main-title">OUR WELLNESS PROGRAMS</h2>
          <p className="programs-subtitle">
            Discover transformative experiences designed to enhance your wellbeing
          </p>
        </div>
        <div className="programs-loading">
          <div className="loading-spinner"></div>
          <p>Loading programs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="programs-section-container">
        <div className="programs-header">
          <h2 className="programs-main-title">OUR WELLNESS PROGRAMS</h2>
          <p className="programs-subtitle">
            Discover transformative experiences designed to enhance your wellbeing
          </p>
        </div>
        <div className="programs-error">
          <p>Unable to load programs. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="programs-section-container">
      <div className="programs-header">
        <h2 className="programs-main-title">OUR WELLNESS PROGRAMS</h2>
        <p className="programs-subtitle">
          Discover transformative experiences designed to enhance your wellbeing
        </p>
      </div>

      <div className="programs-carousel-container">
        <button 
          className="carousel-arrow left" 
          onClick={() => scroll('left')}
          aria-label="Previous programs"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="programs-carousel" ref={scrollRef}>
          {programs.map((program) => (
            <div 
              key={program.id} 
              className="program-card" 
              onClick={() => handleProgramClick(program)}
            >
              <div className="program-image-container">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="program-image"
                  loading="lazy"
                />
                <div className="program-badge">
                  {program.badge}
                </div>
              </div>
              
              <div className="program-content">
                <h3 className="program-title">{program.title}</h3>
                <p className="program-subtitle">{program.subtitle}</p>
                
                <div className="program-info">
                  <div className="program-location">
                    📍 {program.location}
                  </div>
                  
                  <div className="program-date">
                    <Calendar size={14} />
                    <span>{program.availableDate}</span>
                  </div>
                  
                  {program.duration && (
                    <div className="program-duration">
                      🕒 {program.duration}
                    </div>
                  )}
                  
                  {program.price && (
                    <div className="program-price">
                      💰 {program.price}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-arrow right" 
          onClick={() => scroll('right')}
          aria-label="Next programs"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProgramsSection;