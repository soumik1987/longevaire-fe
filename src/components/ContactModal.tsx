// src/components/ContactModal.tsx
import React, { useState } from 'react';
import '../styles/ContactModal.css';

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, email, phone, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;

    if (phone && !/^[0-9]{7,15}$/.test(phone)) return false; // Adjusted phone regex for more flexibility

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowConfirmation(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={e => e.stopPropagation()}>
        {!showConfirmation ? (
          <>
            <div className="modal-header">
              <h2 className="modal-title">Contact Us</h2>
              <button className="close-button" onClick={onClose}>×</button>
            </div>

            <div className="modal-content">
              <form className="contact-form" onSubmit={handleSubmit}>
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
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    placeholder="How can we help you?"
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className={`submit-button ${isSubmitting || !validateForm() ? 'disabled' : ''}`}
                  disabled={isSubmitting || !validateForm()}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="confirmation-content">
            <div className="confirmation-icon">✅</div>
            <h2 className="confirmation-title">Message Sent!</h2>
            <p className="confirmation-message">
              Thank you for contacting us. Our team will get back to you shortly.
            </p>
            <button className="close-confirmation" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;