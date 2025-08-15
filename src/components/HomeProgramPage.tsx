import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProgramCategories, fetchDestinations } from '../api';
import type { Destination } from '../data/destinations';
import type { ProgramCategory } from '../data/programs';
import '../styles/HomeProgramPage.css';

const HomeProgramPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'programs' | 'destinations'>('programs');
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [programCategories, setProgramCategories] = useState<ProgramCategory[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Fix: Initialize the navigate function from the useNavigate hook.
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth <= 768 ? 280 : 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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

  const handleProgramClick = useCallback((categoryType: string) => {
    // Fix: Use the initialized navigate function.
    navigate('/programs', { state: { type: 'category', categoryType } });
  }, [navigate]); // navigate is now a valid dependency

  const handleDestinationClick = useCallback((country: string) => {
    setSelectedDestination(prev => prev === country ? null : country);
  }, []);

  const handleCityClick = useCallback((country: string, city: string) => {
    // Fix: Use the initialized navigate function.
    navigate('/programs', { state: { type: 'location', country, city } });
  }, [navigate]); // navigate is now a valid dependency
  
  // Fix: Changed NodeJS.Timeout to number, which is the correct type for browser environments.
  const debounce = (func: Function, delay: number) => {
    let timeout: number;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    loadData();
  }, [loadData]);
  
  useEffect(() => {
    if (activeTab === 'destinations' && selectedDestination) {
      const handleScroll = debounce(() => {
        if (scrollRef.current && cardRefs.current[selectedDestination]) {
          const cardElement = cardRefs.current[selectedDestination];
          const containerRect = scrollRef.current.getBoundingClientRect();
          const cardRect = cardElement.getBoundingClientRect();
          
          const isPartiallyVisible = 
            cardRect.left < containerRect.right && 
            cardRect.right > containerRect.left;
          
          // Collapse card if it's no longer fully visible within the scroll container
          if (!isPartiallyVisible) {
            setSelectedDestination(null);
          }
        }
      }, 100); // 100ms debounce
      
      scrollRef.current?.addEventListener('scroll', handleScroll);
      return () => {
        scrollRef.current?.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activeTab, selectedDestination]);


  return (
    <div className="home-page">
      <div className="home-wellness-preview-section">
        <div className="home-container">
          <div className="home-tab-container">
            <div className="home-tab-navigation">
              <button
                className={`home-tab-btn ${activeTab === 'destinations' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('destinations');
                  setSelectedDestination(null);
                }}
                aria-label="View our destinations"
              >
                Our Destinations
              </button>
              <button
                className={`home-tab-btn ${activeTab === 'programs' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('programs');
                  setSelectedDestination(null);
                }}
                aria-label="View our programs"
              >
                Our Programs
              </button>
              
            </div>
          </div>

          {!loading && (
            <div className="home-horizontal-cards-container">
              <div className="home-scroll-wrapper">
                <button 
                  className="home-scroll-arrow left" 
                  onClick={() => scroll('left')}
                  aria-label="Scroll left"
                >
                  &#8249;
                </button>
                <div className="home-horizontal-scroll" ref={scrollRef}>
                  {activeTab === 'programs' ? (
                    programCategories.map((category) => (
                      <div 
                        key={category.type}
                        className="home-program-card-horizontal"
                        onClick={() => handleProgramClick(category.type)}
                      >
                        <div className="home-card-image-container">
                          <img 
                            src={category.image} 
                            alt={category.type} 
                            className="home-card-image" 
                            loading="lazy"
                          />
                          <div className="home-card-overlay">
                            <div className="home-card-badge">{category.badge}</div>
                            <div className="home-card-content">
                              <h3 className="home-card-title">{category.type}</h3>
                              <p className="home-card-description">{category.description}</p>
                              <button 
                                className="home-card-cta"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleProgramClick(category.type);
                                }}
                              >
                                Explore Programs
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    destinations.map((destination) => (
                      <div 
                        key={destination.country}
                        // Fix: The ref callback now explicitly returns void.
                        ref={el => { cardRefs.current[destination.country] = el; }}
                        className={`home-destination-card-horizontal ${selectedDestination === destination.country ? 'expanded' : ''}`}
                        onClick={() => handleDestinationClick(destination.country)}
                      >
                        <div className="home-destination-card-inner">
                          <div className="home-destination-image-container">
                            <img 
                              src={destination.image} 
                              alt={destination.country} 
                              className="home-destination-image" 
                              loading="lazy"
                            />
                            <div className="home-destination-overlay">
                              <div className="home-destination-badge">Exclusive Retreat</div>
                              <div className="home-destination-content">
                                <h3 className="home-destination-title">{destination.country}</h3>
                                <p className="home-destination-description">Explore destinations in {destination.country}</p>
                                <button 
                                  className="home-destination-cta"
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
                          
                          {selectedDestination === destination.country && (
                            <div className="home-cities-grid visible">
                              <h4>Choose Your City</h4>
                              <div className="home-cities-list">
                                {destination.cities.map((city) => (
                                  <button
                                    key={city}
                                    className="home-city-link"
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
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <button 
                  className="home-scroll-arrow right" 
                  onClick={() => scroll('right')}
                  aria-label="Scroll right"
                >
                  &#8250;
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="home-loading-container">
              <div className="home-loading-spinner"></div>
              <p>Loading wellness experiences...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(HomeProgramPage);
