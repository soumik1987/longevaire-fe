


import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProgramCategories, fetchProgramsByLocation } from '../api';
import { getPrograms } from '../api/programlistapi';
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
    id: program.name.replace(/\s+/g, '-').toLowerCase(),
    specialOffer: program.includes?.[0]?.title || '',
    nights: program.duration || 'Custom Duration',
    pricing: program.bookingOptions?.pricePerPerson || 'Contact for pricing',
    bookingDate: program.bookingOptions?.availableDates?.[0]?.split('-').reverse().join('/') || 'N/A',
    stayDate: program.bookingOptions?.availableDates?.[0]?.split('-').reverse().join('/') || 'N/A',
    imageUrl: program.imageGallery?.[0] || 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
    highlights: program.includes?.map(include => include.title) || []
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

  const ProgramCard = React.memo(({ program, onClick }: { program: TransformedProgram, onClick: () => void }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
      <div className="program-list-card" onClick={onClick}>
        <div
          className="program-list-program-image"
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
          {!imageLoaded && <div className="program-list-image-placeholder"></div>}
        </div>

        <div className="program-list-program-card-content">
          <div className="program-list-program-location">{program.location}</div>
          <h3 className="program-list-program-name">{program.name}</h3>

          {program.specialOffer && (
            <div className="program-list-special-offer-tag">
              {program.specialOffer}
            </div>
          )}

          <p className="program-list-program-description">{program.details}</p>

          <div className="program-list-program-details">
            <div className="program-list-detail-item">
              <span className="program-list-detail-icon">🛏️</span>
              <span>{program.nights}</span>
            </div>
            <div className="program-list-detail-item">
              <span className="program-list-detail-icon">💰</span>
              <span>{program.pricing}</span>
            </div>
            <div className="program-list-detail-item">
              <span className="program-list-detail-icon">📅</span>
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

    const loadPrograms = async () => {
      const state = location.state as LocationState;

      if (!state) {
        navigate('/explore');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Try to fetch from API first
        const apiResponse = await getPrograms({});
        if (isMounted && apiResponse?.programs?.length) {
          setPrograms(transformProgramData(apiResponse.programs));
          setPageTitle('All Programs');
          setPageSubtitle('Explore our wellness experiences around the world.');
          return;
        }
        throw new Error('Empty response');
      } catch (apiErr) {
        console.warn('API fetch failed. Falling back to static data.');
        setError('Could not load latest programs. Showing available data.');
      }

      try {
        // Fallback logic if API fails
        const state = location.state as LocationState;
        if (state.type === 'category' && state.categoryType) {
          const allCategories = await fetchProgramCategories();
          const category = allCategories.find(cat => cat.type === state.categoryType);
          if (category && isMounted) {
            setPrograms(transformProgramData(category.programs));
            setPageTitle(category.type);
            setPageSubtitle(category.description);
          }
        } else if (state.type === 'location' && state.country) {
          const locationPrograms = await fetchProgramsByLocation(state.country, state.city);
          if (isMounted) {
            setPrograms(transformProgramData(locationPrograms));
            setPageTitle(`Programs in ${state.country}${state.city ? ` - ${state.city}` : ''}`);
            setPageSubtitle(`Discover wellness experiences in ${state.country}${state.city ? `, ${state.city}` : ''}`);
          }
        }
      } catch (fallbackErr) {
        console.error('Fallback also failed', fallbackErr);
        if (isMounted) {
          setPrograms([]);
          setError('Failed to load program data. Please try again later.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPrograms();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [location.state, navigate]);

  const programsGrid = useMemo(() => {
    if (!loading && programs.length === 0) {
      return (
        <div className="program-list-no-programs">
          <h3>No programs found</h3>
          <p>We couldn't find any programs matching your criteria.</p>
          {error && <p className="program-list-error">{error}</p>}
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
  }, [programs, loading, handleProgramClick, error]);

  if (loading) {
    return (
      <div className="program-list-page">
        <div className="program-list-container program-list-loading-container">
          <div className="program-list-loading-spinner"></div>
          <p>Loading programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="program-list-page">
      <div className="program-list-header">
        <div className="program-list-container">
          <h1 className="program-list-page-title">{pageTitle}</h1>
          <p className="program-list-page-subtitle">{pageSubtitle}</p>
          {error && <p className="program-list-error">{error}</p>}
        </div>
      </div>

      <div className="program-list-programs-section">
        <div className="program-list-container">
          {programsGrid}
        </div>
      </div>
    </div>
  );
};

export default ProgramListPage;