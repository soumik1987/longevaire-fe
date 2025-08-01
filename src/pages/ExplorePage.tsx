

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchProgramCategories, fetchDestinations } from '../api';
import '../styles/ExplorePage.css';
import type { Destination } from '../data/destinations';
import type { ProgramCategory } from '../data/programs';

const ExplorePage: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'programs' | 'destinations'>(
    (location.state?.initialTab === 'destinations' ? 'destinations' : 'programs')
  );
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [programCategories, setProgramCategories] = useState<ProgramCategory[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Reset tab when location state changes (from navigation)
  useEffect(() => {
    if (location.state?.forceReload) {
      setActiveTab(location.state?.initialTab === 'destinations' ? 'destinations' : 'programs');
    }
  }, [location.state]);

  // Memoized data loading function
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [categories, dests] = await Promise.all([
        fetchProgramCategories(),
        fetchDestinations()
      ]);
      
      setProgramCategories(categories);
      setDestinations(dests);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const loadDataAndScroll = async () => {
      await loadData();
      if (isMounted) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    loadDataAndScroll();

    return () => {
      isMounted = false;
    };
  }, [loadData]);

  const handleProgramClick = useCallback((categoryType: string) => {
    navigate('/programs', { state: { type: 'category', categoryType } });
  }, [navigate]);

  const handleDestinationClick = useCallback((country: string) => {
    setSelectedDestination(prev => prev === country ? null : country);
  }, []);

  const handleCityClick = useCallback((country: string, city: string) => {
    navigate('/programs', { state: { type: 'location', country, city } });
  }, [navigate]);

  if (loading) {
    return (
      <div className="explore-page">
        <div className="explore-container explore-loading-container">
          <div className="explore-loading-spinner"></div>
          <p>Loading wellness experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="explore-page">
      {/* Header Section */}
      <div className="explore-header">
        <div className="explore-container">
          <h1 className="explore-title">Explore Wellness Experiences</h1>
          <p className="explore-subtitle">
            Discover transformative programs and destinations designed for your optimal well-being
          </p>
          
          {/* Tab Navigation */}
          <div className="explore-tab-container">
            <div className="explore-tab-navigation">
              <button
                className={`explore-tab-btn ${activeTab === 'programs' ? 'active' : ''}`}
                onClick={() => setActiveTab('programs')}
                aria-label="View program types"
              >
                Program Types
              </button>
              <button
                className={`explore-tab-btn ${activeTab === 'destinations' ? 'active' : ''}`}
                onClick={() => setActiveTab('destinations')}
                aria-label="View destinations"
              >
                Destinations
              </button>
            </div>
          </div>
        </div>
      </div>
        
      {/* Cards Section */}
      <div className="explore-cards-section">
        <div className="explore-container">
          {activeTab === 'programs' ? (
            <div className="explore-cards-grid">
              {programCategories.map((category) => (
                <ProgramCard 
                  key={category.type}
                  category={category}
                  onClick={handleProgramClick}
                />
              ))}
            </div>
          ) : (
            <div className="explore-cards-grid">
              {destinations.map((destination) => (
                <DestinationCard
                  key={destination.country}
                  destination={destination}
                  isExpanded={selectedDestination === destination.country}
                  onDestinationClick={handleDestinationClick}
                  onCityClick={handleCityClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Memoized Program Card Component
const ProgramCard = React.memo(({ 
  category, 
  onClick 
}: { 
  category: ProgramCategory; 
  onClick: (type: string) => void 
}) => (
  <div className="explore-program-card" onClick={() => onClick(category.type)}>
    <div className="explore-card-image-container">
      <img 
        src={category.image} 
        alt={category.type} 
        className="explore-card-image" 
        loading="lazy"
      />
      <div className="explore-card-overlay">
        <div className="explore-card-badge">{category.badge}</div>
        <div className="explore-card-content">
          <h3 className="explore-card-title">{category.type}</h3>
          <p className="explore-card-description">{category.description}</p>
          <button className="explore-card-cta">Explore Programs</button>
        </div>
      </div>
    </div>
  </div>
));

// Memoized Destination Card Component
const DestinationCard = React.memo(({ 
  destination, 
  isExpanded, 
  onDestinationClick, 
  onCityClick 
}: { 
  destination: Destination; 
  isExpanded: boolean; 
  onDestinationClick: (country: string) => void;
  onCityClick: (country: string, city: string) => void;
}) => (
  <div className={`explore-destination-card ${isExpanded ? 'expanded' : ''}`}>
    <div className="explore-destination-card-inner">
      <div className="explore-destination-image-container">
        <img 
          src={destination.image} 
          alt={destination.country} 
          className="explore-destination-image" 
          loading="lazy"
        />
        <div className="explore-destination-overlay">
          <div className="explore-destination-badge">Exclusive Retreat</div>
          <div className="explore-destination-content">
            <h3 className="explore-destination-title">{destination.country}</h3>
            <p className="explore-destination-description">Explore destinations in {destination.country}</p>
            <button 
              className="explore-destination-cta"
              onClick={(e) => {
                e.stopPropagation();
                onDestinationClick(destination.country);
              }}
              aria-label={`${isExpanded ? 'Hide' : 'Show'} cities in ${destination.country}`}
            >
              {isExpanded ? 'Hide Cities' : 'Explore Destinations'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Cities Grid - Only rendered when expanded */}
      {isExpanded && (
        <div className="explore-cities-grid visible">
          <h4>Choose Your City</h4>
          <div className="explore-cities-list">
            {destination.cities.map((city) => (
              <button
                key={city}
                className="explore-city-link"
                onClick={(e) => {
                  e.stopPropagation();
                  onCityClick(destination.country, city);
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
));

export default React.memo(ExplorePage);