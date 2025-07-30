import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import { Plus } from 'lucide-react';
import '../../../styles/FacilityServices.css';

interface Service {
  id: number;
  name: string;
  location: string;
  highlights: string[];
  description: string[];
  duration: string;
  price: string;
  terms: string[];
  status: 'active' | 'inactive' | 'pending' | 'draft';
  image: string;
}

const FacilityServices: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'inactive' | 'pending' | 'draft'>('active');

  // Sample data for each tab
  const services: Service[] = [
    // Active tab example (matches the image exactly)
    {
      id: 1,
      name: 'All You Can Spa',
      location: 'TUCSON & LENOX',
      highlights: ['$1,000 in Daily Spa Services'],
      description: [
        'Indulge in unlimited spa services from a',
        'list of our guest-favorite treatments and',
        'gain exclusive access to our first-ever',
        'secret spa menu-revealed upon arrival',
        'and available solely to All You Can Spa'
      ],
      duration: '2 night minimum',
      price: 'From $1,500 per guest/night*',
      terms: [
        'Book by September 15,2025',
        'Stay by September 30,2025'
      ],
      status: 'active',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    // Inactive tab example
    {
      id: 2,
      name: 'Mountain Wellness Retreat',
      location: 'ASPEN - USA',
      highlights: ['Daily yoga sessions', 'Guided mountain hikes'],
      description: [
        'Reconnect with nature in the peaceful',
        'mountains of Aspen with our wellness',
        'program designed to refresh your mind',
        'and body through outdoor activities'
      ],
      duration: '5 Days / 4 Nights',
      price: '$2,800',
      terms: [
        'Book by August 30,2025',
        'Stay by December 15,2025'
      ],
      status: 'inactive',
      image: 'https://images.pexels.com/photos/3825587/pexels-photo-3825587.jpeg'
    },
    // Pending tab example
    {
      id: 3,
      name: 'Desert Detox Program',
      location: 'SEDONA - USA',
      highlights: ['Daily meditation', 'Nutrition counseling'],
      description: [
        'Purify your body and mind with our',
        'desert detox program featuring',
        'ancient healing techniques adapted',
        'for modern wellness seekers'
      ],
      duration: '7 Days / 6 Nights',
      price: '$3,500',
      terms: [
        'Book by October 15,2025',
        'Stay by March 30,2026'
      ],
      status: 'pending',
      image: 'https://images.pexels.com/photos/3825589/pexels-photo-3825589.jpeg'
    },
    // Draft tab example
    {
      id: 4,
      name: 'Alpine Fitness Challenge',
      location: 'SWISS ALPS - SWITZERLAND',
      highlights: ['High-altitude training', 'Personal coaching'],
      description: [
        'Push your limits with our intensive',
        'alpine fitness program designed to',
        'maximize your endurance and strength',
        'in breathtaking mountain scenery'
      ],
      duration: '10 Days / 9 Nights',
      price: '$5,200',
      terms: [
        'Book by November 30,2025',
        'Stay by April 30,2026'
      ],
      status: 'draft',
      image: 'https://images.pexels.com/photos/4588008/pexels-photo-4588008.jpeg'
    }
  ];

  const filteredServices = services.filter(service => service.status === activeTab);

  const handleAddService = () => {
    navigate('/dashboard/facility/services/new');
  };

  const handleViewService = (programName: string) => {
    navigate('/program-details', {
      state: { programName }
    });
  };

  const handleEditService = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event from firing
    navigate(`/dashboard/facility/services/edit/${id}`);
  };

  return (
    <DashboardLayout role="facility">
      <div className="facility-services">
        <div className="facility-services__header">
          <h1 className="facility-services__title">FACILITY PROGRAMS</h1>
          <button className="facility-services__add-btn" onClick={handleAddService}>
            <Plus size={16} />
            ADD NEW PROGRAM
          </button>
        </div>

        <div className="facility-services__tabs">
          <button
            className={`facility-services__tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button
            className={`facility-services__tab ${activeTab === 'inactive' ? 'active' : ''}`}
            onClick={() => setActiveTab('inactive')}
          >
            Inactive
          </button>
          <button
            className={`facility-services__tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button
            className={`facility-services__tab ${activeTab === 'draft' ? 'active' : ''}`}
            onClick={() => setActiveTab('draft')}
          >
            Drafts
          </button>
        </div>
        
        <div className="facility-services__grid">
          {filteredServices.map(program => (
            <div 
              key={program.id} 
              className="facility-services__card"
              onClick={() => handleViewService(program.name)}
            >
              <div className="facility-services__card-image-container">
                <img 
                  src={program.image} 
                  alt={program.name} 
                  className="facility-services__card-image" 
                />
                <span className={`facility-services__status-badge ${program.status}`}>
                  {program.status.toUpperCase()}
                </span>
              </div>
              
              <div className="facility-services__card-content">
                <div className="facility-services__card-header">
                  <p className="facility-services__card-location">{program.location}</p>
                  <h3 className="facility-services__card-title">{program.name}</h3>
                </div>
                
                <div className="facility-services__card-highlight">
                  <div className='facilty-service__car-highlight-content'>
                  {program.highlights.map((highlight, index) => (
                    <p key={index} className="facility-services__card-highlight-text">
                      {highlight}
                    </p>
                  ))}
                  </div>
                </div>

                <div className="facility-services__card-description">
                  {program.description.map((line, index) => (
                    <p key={index} className="facility-services__card-description-line">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="facility-services__card-details">
                  <p className="facility-services__card-duration">{program.duration}</p>
                  <p className="facility-services__card-price">{program.price}</p>
                </div>

                <div className="facility-services__card-terms">
                  {program.terms.map((term, index) => (
                    <p key={index} className="facility-services__card-term">
                      {term}
                    </p>
                  ))}
                </div>

                <button 
                  className="facility-services__card-edit-btn"
                  onClick={(e) => handleEditService(program.id, e)}
                >
                  EDIT PROGRAM
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacilityServices;