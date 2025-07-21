import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProgramByName } from '../api';
import BookingModal from '../components/BookingModal';
import '../styles/ProgramDetailsPage.css';
import type { Program } from '../data/programs';

interface LocationState {
  programName: string;
}

const ProgramDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgram = async () => {
      window.scrollTo(0, 0);
      const state = location.state as LocationState;
      
      if (!state?.programName) {
        setProgram(null);
        setLoading(false);
        return;
      }
      
      try {
        const foundProgram = await fetchProgramByName(state.programName);
        setProgram(foundProgram || null);
      } catch (error) {
        console.error('Error loading program:', error);
        setProgram(null);
      } finally {
        setLoading(false);
      }
    };

    loadProgram();
  }, [location.state]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleBookNowClick = () => {
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingModal(false);
  };

  if (loading) {
    return (
      <div className="program-details-page">
        <div className="container loading-container">
          <div className="loading-spinner"></div>
          <p>Loading program details...</p>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="program-details-page">
        <div className="container">
          <div className="loading">
            {location.state?.programName 
              ? "Could not load program details." 
              : "No program selected. Please select a program from the list."}
          </div>
          <button onClick={() => navigate('/explore')} className="back-button">
            Back to Programs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="program-details-page">
      {/* Hero Banner */}
      <div className="program-hero">
        <div className="hero-image-container">
          <img 
            src={program.imageGallery?.[0] || "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1200"} 
            alt={program.name}
            className="hero-image"
          />
          <div className="hero-overlay">
            <div className="container">
              <button className="back-button" onClick={handleBackClick}>
                ← Back
              </button>
              <div className="hero-content">
                <h1 className="program-title">{program.name}</h1>
                <p className="program-location-hero">
                  <span className="location-icon">📍</span>
                  {program.location}
                </p>
                {program.duration && (
                  <p className="program-duration-hero">
                    <span className="duration-icon">⏱️</span>
                    {program.duration}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Details Content */}
      <div className="program-content">
        <div className="container">
          <div className="content-grid">
            {/* Main Content */}
            <div className="main-content">
              {/* Description */}
              <section className="content-section">
                <h2 className="section-title">Program Overview</h2>
                <p className="program-description">
                  {program.description || program.details}
                </p>
              </section>

              {/* Highlights */}
              {program.highlights && program.highlights.length > 0 && (
                <section className="content-section">
                  <h2 className="section-title">Program Highlights</h2>
                  <ul className="highlights-list">
                    {program.highlights.map((highlight, index) => (
                      <li key={index} className="highlight-item">
                        <span className="highlight-icon">✨</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Benefits */}
              {program.benefits && program.benefits.length > 0 && (
                <section className="content-section">
                  <h2 className="section-title">Key Benefits</h2>
                  <ul className="benefits-list">
                    {program.benefits.map((benefit, index) => (
                      <li key={index} className="benefit-item">
                        <span className="benefit-icon">💫</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="sidebar">
              {/* Booking Card */}
              <div className="booking-card">
                <h3 className="booking-title">Ready to Transform?</h3>
                <div className="program-info">
                  <div className="info-item">
                    <span className="info-label">Duration:</span>
                    <span className="info-value">{program.duration || 'Contact for details'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Location:</span>
                    <span className="info-value">{program.location}</span>
                  </div>
                  {program.bookingOptions?.pricePerPerson && (
                    <div className="info-item">
                      <span className="info-label">Starting from:</span>
                      <span className="info-value price">{program.bookingOptions.pricePerPerson}</span>
                    </div>
                  )}
                </div>
                <button className="book-now-btn" onClick={handleBookNowClick}>
                  Book Now
                </button>
                <p className="booking-note">
                  Secure your spot with our wellness experts
                </p>
              </div>

              {/* Available Dates */}
              {program.bookingOptions?.availableDates && (
                <div className="dates-card">
                  <h4 className="dates-title">Available Dates</h4>
                  <div className="dates-list">
                    {program.bookingOptions.availableDates.map((date, index) => (
                      <div key={index} className="date-item">
                        {new Date(date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          program={program}
          onClose={() => setShowBookingModal(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default ProgramDetailsPage;