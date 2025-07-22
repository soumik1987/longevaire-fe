
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProgramCategories, fetchDestinations } from '../api';
import '../styles/ExplorePage.css';
import type { Destination } from '../data/destinations';
import type { ProgramCategory } from '../data/programs';

const ExplorePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'programs' | 'destinations'>('programs');
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [programCategories, setProgramCategories] = useState<ProgramCategory[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
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
    };

    loadData();
    window.scrollTo(0, 0);
  }, []);

  const handleProgramClick = (categoryType: string) => {
    navigate('/programs', { state: { type: 'category', categoryType } });
  };

  function handleDestinationClick(country: string) {
    if (selectedDestination === country) {
      setSelectedDestination(null);
    } else {
      setSelectedDestination(country);
    }
  }

  const handleCityClick = (country: string, city: string) => {
    navigate('/programs', { state: { type: 'location', country, city } });
  };

  if (loading) {
    return (
      <div className="explore-page">
        <div className="container loading-container">
          <div className="loading-spinner"></div>
          <p>Loading wellness experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="explore-page">
      {/* Header Section */}
      <div className="explore-header">
        <div className="container">
          <h1 className="explore-title">Explore Wellness Experiences</h1>
          <p className="explore-subtitle">
            Discover transformative programs and destinations designed for your optimal well-being
          </p>
          
          {/* Toggle Buttons */}
          <div className="toggle-container">
            <button
              className={`toggle-btn ${activeTab === 'programs' ? 'active' : ''}`}
              onClick={() => setActiveTab('programs')}
            >
              Program Types
            </button>
            <button
              className={`toggle-btn ${activeTab === 'destinations' ? 'active' : ''}`}
              onClick={() => setActiveTab('destinations')}
            >
              Destinations
            </button>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="cards-section">
        <div className="container">
          {activeTab === 'programs' ? (
            <div className="cards-grid">
              {programCategories.map((category, index) => (
                <div key={index} className="program-card" onClick={() => handleProgramClick(category.type)}>
                  <div className="card-image-container">
                    <img src={category.image} alt={category.type} className="card-image" />
                    <div className="card-overlay">
                      <div className="card-badge">{category.badge}</div>
                      <div className="card-content">
                        <h3 className="card-title">{category.type}</h3>
                        <p className="card-description" style={{ color: '#f5f5f5',}}>{category.description}</p>
                        <button className="card-cta">Explore Programs</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="cards-grid">
              {destinations.map((destination, index) => (
                <div 
                  key={index} 
                  className={`destination-card ${selectedDestination === destination.country ? 'expanded' : ''}`}
                >
                  <div className="destination-card-inner">
                    <div className="destination-image-container">
                      <img src={destination.image} alt={destination.country} className="destination-image" />
                      <div className="destination-overlay">
                        <div className="destination-badge">Exclusive Retreat</div>
                        <div className="destination-content">
                          <h3 className="destination-title">{destination.country}</h3>
                          <p className="destination-description">Explore destinations in {destination.country}</p>
                          <button 
                            className="destination-cta"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDestinationClick(destination.country);
                            }}
                          >
                            {selectedDestination === destination.country ? 'Hide Cities' : 'Explore Destinations'}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Cities Grid */}
                    <div className={`cities-grid ${selectedDestination === destination.country ? 'visible' : ''}`}>
                      <h4>Choose Your City</h4>
                      <div className="cities-list">
                        {destination.cities.map((city, cityIndex) => (
                          <button
                            key={cityIndex}
                            className="city-link"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCityClick(destination.country, city);
                            }}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;