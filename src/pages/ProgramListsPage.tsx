import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProgramCategories, fetchProgramsByLocation } from '../api';
import '../styles/ProgramListsPage.css';
import type { Program as ImportedProgram } from '../data/programs';

interface LocationState {
  type: 'category' | 'location';
  categoryType?: string;
  country?: string;
  city?: string;
}

interface TransformedProgram extends ImportedProgram {
  id: string;
  specialOffer: string;
  nights: string;
  pricing: string;
  bookingDate: string;
  stayDate: string;
  imageUrl: string;
  highlights: string[];
}

const transformProgramData = (programs: ImportedProgram[]): TransformedProgram[] => {
  return programs.map(program => ({
    ...program,
    id: program.name.replace(/\s+/g, '-').toLowerCase(), // Generate ID from name
    specialOffer: program.includes?.[0]?.title || '', // Use first include title as special offer
    nights: program.duration || 'Custom Duration',
    pricing: program.bookingOptions?.pricePerPerson || 'Contact for pricing',
    bookingDate: program.bookingOptions?.availableDates?.[0]?.split('-').reverse().join('/') || 'N/A',
    stayDate: program.bookingOptions?.availableDates?.[0]?.split('-').reverse().join('/') || 'N/A',
    imageUrl: program.imageGallery?.[0] || 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
    highlights: program.includes?.map(include => include.title) || [] // Convert includes to highlights
  }));
};

const ProgramListPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<TransformedProgram[]>([]);
  const [pageTitle, setPageTitle] = useState('');
  const [pageSubtitle, setPageSubtitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleProgramClick = useCallback((programName: string) => {
    navigate('/program-details', { state: { programName } });
  }, [navigate]);

  const handleBackClick = useCallback(() => {
    navigate('/explore');
  }, [navigate]);

  const ProgramCard = React.memo(({ program, onClick }: { program: TransformedProgram, onClick: () => void }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    return (
      <div className="program-list-card" onClick={onClick}>
        <div 
          className="program-image" 
          style={{ 
            backgroundImage: imageLoaded ? `url(${program.imageUrl})` : 'none',
            backgroundColor: !imageLoaded ? '#f5f5f5' : 'transparent'
          }}
        >
          <img 
            src={program.imageUrl} 
            alt="" 
            style={{ display: 'none' }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
          {!imageLoaded && <div className="image-placeholder"></div>}
        </div>
        
        <div className="program-card-content">
          <div className="program-location">{program.location}</div>
          <h3 className="program-name">{program.name}</h3>
          
          {program.specialOffer && (
            <div className="special-offer-tag">
              {program.specialOffer}
            </div>
          )}
          
          <p className="program-description">{program.details}</p>
          
          <div className="program-details">
            <div className="detail-item">
              <span className="detail-icon">🛏️</span>
              <span>{program.nights}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">💰</span>
              <span>{program.pricing}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <span>Book by {program.bookingDate}, Stay by {program.stayDate}</span>
            </div>
          </div>
          
          <div className="learn-more-link">LEARN MORE</div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    
    const loadData = async () => {
      if (!isMounted) return;
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const state = location.state as LocationState;
      
      if (!state) {
        navigate('/explore');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        if (state.type === 'category' && state.categoryType) {
          const allCategories = await fetchProgramCategories();
          const category = allCategories.find(cat => cat.type === state.categoryType);
          if (category) {
            if (isMounted) {
              setPrograms(transformProgramData(category.programs));
              setPageTitle(category.type);
              setPageSubtitle(category.description);
            }
          } else if (isMounted) {
            setError('Category not found');
          }
        } else if (state.type === 'location' && state.country) {
          const locationPrograms = await fetchProgramsByLocation(
            state.country,
            state.city
          );
          if (isMounted) {
            setPrograms(transformProgramData(locationPrograms));
            setPageTitle(`Programs in ${state.country}${state.city ? ` - ${state.city}` : ''}`);
            setPageSubtitle(`Discover wellness experiences in ${state.country}${state.city ? `, ${state.city}` : ''}`);
          }
        }
      } catch (err) {
        if (isMounted && !controller.signal.aborted) {
          console.error('Error loading programs:', err);
          setError('Failed to load programs. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [location.state, navigate]);

  const programsGrid = useMemo(() => {
    if (error) {
      return (
        <div className="no-programs">
          <h3>Error Loading Programs</h3>
          <p>{error}</p>
          <button className="back-button" onClick={handleBackClick}>
            Back to Explore
          </button>
        </div>
      );
    }

    if (programs.length === 0 && !loading) {
      return (
        <div className="no-programs">
          <h3>No programs found</h3>
          <p>We couldn't find any programs matching your criteria.</p>
          <button className="back-button" onClick={handleBackClick}>
            Back to Explore
          </button>
        </div>
      );
    }

    return (
      <div className="programs-grid">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onClick={() => handleProgramClick(program.name)}
          />
        ))}
      </div>
    );
  }, [programs, loading, error, handleBackClick, handleProgramClick]);

  if (loading) {
    return (
      <div className="program-list-page">
        <div className="container loading-container">
          <div className="loading-spinner"></div>
          <p>Loading programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="program-list-page">
      <div className="program-list-header">
        <div className="container">
          <button className="back-button" onClick={handleBackClick}>
            ← Back to Explore
          </button>
          <h1 className="page-title">{pageTitle}</h1>
          <p className="page-subtitle">{pageSubtitle}</p>
        </div>
      </div>

      <div className="programs-section">
        <div className="container">
          {programsGrid}
        </div>
      </div>
    </div>
  );
};

export default ProgramListPage;