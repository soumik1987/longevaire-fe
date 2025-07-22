// src/components/SignInModal.tsx
import React, { useState, useRef } from 'react';
import { X, ChevronDown } from 'lucide-react'; // Import ChevronDown for the dropdown arrow
import '../styles/SignInModal.css';

interface SignInModalProps {
  onClose: () => void;
  onSignIn: (user: any) => void;
}

// Define CountryCode interface and data
interface CountryCode {
  name: string;
  code: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { name: 'United States', code: '+1', flag: 'https://flagcdn.com/w20/us.png' },
  { name: 'India', code: '+91', flag: 'https://flagcdn.com/w20/in.png' },
  { name: 'United Kingdom', code: '+44', flag: 'https://flagcdn.com/w20/gb.png' },
  { name: 'Canada', code: '+1', flag: 'https://flagcdn.com/w20/ca.png' },
  { name: 'Australia', code: '+61', flag: 'https://flagcdn.com/w20/au.png' },
  { name: 'Germany', code: '+49', flag: 'https://flagcdn.com/w20/de.png' },
  { name: 'France', code: '+33', flag: 'https://flagcdn.com/w20/fr.png' },
  // Add more countries as needed
];

const SignInModal: React.FC<SignInModalProps> = ({ onClose, onSignIn }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'phone' | 'verification'>('phone');
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]); // Default to US
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);


  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to send verification code
    setTimeout(() => {
      setIsLoading(false);
      setStep('verification');
    }, 1500);
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      // For demo purposes, any 6-digit code works
      if (verificationCode.length === 6) {
        const mockUser = {
          displayName: 'Demo User', // You can make this dynamic if needed
          email: 'demo@example.com', // You can make this dynamic if needed
          photoURL: 'https://i.pravatar.cc/150?img=68',
          phone: `${selectedCountry.code}${phoneNumber}` // Include country code
        };
        onSignIn(mockUser);
        onClose();
      } else {
        alert('Invalid verification code. Please enter 6 digits.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    const mockUser = {
      displayName: 'Google User', // Example name for Google sign-in
      email: 'google.user@example.com', // Example email
      photoURL: 'https://i.pravatar.cc/150?img=25', // Another random avatar
    };
    onSignIn(mockUser);
    onClose();
  };

  const toggleCountryDropdown = () => {
    setShowCountryDropdown(prev => !prev);
  };

  const selectCountry = (country: CountryCode) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className="signin-modal-overlay" onClick={onClose}>
      <div 
        className="signin-modal-content" 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="signin-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="signin-left-panel">
          <div className="signin-hero-image">
            <img 
              src="https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Luxury wellness retreat"
            />
            <div className="signin-hero-overlay">
              <div className="signin-brand">
                <h2>WELLNESS</h2>
                <p>ELEVATED</p>
              </div>
            </div>
          </div>
        </div>

        <div className="signin-right-panel">
          <div className="signin-form-container">
            <div className="signin-header">
              <h1>Hello!</h1>
              <p>For security reasons, we need to verify your identity before planning your stay.</p>
            </div>

            {step === 'phone' ? (
              <form onSubmit={handlePhoneSubmit} className="signin-form">
                <div className="form-group">
                  <label htmlFor="phone">Your mobile number</label>
                  <div className="phone-input-container">
                    <div className="country-code-dropdown-wrapper" ref={countryDropdownRef}>
                      <button type="button" className="country-code-button" onClick={toggleCountryDropdown}>
                        <img 
                          src={selectedCountry.flag} 
                          alt={`${selectedCountry.name} Flag`} 
                          className="flag-icon"
                        />
                        <span>{selectedCountry.code}</span>
                        <ChevronDown size={16} className={`dropdown-arrow ${showCountryDropdown ? 'rotated' : ''}`} />
                      </button>
                      {showCountryDropdown && (
                        <div className="country-dropdown-menu">
                          {countryCodes.map(country => (
                            <div 
                              key={country.code} 
                              className="country-dropdown-item" 
                              onClick={() => selectCountry(country)}
                            >
                              <img src={country.flag} alt={`${country.name} Flag`} className="flag-icon" />
                              <span>{country.name} ({country.code})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                      required
                      className="phone-input"
                    />
                  </div>
                  <p className="form-help-text">
                    We'll send a verification code via SMS message to this mobile number
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="signin-submit-btn"
                  disabled={isLoading || !phoneNumber}
                >
                  {isLoading ? 'SENDING...' : 'GET VERIFICATION CODE'}
                </button>

                <div className="signin-divider">
                  <span>or</span>
                </div>

                <button 
                  type="button" 
                  className="google-signin-btn"
                  onClick={handleGoogleSignIn}
                >
                  <img 
                    src="https://developers.google.com/identity/images/g-logo.png" 
                    alt="Google"
                    className="google-icon"
                  />
                  Continue with Google
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerificationSubmit} className="signin-form">
                <div className="form-group">
                  <label htmlFor="verification">Verification Code</label>
                  <input
                    type="text"
                    id="verification"
                    value={verificationCode}
                    onChange={(e) => {
                      // Allow only digits and limit to 6 characters
                      const value = e.target.value.replace(/\D/g, '');
                      setVerificationCode(value.slice(0, 6));
                    }}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                    className="verification-input"
                  />
                  <p className="form-help-text">
                    Enter the 6-digit code sent to {selectedCountry.code} {phoneNumber}
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="signin-submit-btn"
                  disabled={isLoading || verificationCode.length !== 6}
                >
                  {isLoading ? 'VERIFYING...' : 'VERIFY & CONTINUE'}
                </button>

                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => setStep('phone')}
                >
                  Back to phone number
                </button>
              </form>
            )}

            <div className="signin-footer">
              <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;