import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X, MapPin, Calendar } from 'lucide-react';
import { fetchProgramCategories, fetchDestinations } from '../api';
import '../styles/ExplorePage.css';
import type { Destination } from '../data/destinations';
import type { ProgramCategory, Program } from '../data/programs';

interface SearchResult {
  type: 'program' | 'destination' | 'city';
  title: string;
  subtitle: string;
  programData?: Program;
  country?: string;
  city?: string;
  categoryType?: string;
}

const ExplorePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'programs' | 'destinations'>(
    location.state?.initialTab === 'destinations' ? 'destinations' : 'programs'
  );
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [programCategories, setProgramCategories] = useState<ProgramCategory[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [categories, dests] = await Promise.all([
          fetchProgramCategories().catch(err => {
            console.error('Error fetching program categories:', err);
            setError('Failed to load some data. Showing available content.');
            return [];
          }),
          fetchDestinations().catch(err => {
            console.error('Error fetching destinations:', err);
            setError('Failed to load some data. Showing available content.');
            return [];
          })
        ]);

        if (categories.length > 0) {
          setProgramCategories(categories);
        }
        if (dests.length > 0) {
          setDestinations(dests);
        }

      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle tab changes from location state
  useEffect(() => {
    if (location.state?.forceReload) {
      setActiveTab(location.state?.initialTab === 'destinations' ? 'destinations' : 'programs');
    }
  }, [location.state]);

  // Generate search results when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const results: SearchResult[] = [];

    // Search programs
    programCategories.forEach(category => {
      category.programs.forEach(program => {
        if (program.name.toLowerCase().includes(searchLower) ||
            program.location.toLowerCase().includes(searchLower) ||
            program.details.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'program',
            title: program.name,
            subtitle: `${program.location} • ${program.duration || 'Duration varies'}`,
            programData: program,
            categoryType: category.type
          });
        }
      });
    });

    // Search destinations
    destinations.forEach(destination => {
      if (destination.country.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'destination',
          title: destination.country,
          subtitle: `${destination.cities.length} cities available`,
          country: destination.country
        });
      }

      destination.cities.forEach(city => {
        if (city.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'city',
            title: city,
            subtitle: destination.country,
            country: destination.country,
            city: city
          });
        }
      });
    });

    setSearchResults(results.slice(0, 8));
  }, [searchTerm, programCategories, destinations]);

  // Filter programs based on search term
  const filteredProgramCategories = programCategories
    .map(category => ({
      ...category,
      programs: category.programs.filter(program =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.details.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => category.programs.length > 0);

  // Filter destinations based on search term
  const filteredDestinations = destinations
    .map(destination => ({
      ...destination,
      cities: destination.cities.filter(city =>
        city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.country.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(destination =>
      destination.cities.length > 0 ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleProgramClick = useCallback((categoryType: string) => {
    navigate('/programs', { state: { type: 'category', categoryType } });
  }, [navigate]);

  const handleDestinationClick = useCallback((country: string) => {
    setSelectedDestination(prev => prev === country ? null : country);
  }, []);

  const handleCityClick = useCallback((country: string, city: string) => {
    navigate('/programs', { state: { type: 'location', country, city } });
  }, [navigate]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(e.target.value.length > 0);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setShowDropdown(false);
    setSearchResults([]);
  }, []);

  const handleViewProgramDetails = useCallback((program: Program) => {
    navigate('/program-details', {
      state: {
        programName: program.name,
        programData: program
      }
    });
    setSearchTerm('');
    setShowDropdown(false);
  }, [navigate]);

  const SearchResultItem = React.memo(({ result }: { result: SearchResult }) => {
    const handleClick = () => {
      if (result.type === 'program' && result.programData) {
        handleViewProgramDetails(result.programData);
      } else if (result.type === 'destination' && result.country) {
        navigate('/programs', { state: { type: 'location', country: result.country } });
      } else if (result.type === 'city' && result.country && result.city) {
        navigate('/programs', { state: { type: 'location', country: result.country, city: result.city } });
      }
      setSearchTerm('');
      setShowDropdown(false);
    };

    return (
      <div className="explore-search-result-item" onClick={handleClick}>
        <div className="explore-search-result-icon">
          {result.type === 'program' ? <Calendar size={16} /> : <MapPin size={16} />}
        </div>
        <div className="explore-search-result-content">
          <div className="explore-search-result-title">{result.title}</div>
          <div className="explore-search-result-subtitle">{result.subtitle}</div>
          {result.type === 'program' && (
            <button 
              className="explore-search-view-details"
              onClick={(e) => {
                e.stopPropagation();
                if (result.programData) handleViewProgramDetails(result.programData);
              }}
            >
              View Program Details
            </button>
          )}
        </div>
        <div className="explore-search-result-type">
          {result.type === 'program' ? 'Program' : result.type === 'city' ? 'City' : 'Country'}
        </div>
      </div>
    );
  });

  const ProgramCard = React.memo(({ 
    category, 
    onClick
  }: { 
    category: ProgramCategory; 
    onClick: (type: string) => void;
  }) => {
    return (
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
    );
  });

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
  }) => {
    return (
      <div 
        className={`explore-destination-card ${isExpanded ? 'expanded' : ''}`}
        onClick={() => onDestinationClick(destination.country)}
      >
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
                <p className="explore-destination-description">
                  Explore destinations in {destination.country}
                </p>
                <button 
                  className="explore-destination-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDestinationClick(destination.country);
                  }}
                >
                  {isExpanded ? 'Hide Cities' : 'Explore Destinations'}
                </button>
              </div>
            </div>
          </div>
          
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
    );
  });

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
      <div className="explore-header">
        <div className="explore-container">
          <h1 className="explore-title">Explore Wellness Experiences</h1>
          <p className="explore-subtitle">
            Discover transformative programs and destinations
          </p>
          
          {error && (
            <div className="explore-error-message">
              {error}
            </div>
          )}
          
          <div className="explore-tab-container">
            <div className="explore-tab-navigation">
              <button
                className={`explore-tab-btn ${activeTab === 'destinations' ? 'active' : ''}`}
                onClick={() => setActiveTab('destinations')}
              >
                Our Destinations
              </button>
              <button
                className={`explore-tab-btn ${activeTab === 'programs' ? 'active' : ''}`}
                onClick={() => setActiveTab('programs')}
              >
                Our Program 
              </button>
              
            </div>
          </div>

          <div className="explore-search-container">
            <div className="explore-search-wrapper">
              <Search className="explore-search-icon" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'programs' ? 'programs...' : 'destinations...'}`}
                value={searchTerm}
                onChange={handleSearchChange}
                className="explore-search-input"
                onFocus={() => searchTerm && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              />
              {searchTerm && (
                <button onClick={clearSearch} className="explore-search-clear">
                  <X size={18} />
                </button>
              )}
            </div>
            
            {showDropdown && searchResults.length > 0 && (
              <div className="explore-search-dropdown">
                <div className="explore-search-dropdown-header">
                  <span>Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchTerm}"</span>
                </div>
                <div className="explore-search-results">
                  {searchResults.map((result, index) => (
                    <SearchResultItem key={`result-${index}`} result={result} />
                  ))}
                </div>
              </div>
            )}
            
            {showDropdown && searchTerm && searchResults.length === 0 && (
              <div className="explore-search-dropdown">
                <div className="explore-search-no-results">
                  <Search size={24} />
                  <span>No results found for "{searchTerm}"</span>
                  <small>Try adjusting your search terms</small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
        
      <div className="explore-cards-section">
        <div className="explore-container">
          {activeTab === 'programs' ? (
            <div className="explore-cards-grid">
              {(searchTerm ? filteredProgramCategories : programCategories).length > 0 ? (
                (searchTerm ? filteredProgramCategories : programCategories).map((category) => (
                  <ProgramCard 
                    key={category.type}
                    category={category}
                    onClick={handleProgramClick}
                  />
                ))
              ) : (
                <div className="explore-no-results">
                  <h3>No program categories found</h3>
                  <p>We couldn't find any program categories matching your search.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="explore-cards-grid">
              {(searchTerm ? filteredDestinations : destinations).length > 0 ? (
                (searchTerm ? filteredDestinations : destinations).map((destination) => (
                  <DestinationCard
                    key={destination.country}
                    destination={destination}
                    isExpanded={selectedDestination === destination.country}
                    onDestinationClick={handleDestinationClick}
                    onCityClick={handleCityClick}
                  />
                ))
              ) : (
                <div className="explore-no-results">
                  <h3>No destinations found</h3>
                  <p>We couldn't find any destinations matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExplorePage);