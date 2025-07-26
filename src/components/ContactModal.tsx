// import React, { useState, useCallback, useEffect } from 'react';
// import '../styles/ContactModal.css';

// interface ContactModalProps {
//   onClose: () => void;
// }

// interface ContactForm {
//   name: string;
//   email: string;
//   phone: string;
//   message: string;
// }

// const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
//   const [formData, setFormData] = useState<ContactForm>({
//     name: '',
//     email: '',
//     phone: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [formErrors, setFormErrors] = useState<Partial<ContactForm>>({});

//   // Memoized validation functions
//   const validateEmail = useCallback((email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }, []);

//   const validatePhone = useCallback((phone: string): boolean => {
//     // Phone is optional, but if provided, validate it
//     return phone === '' || /^[0-9]{7,15}$/.test(phone);
//   }, []);

//   // Real-time field validation
//   const validateField = useCallback((name: keyof ContactForm, value: string): string | undefined => {
//     if (name !== 'phone' && !value.trim()) return 'This field is required';
    
//     switch (name) {
//       case 'email':
//         return !validateEmail(value) ? 'Please enter a valid email address' : undefined;
//       case 'phone':
//         return !validatePhone(value) ? 'Please enter a valid phone number (7-15 digits)' : undefined;
//       default:
//         return undefined;
//     }
//   }, [validateEmail, validatePhone]);

//   // Handle input changes with validation
//   const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
    
//     // Validate the field as user types (except for message which we'll validate on submit)
//     if (name !== 'message') {
//       const error = validateField(name as keyof ContactForm, value);
//       setFormErrors(prev => ({
//         ...prev,
//         [name]: error
//       }));
//     }
    
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   }, [validateField]);

//   // Validate the entire form
//   const validateForm = useCallback((): boolean => {
//     const errors: Partial<ContactForm> = {};
//     let isValid = true;

//     (Object.keys(formData) as Array<keyof ContactForm>).forEach(key => {
//       if (key !== 'phone') { // Phone is optional
//         const error = validateField(key, formData[key]);
//         if (error) {
//           errors[key] = error;
//           isValid = false;
//         }
//       }
//     });

//     setFormErrors(errors);
//     return isValid;
//   }, [formData, validateField]);

//   // Handle form submission
//   const handleSubmit = useCallback(async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       console.log('Contact form submitted:', formData);
//       setShowConfirmation(true);

//     } catch (error) {
//       console.error('Form submission failed:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, [formData, validateForm]);

//   // Close modal on Escape key press
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [onClose]);

//   // Focus first input when modal opens
//   useEffect(() => {
//     const firstInput = document.querySelector('.form-input') as HTMLInputElement;
//     if (firstInput && !showConfirmation) {
//       firstInput.focus();
//     }
//   }, [showConfirmation]);

//   return (
//     <div className="contact-modal-overlay" onClick={onClose}>
//       <div className="contact-modal" onClick={e => e.stopPropagation()}>
//         {!showConfirmation ? (
//           <>
//             <div className="modal-header">
//               <h2 className="modal-title">Contact Us</h2>
//               <button 
//                 className="close-button" 
//                 onClick={onClose}
//                 aria-label="Close contact modal"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="modal-content">
//               <form className="contact-form" onSubmit={handleSubmit} noValidate>
//                 <div className="form-group">
//                   <label htmlFor="name" className="form-label">Full Name *</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className={`form-input ${formErrors.name ? 'invalid' : ''}`}
//                     required
//                     placeholder="Enter your full name"
//                   />
//                   {formErrors.name && <span className="error-message">{formErrors.name}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email" className="form-label">Email Address *</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className={`form-input ${formErrors.email ? 'invalid' : ''}`}
//                     required
//                     placeholder="Enter your email address"
//                   />
//                   {formErrors.email && <span className="error-message">{formErrors.email}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone" className="form-label">Phone Number</label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className={`form-input ${formErrors.phone ? 'invalid' : ''}`}
//                     placeholder="Enter your phone number (optional)"
//                   />
//                   {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="message" className="form-label">Message *</label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     className={`form-input ${formErrors.message ? 'invalid' : ''}`}
//                     required
//                     placeholder="How can we help you?"
//                     rows={4}
//                   />
//                   {formErrors.message && <span className="error-message">{formErrors.message}</span>}
//                 </div>

//                 <button
//                   type="submit"
//                   className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="spinner" aria-hidden="true"></span>
//                       Sending...
//                     </>
//                   ) : (
//                     'Send Message'
//                   )}
//                 </button>
//               </form>
//             </div>
//           </>
//         ) : (
//           <div className="confirmation-content">
//             <div className="confirmation-icon">✅</div>
//             <h2 className="confirmation-title">Message Sent!</h2>
//             <p className="confirmation-message">
//               Thank you for contacting us. Our team will get back to you shortly.
//             </p>
//             <button 
//               className="close-confirmation"
//               onClick={onClose}
//               autoFocus
//             >
//               Close
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default React.memo(ContactModal);


















import React, { useState, useCallback, useEffect } from 'react';
import '../styles/ContactModal.css';

interface ContactModalProps {
  onClose: () => void;
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<ContactForm>>({});

  // Memoized validation functions
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePhone = useCallback((phone: string): boolean => {
    return phone === '' || /^[0-9]{7,15}$/.test(phone);
  }, []);

  // Real-time field validation
  const validateField = useCallback((name: keyof ContactForm, value: string): string | undefined => {
    if (name !== 'phone' && !value.trim()) return 'This field is required';
    
    switch (name) {
      case 'email':
        return !validateEmail(value) ? 'Please enter a valid email address' : undefined;
      case 'phone':
        return !validatePhone(value) ? 'Please enter a valid phone number (7-15 digits)' : undefined;
      default:
        return undefined;
    }
  }, [validateEmail, validatePhone]);

  // Handle input changes with validation
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name !== 'message') {
      const error = validateField(name as keyof ContactForm, value);
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
    const errors: Partial<ContactForm> = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof ContactForm>).forEach(key => {
      if (key !== 'phone') {
        const error = validateField(key, formData[key]);
        if (error) {
          errors[key] = error;
          isValid = false;
        }
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Contact form submitted:', formData);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

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
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={e => e.stopPropagation()}>
        {!showConfirmation ? (
          <>
            <div className="modal-header">
              <h2 className="modal-title">Contact Us</h2>
              <button 
                className="close-button" 
                onClick={onClose}
                aria-label="Close contact modal"
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.name ? 'invalid' : ''}`}
                    required
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.email ? 'invalid' : ''}`}
                    required
                    placeholder="Enter your email address"
                  />
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.phone ? 'invalid' : ''}`}
                    placeholder="Enter your phone number (optional)"
                  />
                  {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message <span className="required-asterisk">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.message ? 'invalid' : ''}`}
                    required
                    placeholder="How can we help you?"
                    rows={5}
                  />
                  {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                </div>

                <div className="form-footer">
                  <button
                    type="submit"
                    className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="confirmation-content">
            <div className="confirmation-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="confirmation-title">Message Sent!</h2>
            <p className="confirmation-message">
              Thank you for contacting us. Our team will get back to you shortly.
            </p>
            <button 
              className="close-confirmation"
              onClick={onClose}
              autoFocus
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ContactModal);