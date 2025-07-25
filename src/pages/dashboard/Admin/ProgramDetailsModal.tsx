import React from 'react';
import { X } from 'lucide-react';

interface ProgramDetailsModalProps {
  program: {
    title: string;
    creator: string;
    status: string;
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
  };
  onClose: () => void;
}

const ProgramDetailsModal: React.FC<ProgramDetailsModalProps> = ({ program, onClose }) => {
  return (
    <>
      <div className="modal-header">
        <h2>{program.title}</h2>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      
      <div className="modal-content">
        <div className="program-info">
          <div className="info-row">
            <span className="label">Creator:</span>
            <span className="value">{program.creator}</span>
          </div>
          <div className="info-row">
            <span className="label">Location:</span>
            <span className="value">{program.details.location}</span>
          </div>
          <div className="info-row">
            <span className="label">Duration:</span>
            <span className="value">{program.details.duration}</span>
          </div>
          <div className="info-row">
            <span className="label">Price:</span>
            <span className="value">{program.details.bookingOptions.pricePerPerson}</span>
          </div>
          <div className="info-row">
            <span className="label">Status:</span>
            <span className={`status ${program.status}`}>{program.status.toUpperCase()}</span>
          </div>
        </div>
        
        <div className="program-description">
          <h3>Description</h3>
          <p>{program.details.description}</p>
        </div>
        
        <div className="program-includes">
          <h3>What's Included</h3>
          <ul>
            {program.details.includes.map((item, index) => (
              <li key={index}>
                <strong>{item.title}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="program-dates">
          <h3>Available Dates</h3>
          <div className="dates-list">
            {program.details.bookingOptions.availableDates.map((date, index) => (
              <span key={index} className="date-item">
                {new Date(date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            ))}
          </div>
        </div>
        
        <div className="program-gallery">
          <h3>Gallery</h3>
          <div className="gallery-grid">
            {program.details.imageGallery.slice(0, 4).map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramDetailsModal;