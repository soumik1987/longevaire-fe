
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { fetchProgramCategories, fetchProgramsByLocation } from '../api';
// import '../styles/ProgramListsPage.css';
// import type { Program } from '../data/programs';

// interface LocationState {
//   type: 'category' | 'location';
//   categoryType?: string;
//   country?: string;
//   city?: string;
// }

// const ProgramListPage: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [programs, setPrograms] = useState<Program[]>([]);
//   const [pageTitle, setPageTitle] = useState('');
//   const [pageSubtitle, setPageSubtitle] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       window.scrollTo(0, 0);
//       const state = location.state as LocationState;
      
//       if (!state) {
//         navigate('/explore');
//         return;
//       }

//       try {
//         if (state.type === 'category' && state.categoryType) {
//           // For categories, we still use local data as we have the full structure
//           const allCategories = await fetchProgramCategories();
//           const category = allCategories.find(cat => cat.type === state.categoryType);
//           if (category) {
//             setPrograms(category.programs);
//             setPageTitle(category.type);
//             setPageSubtitle(category.description);
//           }
//         } else if (state.type === 'location' && state.country) {
//           const locationPrograms = await fetchProgramsByLocation(state.country, state.city);
//           setPrograms(locationPrograms);
//           setPageTitle(`Programs in ${state.country}${state.city ? ` - ${state.city}` : ''}`);
//           setPageSubtitle(`Discover wellness experiences in ${state.country}${state.city ? `, ${state.city}` : ''}`);
//         }
//       } catch (error) {
//         console.error('Error loading programs:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [location.state, navigate]);

//   const handleProgramClick = (programName: string) => {
//     navigate('/program-details', { state: { programName } });
//   };

//   const handleBackClick = () => {
//     navigate('/explore');
//   };

//   if (loading) {
//     return (
//       <div className="program-list-page">
//         <div className="container loading-container">
//           <div className="loading-spinner"></div>
//           <p>Loading programs...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="program-list-page">
//       {/* Header Section */}
//       <div className="program-list-header">
//         <div className="container">
//           <button className="back-button" onClick={handleBackClick}>
//             ← Back to Explore
//           </button>
//           <h1 className="page-title">{pageTitle}</h1>
//           <p className="page-subtitle">{pageSubtitle}</p>
//         </div>
//       </div>

//       {/* Programs Grid */}
//       <div className="programs-section">
//         <div className="container">
//           {programs.length > 0 ? (
//             <div className="programs-grid">
//               {programs.map((program, index) => (
//                 <div 
//                   key={index} 
//                   className="program-list-card"
//                   onClick={() => handleProgramClick(program.name)}
//                 >
//                   <div className="program-card-content">
//                     <h3 className="program-name">{program.name}</h3>
//                     <p className="program-brief">{program.details}</p>
//                     <div className="program-location">
//                       <span className="location-icon">📍</span>
//                       <span>{program.location}</span>
//                     </div>
//                     {program.duration && (
//                       <div className="program-duration">
//                         <span className="duration-icon">⏱️</span>
//                         <span>{program.duration}</span>
//                       </div>
//                     )}
//                     <button className="learn-more-btn">
//                       Learn More
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="no-programs">
//               <h3>No programs found</h3>
//               <p>We couldn't find any programs matching your criteria.</p>
//               <button className="back-button" onClick={handleBackClick}>
//                 Back to Explore
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgramListPage;


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProgramCategories, fetchProgramsByLocation } from '../api';
import '../styles/ProgramListsPage.css';
import type { Program } from '../data/programs';

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
  const [loading, setLoading] = useState(true);

  // Transform program data to match the reference image structure
  const transformProgramData = (programs: Program[]) => {
    return programs.map(program => ({
      ...program,
      // Add fields needed for the reference image layout
      specialOffer: program.highlights?.[0] || '', // Using first highlight as special offer
      nights: program.duration || 'Custom Duration',
      pricing: program.bookingOptions?.pricePerPerson || 'Contact for pricing',
      bookingDate: program.bookingOptions?.availableDates[0]?.split('-').reverse().join('/') || 'N/A',
      stayDate: program.bookingOptions?.availableDates[0]?.split('-').reverse().join('/') || 'N/A',
      imageUrl: program.imageGallery?.[0] || 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg'
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      window.scrollTo(0, 0);
      const state = location.state as LocationState;
      
      if (!state) {
        navigate('/explore');
        return;
      }

      try {
        if (state.type === 'category' && state.categoryType) {
          const allCategories = await fetchProgramCategories();
          const category = allCategories.find(cat => cat.type === state.categoryType);
          if (category) {
            setPrograms(transformProgramData(category.programs));
            setPageTitle(category.type);
            setPageSubtitle(category.description);
          }
        } else if (state.type === 'location' && state.country) {
          const locationPrograms = await fetchProgramsByLocation(state.country, state.city);
          setPrograms(transformProgramData(locationPrograms));
          setPageTitle(`Programs in ${state.country}${state.city ? ` - ${state.city}` : ''}`);
          setPageSubtitle(`Discover wellness experiences in ${state.country}${state.city ? `, ${state.city}` : ''}`);
        }
      } catch (error) {
        console.error('Error loading programs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [location.state, navigate]);

  const handleProgramClick = (programName: string) => {
    navigate('/program-details', { state: { programName } });
  };

  const handleBackClick = () => {
    navigate('/explore');
  };

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
                  <div 
                    className="program-image" 
                    style={{ backgroundImage: `url(${program.imageUrl})` }}
                  ></div>
                  
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