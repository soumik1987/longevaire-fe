// src/pages/dashboard/User/UserServices.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import { Plus, Edit } from 'lucide-react';
import '../../../styles/UserServices.css';

interface Program {
  id: string;
  name: string;
  location: string;
  description: string;
  duration: string;
  price: string;
  status: 'booked' | 'approved' | 'pending' | 'draft' | 'inactive';
   includes: {
    title: string;
    description: string;
  }[];
  image: string;
 
}

const UserServices: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'booked' | 'approved' | 'pending' | 'draft' | 'inactive'>('approved');
  
  // Mock data - matches your design exactly
  const programs: Program[] = [
    {
      id: '1',
      name: 'Desert Longevity Program',
      location: 'Aspen - USA',
      description: 'Advanced anti-aging therapies in the Sonoran Desert',
      duration: '6 Days / 5 Nights',
      price: '$3,900',
      status: 'booked',
      image: 'https://images.pexels.com/photos/3825587/pexels-photo-3825587.jpeg',
      includes: [
          { title: "Epigenetic testing and analysis", description: "Personalized longevity planning based on your DNA." },
          { title: "Hyperbaric oxygen therapy", description: "Oxygenate tissues to promote faster cellular repair." },
          { title: "Desert plant-based nutraceuticals", description: "Herbal formulations unique to the Sonoran desert." },
          { title: "Heat adaptation training", description: "Train your body to regulate temperature and improve performance." },
          { title: "Sleep optimization program", description: "Techniques and tools to enhance sleep cycles." }
        ],
    },
    {
      id: '2',
      name: 'Metabolic Reset',
      location: 'Aspen - USA',
      description: 'Optimize your metabolism and reset your body\'s natural rhythms.',
      duration: '6 Days / 5 Nights',
      price: '$3,900',
      status: 'approved',
      image: 'https://images.pexels.com/photos/3825587/pexels-photo-3825587.jpeg',
      includes: [
        { title: 'Metabolic rate testing', description: 'Track how efficiently your body burns calories.' },
        { title: 'Glucose and insulin monitoring', description: 'Daily tracking for metabolic clarity.' },
        { title: 'Nutrition plans for balance', description: 'Whole-food diets to stabilize blood sugar.' }
      ]
    },
    {
      id: '3',
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
      id: '4',
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
      id: '5',
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

  const filteredPrograms = programs.filter(program => program.status === activeTab);

  const handleBookService = () => {
    navigate('/explore');
  };

  const handleAddService = () => {
    navigate('/dashboard/user/services/new');
  };

  const handleEditProgram = (id: string) => {
    navigate(`/dashboard/user/services/edit/${id}`);
  };

  // const getStatusLabel = (status: string) => {
  //   switch (status) {
  //     case 'approved': return 'ACTIVE';
  //     case 'pending': return 'PENDING';
  //     case 'draft': return 'DRAFT';
  //     case 'inactive': return 'INACTIVE';
  //     case 'booked': return 'BOOKED';
  //     default: return '';
  //   }
  // };

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'approved': return '#10B981';
  //     case 'pending': return '#F59E0B';
  //     case 'draft': return '#3B82F6';
  //     case 'inactive': return '#EF4444';
  //     case 'booked': return '#4F46E5';
  //     default: return '#6B7280';
  //   }
  // };

  return (
    <DashboardLayout role="user">
      <div className="user-services">
        <div className="user-services__header">
          <h1 className="user-services__title">MY PROGRAMS</h1>
          <div className="button-group">
            <button className="primary-button" onClick={handleBookService}>
              <Plus size={16} />
              BOOK A SERVICE
            </button>
            <button className="secondary-button" onClick={handleAddService}>
              <Plus size={16} />
              ADD A SERVICE
            </button>
          </div>
        </div>

        <div className="user-services__tabs">
          <button
            className={`user-services__tab ${activeTab === 'booked' ? 'active' : ''}`}
            onClick={() => setActiveTab('booked')}
          >
            Previously Booked
          </button>
          <button
            className={`user-services__tab ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            Approved
          </button>
          <button
            className={`user-services__tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button
            className={`user-services__tab ${activeTab === 'draft' ? 'active' : ''}`}
            onClick={() => setActiveTab('draft')}
          >
            Drafts
          </button>
          <button
            className={`user-services__tab ${activeTab === 'inactive' ? 'active' : ''}`}
            onClick={() => setActiveTab('inactive')}
          >
            Inactive
          </button>
        </div>
        
        <div className="user-services__grid">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map(program => (
              <div key={program.id} className="user-services__card">
                <div className="user-services__card-image-container">
                  <img 
                    src={program.image} 
                    alt={program.name} 
                    className="user-services__card-image" 
                  />
                  <span 
                    className={`user-services__status-badge ${program.status}`}
                  >
                    {program.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="user-services__card-content">
                  <div className="user-services__card-header">
                    <h3 className="user-services__card-title">{program.name}</h3>
                    <p className="user-services__card-location">{program.location}</p>
                  </div>
                  
                  <p className="user-services__card-description">{program.description}</p>
                  
                  <div className="user-services__card-details">
                    <div className="user-services__card-detail">
                      <span>Duration:</span>
                      <span>{program.duration}</span>
                    </div>
                    <div className="user-services__card-detail">
                      <span>Price:</span>
                      <span>{program.price}</span>
                    </div>
                  </div>

                  {program.status !== 'booked' && (
                    <button 
                      className="user-services__card-edit-btn"
                      onClick={() => handleEditProgram(program.id)}
                    >
                      <Edit size={16} />
                      EDIT PROGRAM
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="user-services__empty">
              <div className="empty-icon">
                <img src="/placeholder-services.png" alt="No services" />
              </div>
              <h2>You don't have any {activeTab} programs</h2>
              <p>When you {activeTab === 'booked' ? 'book' : 'add'} a wellness program, it will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserServices;