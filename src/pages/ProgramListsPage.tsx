import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { programCategories, getProgramsByLocation } from '../data/programs';
import type { Program } from '../data/programs';
// import { programCategories, getProgramsByLocation, Program } from '../data/programs';
import '../styles/ProgramListsPage.css';

interface LocationState {
  type: 'category' | 'location';
  categoryType?: string;
  country?: string;
  city?: string;
}

const ProgramListPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [pageTitle, setPageTitle] = useState('');
  const [pageSubtitle, setPageSubtitle] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const state = location.state as LocationState;
    
    if (!state) {
      navigate('/explore');
      return;
    }

    if (state.type === 'category' && state.categoryType) {
      // Show programs from specific category
      const category = programCategories.find(cat => cat.type === state.categoryType);
      if (category) {
        setPrograms(category.programs);
        setPageTitle(category.type);
        setPageSubtitle(category.description);
      }
    } else if (state.type === 'location' && state.country) {
      // Show programs from specific location
      const locationPrograms = getProgramsByLocation(state.country, state.city);
      setPrograms(locationPrograms);
      setPageTitle(`Programs in ${state.country}${state.city ? ` - ${state.city}` : ''}`);
      setPageSubtitle(`Discover wellness experiences in ${state.country}${state.city ? `, ${state.city}` : ''}`);
    }
  }, [location.state, navigate]);

  // const handleProgramClick = (programName: string) => {
  //   navigate('/program-details', { state: { programName } });
  // };

  const handleProgramClick = (programName: string) => {
  console.log('Navigating to program:', programName, { state: { programName } });
  navigate('/program-details', { state: { programName } });
};

  const handleBackClick = () => {
    navigate('/explore');
  };

  return (
    <div className="program-list-page">
      {/* Header Section */}
      <div className="program-list-header">
        <div className="container">
          <button className="back-button" onClick={handleBackClick}>
            ← Back to Explore
          </button>
          <h1 className="page-title">{pageTitle}</h1>
          <p className="page-subtitle">{pageSubtitle}</p>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="programs-section">
        <div className="container">
          {programs.length > 0 ? (
            <div className="programs-grid">
              {programs.map((program, index) => (
                <div 
                  key={index} 
                  className="program-list-card"
                  onClick={() => handleProgramClick(program.name)}
                >
                  <div className="program-card-content">
                    <h3 className="program-name">{program.name}</h3>
                    <p className="program-brief">{program.details}</p>
                    <div className="program-location">
                      <span className="location-icon">📍</span>
                      <span>{program.location}</span>
                    </div>
                    {program.duration && (
                      <div className="program-duration">
                        <span className="duration-icon">⏱️</span>
                        <span>{program.duration}</span>
                      </div>
                    )}
                    <button className="learn-more-btn" onClick={(e) => {
                        e.preventDefault();
                        handleProgramClick(program.name);
                      }}
                    >
                    Learn More
                  </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-programs">
              <h3>No programs found</h3>
              <p>We couldn't find any programs matching your criteria.</p>
              <button className="back-button" onClick={handleBackClick}>
                Back to Explore
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramListPage;