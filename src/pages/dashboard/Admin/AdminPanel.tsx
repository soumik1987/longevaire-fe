import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import { Check, X, Home, ClipboardList, Users, Search } from 'lucide-react';
import '../../../styles/AdminPanel.css';
import ProgramDetailsModal from '../../../pages/dashboard/Admin/ProgramDetailsModal';
import RemarkModal from '../../../pages/dashboard/Admin/RemarkModal';

interface Program {
  id: number;
  title: string;
  creator: string;
  status: 'pending' | 'approved' | 'rejected';
  details: {
    location: string;
    description: string;
    duration: string;
    includes: {
      title: string;
      description: string;
    }[];
    imageGallery: string[];
    bookingOptions: {
      availableDates: string[];
      pricePerPerson: string;
    };
  };
}

interface Service {
  id: number;
  name: string;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  bookings: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'programs' | 'facilities' | 'users'>('programs');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [rejectingProgramId, setRejectingProgramId] = useState<number | null>(null);
  const [remark, setRemark] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  
const [programs, setPrograms] = useState<Program[]>([
    { 
      id: 1, 
      title: 'Wellness Retreat', 
      creator: 'John Doe', 
      status: 'pending',
      details: {
        location: "Tucson - USA",
        description: "A relaxing wellness retreat in the heart of nature",
        duration: "5 Days / 4 Nights",
        includes: [
          { title: "Daily yoga sessions", description: "Morning and evening yoga for all levels." },
          { title: "Meditation workshops", description: "Guided meditation techniques." },
          { title: "Organic meals", description: "Locally sourced, healthy meals." }
        ],
        imageGallery: [
          "https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg",
          "https://images.pexels.com/photos/3825575/pexels-photo-3825575.jpeg",
          "https://images.pexels.com/photos/3825579/pexels-photo-3825579.jpeg",
          "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg"
        ],
        bookingOptions: {
          availableDates: ["2025-04-15", "2025-06-20"],
          pricePerPerson: "$2,500"
        }
      }
    },
    { 
      id: 2, 
      title: 'Spa Package', 
      creator: 'Jane Smith', 
      status: 'approved',
      details: {
        location: "Bali - Indonesia",
        description: "Luxury spa treatments in a tropical paradise",
        duration: "3 Days / 2 Nights",
        includes: [
          { title: "Massage therapies", description: "Various massage techniques available." },
          { title: "Aromatherapy", description: "Essential oil treatments." },
          { title: "Hydrotherapy", description: "Water-based relaxation therapies." }
        ],
        imageGallery: [
          "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg",
          "https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg"
        ],
        bookingOptions: {
          availableDates: ["2025-03-10", "2025-05-15"],
          pricePerPerson: "$1,800"
        }
      }
    },
    { 
      id: 3, 
      title: 'Desert Longevity Program', 
      creator: 'Robert Johnson', 
      status: 'rejected',
      details: {
        location: "Tucson - USA",
        description: "Advanced anti-aging therapies in the Sonoran Desert",
        duration: "7 Days / 6 Nights",
        includes: [
          { title: "Epigenetic testing", description: "Personalized longevity planning based on DNA." },
          { title: "Hyperbaric oxygen therapy", description: "Promotes faster cellular repair." },
          { title: "Desert plant-based nutraceuticals", description: "Unique herbal formulations." }
        ],
        imageGallery: [
          "https://images.pexels.com/photos/4587999/pexels-photo-4587999.jpeg",
          "https://images.pexels.com/photos/4588008/pexels-photo-4588008.jpeg"
        ],
        bookingOptions: {
          availableDates: ["2025-03-15", "2025-05-20"],
          pricePerPerson: "$4,200"
        }
      }
    },
    { 
      id: 4, 
      title: 'Mountain Adventure', 
      creator: 'Sarah Williams', 
      status: 'pending',
      details: {
        location: "Colorado - USA",
        description: "Outdoor adventure and team building in the Rockies",
        duration: "4 Days / 3 Nights",
        includes: [
          { title: "Hiking expeditions", description: "Guided hikes for all skill levels." },
          { title: "Team building activities", description: "Collaborative outdoor challenges." },
          { title: "Wilderness survival training", description: "Essential survival skills." }
        ],
        imageGallery: [
          "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg",
          "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg"
        ],
        bookingOptions: {
          availableDates: ["2025-07-10", "2025-08-15"],
          pricePerPerson: "$1,950"
        }
      }
    }
  ]);

  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Luxury Spa Room', category: 'Spa', status: 'active', bookings: 12 },
    { id: 2, name: 'Yoga Studio', category: 'Yoga', status: 'active', bookings: 8 },
    { id: 3, name: 'Meditation Room', category: 'Wellness', status: 'inactive', bookings: 0 },
    { id: 4, name: 'Swimming Pool', category: 'Recreation', status: 'pending', bookings: 0 },
    { id: 5, name: 'Sauna', category: 'Spa', status: 'active', bookings: 5 },
    { id: 6, name: 'Fitness Center', category: 'Fitness', status: 'active', bookings: 15 }
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Member', joinDate: '2025-01-15', status: 'active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Creator', joinDate: '2025-02-20', status: 'active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', joinDate: '2025-03-05', status: 'inactive' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Member', joinDate: '2025-04-10', status: 'active' },
    { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'Creator', joinDate: '2025-05-15', status: 'inactive' }
  ]);

  const filteredPrograms = programs.filter(program => 
    program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeProgramDetails();
      }
    };

    if (selectedProgram) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedProgram]);

  const handleApprove = (id: number) => {
    setPrograms(programs.map(program => 
      program.id === id ? { ...program, status: 'approved' } : program
    ));
  };

  const handleReject = (id: number) => {
    setRejectingProgramId(id);
    setShowRemarkModal(true);
  };

  const confirmReject = () => {
    if (rejectingProgramId) {
      setPrograms(programs.map(program => 
        program.id === rejectingProgramId ? { ...program, status: 'rejected', remark } : program
      ));
      setShowRemarkModal(false);
      setRemark('');
      setRejectingProgramId(null);
    }
  };

  const toggleServiceStatus = (id: number) => {
    setServices(services.map(service => {
      if (service.id === id) {
        return {
          ...service,
          status: service.status === 'active' ? 'inactive' : 'active'
        };
      }
      return service;
    }));
  };

  const toggleUserStatus = (id: number) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    }));
  };

  const openProgramDetails = (program: Program) => {
    setSelectedProgram(program);
  };

  const closeProgramDetails = () => {
    setSelectedProgram(null);
  };

  return (
    <DashboardLayout role="admin">
      <div className="admin-panel-container">
        <h1>ADMIN PANEL</h1>
        
        <div className="admin-tabs">
          <button 
            className={`tab ${activeTab === 'programs' ? 'active' : ''}`}
            onClick={() => setActiveTab('programs')}
          >
            <ClipboardList size={16} />
            Programs
          </button>
          <button 
            className={`tab ${activeTab === 'facilities' ? 'active' : ''}`}
            onClick={() => setActiveTab('facilities')}
          >
            <Home size={16} />
            Facilities
          </button>
          <button 
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={16} />
            Users
          </button>
        </div>
        
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="tab-content">
          {activeTab === 'programs' && (
            <div className="programs-section">
              <h2>Program Approval</h2>
              <div className="programs-list">
                {filteredPrograms.filter(p => p.status === 'pending').length > 0 ? (
                  filteredPrograms.filter(p => p.status === 'pending').map(program => (
                    <div key={program.id} className="program-item">
                      <div className="program-header" onClick={() => openProgramDetails(program)}>
                        <h3>{program.title}</h3>
                        <p>Creator: {program.creator}</p>
                        <span className={`status ${program.status}`}>
                          {program.status.toUpperCase()}
                        </span>
                      </div>
                      {program.status === 'pending' && (
                        <div className="actions">
                          <button 
                            className="approve-button"
                            onClick={() => handleApprove(program.id)}
                          >
                            <Check size={16} /> Approve
                          </button>
                          <button 
                            className="reject-button"
                            onClick={() => handleReject(program.id)}
                          >
                            <X size={16} /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="no-programs">No programs pending approval</p>
                )}
              </div>
              
              <div className="programs-status">
                <div className="status-section">
                  <h3>Approved Programs ({filteredPrograms.filter(p => p.status === 'approved').length})</h3>
                  {filteredPrograms.filter(p => p.status === 'approved').map(program => (
                    <div key={program.id} className="status-item approved" onClick={() => openProgramDetails(program)}>
                      {program.title} <span>by {program.creator}</span>
                    </div>
                  ))}
                </div>
                
                <div className="status-section">
                  <h3>Rejected Programs ({filteredPrograms.filter(p => p.status === 'rejected').length})</h3>
                  {filteredPrograms.filter(p => p.status === 'rejected').map(program => (
                    <div key={program.id} className="status-item rejected" onClick={() => openProgramDetails(program)}>
                      {program.title} <span>by {program.creator}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'facilities' && (
            <div className="facilities-section">
              <h2>Facility Services ({filteredServices.length})</h2>
              <div className="facilities-table-container">
                <table className="facilities-table">
                  <thead>
                    <tr>
                      <th>Service Name</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Bookings</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServices.map(service => (
                      <tr key={service.id}>
                        <td>{service.name}</td>
                        <td>{service.category}</td>
                        <td>
                          <span className={`service-status ${service.status}`}>
                            {service.status}
                          </span>
                        </td>
                        <td>{service.bookings}</td>
                        <td>
                          {service.status !== 'pending' && (
                            <button 
                              className={`status-toggle ${service.status === 'active' ? 'deactivate' : 'activate'}`}
                              onClick={() => toggleServiceStatus(service.id)}
                            >
                              {service.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="add-service-button">
                  + ADD NEW SERVICE
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="users-section">
              <div className="users-management">
                <h2>User Management ({filteredUsers.length})</h2>
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Join Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                        <td>
                          <span className={`user-status ${user.status}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            className={`status-toggle ${user.status === 'active' ? 'deactivate' : 'activate'}`}
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="analytics-section">
                <h2>Platform Analytics</h2>
                <div className="analytics-grid">
                  <div className="analytics-card">
                    <h3>TOTAL PROGRAMS</h3>
                    <p className="value">{programs.length}</p>
                  </div>
                  <div className="analytics-card">
                    <h3>APPROVAL RATE</h3>
                    <p className="value">
                      {programs.length > 0 
                        ? `${Math.round((programs.filter(p => p.status === 'approved').length / programs.length) * 100)}%` 
                        : '0%'}
                    </p>
                  </div>
                  <div className="analytics-card">
                    <h3>ACTIVE USERS</h3>
                    <p className="value">{users.filter(u => u.status === 'active').length}</p>
                  </div>
                  <div className="analytics-card">
                    <h3>REVENUE (MTD)</h3>
                    <p className="value">$12,450</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {selectedProgram && (
        <div className="modal-overlay">
          <div className="program-details-modal" ref={modalRef}>
            <ProgramDetailsModal 
              program={selectedProgram} 
              onClose={closeProgramDetails} 
            />
          </div>
        </div>
      )}
      
      {showRemarkModal && (
        <RemarkModal 
          onConfirm={confirmReject}
          onCancel={() => {
            setShowRemarkModal(false);
            setRemark('');
            setRejectingProgramId(null);
          }}
          remark={remark}
          setRemark={setRemark}
        />
      )}
    </DashboardLayout>
  );
};

export default AdminPanel;