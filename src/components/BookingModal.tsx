import React, { useState, useCallback, useEffect } from 'react';
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
  const [formErrors, setFormErrors] = useState<Partial<BookingForm>>({});

  // Memoized validation functions
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePhone = useCallback((phone: string): boolean => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  }, []);

  // Real-time field validation
  const validateField = useCallback((name: keyof BookingForm, value: string): string | undefined => {
    if (!value.trim()) return 'This field is required';
    
    switch (name) {
      case 'email':
        return !validateEmail(value) ? 'Please enter a valid email address' : undefined;
      case 'phone':
        return !validatePhone(value) ? 'Please enter a valid phone number (10-15 digits)' : undefined;
      case 'preferredDate':
        return !value ? 'Please select a date' : undefined;
      default:
        return undefined;
    }
  }, [validateEmail, validatePhone]);

  // Handle input changes with validation
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Validate the field as user types
    if (name === 'email' || name === 'phone') {
      const error = validateField(name as keyof BookingForm, value);
      setFormErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, [validateField]);

  // Validate the entire form
  const validateForm = useCallback((): boolean => {
    const errors: Partial<BookingForm> = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const fieldName = key as keyof BookingForm;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        errors[fieldName] = error;
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  }, [formData, validateField]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Booking submitted:', {
        program: program.name,
        ...formData
      });

      setShowConfirmation(true);

      // Close modal after showing confirmation
      setTimeout(() => {
        onSuccess();
      }, 2000);

    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, program.name, validateForm, onSuccess]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus first input when modal opens
  useEffect(() => {
    const firstInput = document.querySelector('.form-input') as HTMLInputElement;
    if (firstInput && !showConfirmation) {
      firstInput.focus();
    }
  }, [showConfirmation]);

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={e => e.stopPropagation()}>
        {!showConfirmation ? (
          <>
            <div className="modal-header">
              <h2 className="modal-title">Book Your Experience</h2>
              <button 
                className="close-button" 
                onClick={onClose}
                aria-label="Close booking modal"
              >
                ×
              </button>
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

              <form className="booking-form" onSubmit={handleSubmit} noValidate>
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
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
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
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
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
                  {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="preferredDate" className="form-label">Preferred Date *</label>
                  {program.bookingOptions?.availableDates ? (
                    <>
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
                      {formErrors.preferredDate && <span className="error-message">{formErrors.preferredDate}</span>}
                    </>
                  ) : (
                    <>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                        min={new Date().toISOString().split('T')[0]} // Prevent past dates
                      />
                      {formErrors.preferredDate && <span className="error-message">{formErrors.preferredDate}</span>}
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    'Book Now'
                  )}
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

export default React.memo(BookingModal);