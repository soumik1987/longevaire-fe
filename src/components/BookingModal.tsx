import React, { useState } from 'react';
import type { Program } from '../data/programs';
import '../styles/BookingModal.css';

interface BookingModalProps {
  program: Program;
  onClose: () => void;
  onSuccess: () => void;
}

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ program, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    preferredDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, email, phone, preferredDate } = formData;
    if (!name.trim() || !email.trim() || !phone.trim() || !preferredDate.trim()) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) return false;

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill in all fields correctly.');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Booking submitted:', {
        program: program.name,
        ...formData
      });

      setShowConfirmation(true);

      setTimeout(() => {
        onSuccess();
      }, 3000);

    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={e => e.stopPropagation()}>
        {!showConfirmation ? (
          <>
            <div className="modal-header">
              <h2 className="modal-title">Book Your Experience</h2>
              <button className="close-button" onClick={onClose}>×</button>
            </div>

            <div className="modal-content">
              <div className="program-summary">
                <h3 className="program-name">{program.name}</h3>
                <p className="program-location">
                  <span className="location-icon">📍</span>
                  {program.location}
                </p>
                {program.duration && (
                  <p className="program-duration">
                    <span className="duration-icon">⏱️</span>
                    {program.duration}
                  </p>
                )}
              </div>

              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preferredDate" className="form-label">Preferred Date *</label>
                  {program.bookingOptions?.availableDates ? (
                    <select
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select a date</option>
                      {program.bookingOptions.availableDates.map((date, index) => (
                        <option key={index} value={date}>
                          {new Date(date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  )}
                </div>

                <button
                  type="submit"
                  className={`submit-button ${isSubmitting || !validateForm() ? 'disabled' : ''}`}
                  disabled={isSubmitting || !validateForm()}
                >
                  {isSubmitting ? 'Processing...' : 'Book Now'}
                </button>
              </form>

              <p className="booking-disclaimer">
                * Our wellness experts will contact you within 24 hours to confirm your booking and provide additional details.
              </p>
            </div>
          </>
        ) : (
          <div className="confirmation-content">
            <div className="confirmation-icon">✅</div>
            <h2 className="confirmation-title">Booking Confirmed!</h2>
            <p className="confirmation-message">
              Thank you for booking <strong>{program.name}</strong>. 
              Our team will contact you shortly to finalize the details.
            </p>
            <div className="confirmation-details">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Preferred Date:</strong> {new Date(formData.preferredDate).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
