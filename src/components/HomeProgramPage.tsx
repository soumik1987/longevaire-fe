// import React, { useEffect, useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchProgramCategories, fetchDestinations } from '../api';
// import type { Destination } from '../data/destinations';
// import type { ProgramCategory } from '../data/programs';
// import '../styles/HomeProgramPage.css';

// const HomeProgramPage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'programs' | 'destinations'>('programs');
//   const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
//   const [programCategories, setProgramCategories] = useState<ProgramCategory[]>([]);
//   const [destinations, setDestinations] = useState<Destination[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Memoized data loading function
//   const loadData = useCallback(async () => {
//     try {
//       setLoading(true);
//       const [categories, dests] = await Promise.all([
//         fetchProgramCategories(),
//         fetchDestinations()
//       ]);
      
//       setProgramCategories(categories);
//       setDestinations(dests);
//     } catch (error) {
//       console.error('Error loading data:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const handleProgramClick = useCallback((categoryType: string) => {
//     navigate('/programs', { state: { type: 'category', categoryType } });
//   }, [navigate]);

//   const handleDestinationClick = useCallback((country: string) => {
//     setSelectedDestination(prev => prev === country ? null : country);
//   }, []);

//   const handleCityClick = useCallback((country: string, city: string) => {
//     navigate('/programs', { state: { type: 'location', country, city } });
//   }, [navigate]);

//   return (
//     <div className="home-page">

//       {/* Wellness Preview Section */}
//       <div className="home-wellness-preview-section">
//         <div className="home-container">
//           <h2 className="home-section-title">Explore Wellness Experiences</h2>
//           <p className="home-section-subtitle">
//             Discover transformative programs and destinations designed for your optimal well-being
//           </p>
          
//           {/* Tab Navigation */}
//           <div className="home-tab-container">
//             <div className="home-tab-navigation">
//               <button
//                 className={`home-tab-btn ${activeTab === 'programs' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('programs')}
//                 aria-label="View our programs"
//               >
//                 Our Programs
//               </button>
//               <button
//                 className={`home-tab-btn ${activeTab === 'destinations' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('destinations')}
//                 aria-label="View our destinations"
//               >
//                 Our Destinations
//               </button>
//             </div>
//           </div>

//           {/* Horizontal Scrolling Cards */}
//           {!loading && (
//             <div className="home-horizontal-cards-container">
//               {activeTab === 'programs' ? (
//                 <div className="home-horizontal-scroll">
//                   {programCategories.map((category) => (
//                     <ProgramCard 
//                       key={category.type}
//                       category={category}
//                       onClick={handleProgramClick}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="home-horizontal-scroll">
//                   {destinations.map((destination) => (
//                     <DestinationCard
//                       key={destination.country}
//                       destination={destination}
//                       isExpanded={selectedDestination === destination.country}
//                       onDestinationClick={handleDestinationClick}
//                       onCityClick={handleCityClick}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {loading && (
//             <div className="home-loading-container">
//               <div className="home-loading-spinner"></div>
//               <p>Loading wellness experiences...</p>
//             </div>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// };

// // Memoized Program Card Component (same as explore page but for horizontal scroll)
// const ProgramCard = React.memo(({ 
//   category, 
//   onClick 
// }: { 
//   category: ProgramCategory; 
//   onClick: (type: string) => void 
// }) => (
//   <div className="home-program-card-horizontal" onClick={() => onClick(category.type)}>
//     <div className="home-card-image-container">
//       <img 
//         src={category.image} 
//         alt={category.type} 
//         className="home-card-image" 
//         loading="lazy"
//       />
//       <div className="home-card-overlay">
//         <div className="home-card-badge">{category.badge}</div>
//         <div className="home-card-content">
//           <h3 className="home-card-title">{category.type}</h3>
//           <p className="home-card-description">{category.description}</p>
//           <button className="home-card-cta">Explore Programs</button>
//         </div>
//       </div>
//     </div>
//   </div>
// ));

// // Memoized Destination Card Component (same as explore page but for horizontal scroll)
// const DestinationCard = React.memo(({ 
//   destination, 
//   isExpanded, 
//   onDestinationClick, 
//   onCityClick 
// }: { 
//   destination: Destination; 
//   isExpanded: boolean; 
//   onDestinationClick: (country: string) => void;
//   onCityClick: (country: string, city: string) => void;
// }) => (
//   <div className={`home-destination-card-horizontal ${isExpanded ? 'expanded' : ''}`}>
//     <div className="home-destination-card-inner">
//       <div className="home-destination-image-container">
//         <img 
//           src={destination.image} 
//           alt={destination.country} 
//           className="home-destination-image" 
//           loading="lazy"
//         />
//         <div className="home-destination-overlay">
//           <div className="home-destination-badge">Exclusive Retreat</div>
//           <div className="home-destination-content">
//             <h3 className="home-destination-title">{destination.country}</h3>
//             <p className="home-destination-description">Explore destinations in {destination.country}</p>
//             <button 
//               className="home-destination-cta"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDestinationClick(destination.country);
//               }}
//               aria-label={`${isExpanded ? 'Hide' : 'Show'} cities in ${destination.country}`}
//             >
//               {isExpanded ? 'Hide Cities' : 'Explore Destinations'}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Cities Grid - Only rendered when expanded */}
//       {isExpanded && (
//         <div className="home-cities-grid visible">
//           <h4>Choose Your City</h4>
//           <div className="home-cities-list">
//             {destination.cities.map((city) => (
//               <button
//                 key={city}
//                 className="home-city-link"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onCityClick(destination.country, city);
//                 }}
//               >
//                 {city}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// ));

// export default React.memo(HomeProgramPage);



import React, { useEffect, useState, useCallback } from 'react';
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
  const navigate = useNavigate();

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
    loadData();
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

  return (
    <div className="home-page">
      {/* Wellness Preview Section */}
      <div className="home-wellness-preview-section">
        <div className="home-container">
          <h2 className="home-section-title">Explore Wellness Experiences</h2>
          <p className="home-section-subtitle">
            Discover transformative programs and destinations designed for your optimal well-being
          </p>
          
          {/* Tab Navigation */}
          <div className="home-tab-container">
            <div className="home-tab-navigation">
              <button
                className={`home-tab-btn ${activeTab === 'programs' ? 'active' : ''}`}
                onClick={() => setActiveTab('programs')}
                aria-label="View our programs"
              >
                Our Programs
              </button>
              <button
                className={`home-tab-btn ${activeTab === 'destinations' ? 'active' : ''}`}
                onClick={() => setActiveTab('destinations')}
                aria-label="View our destinations"
              >
                Our Destinations
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Cards */}
          {!loading && (
            <div className="home-horizontal-cards-container">
              {activeTab === 'programs' ? (
                <div className="home-horizontal-scroll">
                  {programCategories.map((category) => (
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
                  ))}
                </div>
              ) : (
                <div className="home-horizontal-scroll">
                  {destinations.map((destination) => (
                    <div 
                      key={destination.country}
                      className={`home-destination-card-horizontal ${selectedDestination === destination.country ? 'expanded' : ''}`}
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
                  ))}
                </div>
              )}
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