import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import { Plus, Edit } from 'lucide-react';
import '../../../styles/FacilityServices.css';
// import { button } from 'framer-motion/client';

interface Service {
  id: number;
  name: string;
  location: string;
  description: string;
  duration: string;
  price: string;
  status: 'active' | 'inactive' | 'pending' | 'draft';
  image: string;
  includes: {
    title: string;
    description: string;
  }[];
}

const FacilityServices: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'inactive' | 'pending' | 'draft'>('active');

    // Mock data - in a real app, this would come from an API
  const services: Service[] = [
    {
      id: 1,
      name: 'Metabolic Reset',
      location: 'Aspen - USA',
      description: 'Optimize your metabolism and reset your body\'s natural rhythms.',
      duration: '6 Days / 5 Nights',
      price: '$3,900',
      status: 'active',
      image: 'https://images.pexels.com/photos/3825587/pexels-photo-3825587.jpeg',
      includes: [
        { title: 'Metabolic rate testing', description: 'Track how efficiently your body burns calories.' },
        { title: 'Glucose and insulin monitoring', description: 'Daily tracking for metabolic clarity.' },
        { title: 'Nutrition plans for balance', description: 'Whole-food diets to stabilize blood sugar.' }
      ]
    },
    {
      id: 2,
      name: 'Desert Longevity Program',
      location: 'Tucson - USA',
      description: 'Epigenetic testing and advanced anti-aging therapies in the Sonoran Desert.',
      duration: '7 Days / 6 Nights',
      price: '$4,200',
      status: 'pending',
      image: 'https://images.pexels.com/photos/3825589/pexels-photo-3825589.jpeg',
      includes: [
        { title: 'Epigenetic testing', description: 'Comprehensive analysis of your biological age.' },
        { title: 'Anti-aging therapies', description: 'Cutting-edge treatments to slow aging.' }
      ]
    },
    {
      id: 3,
      name: 'Mindfulness Retreat',
      location: 'Sedona - USA',
      description: 'Deepen your meditation practice in the red rocks of Sedona.',
      duration: '5 Days / 4 Nights',
      price: '$2,800',
      status: 'inactive',
      image: 'https://images.pexels.com/photos/3825591/pexels-photo-3825591.jpeg',
      includes: [
        { title: 'Daily meditation sessions', description: 'Guided practices for all levels.' },
        { title: 'Yoga classes', description: 'Gentle movement to complement your practice.' }
      ]
    },
    {
      id: 4,
      name: 'Alpine Detox',
      location: 'Swiss Alps - Switzerland',
      description: 'Purify your body with our mountain detox program.',
      duration: '8 Days / 7 Nights',
      price: '$5,500',
      status: 'draft',
      image: 'https://images.pexels.com/photos/4588008/pexels-photo-4588008.jpeg',
      includes: [
        { title: 'Detox protocols', description: 'Gentle cleansing for body and mind.' },
        { title: 'Mountain hikes', description: 'Fresh alpine air to rejuvenate.' }
      ]
    }
  ];

  const filteredServices = services.filter(service => service.status === activeTab);

  const handleAddService = () => {
    navigate('/dashboard/facility/services/new');
  };

  const handleEditService = (id: number) => {
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
            <div key={program.id} className="facility-services__card">
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
                  <h3 className="facility-services__card-title">{program.name}</h3>
                  <p className="facility-services__card-location">{program.location}</p>
                </div>
                
                <p className="facility-services__card-description">{program.description}</p>
                
                <div className="facility-services__card-details">
                  <div className="facility-services__card-detail">
                    <span>Duration:</span>
                    <span>{program.duration}</span>
                  </div>
                  <div className="facility-services__card-detail">
                    <span>Price:</span>
                    <span>{program.price}</span>
                  </div>
                </div>

                {/* <div className="facility-services__card-includes">
                  <h4>Includes:</h4>
                  <ul>
                    {program.includes.map((item, index) => (
                      <li key={index}>
                        <strong>{item.title}:</strong> {item.description}
                      </li>
                    ))}
                  </ul>
                </div> */}

                <button 
                  className="facility-services__card-edit-btn"
                  onClick={() => handleEditService(program.id)}
                >
                  <Edit size={16} />
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