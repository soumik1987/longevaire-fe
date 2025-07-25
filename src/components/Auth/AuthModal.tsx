import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/index.css'
interface AuthModalProps {
  mode: 'signin' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'signin' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitchMode }) => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'user' | 'facility' | 'admin'
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await signIn(signInData.email, signInData.password);
      if (success) {
        onClose();
        navigate('/dashboard/services');
      } else {
        setError('Invalid email or password. Try: test@facility.com / password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signUpData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = signUpData;
      const success = await signUp(userData);
      if (success) {
        onClose();
        navigate('/dashboard/services');
      } else {
        setError('User with this email already exists');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleAuth = () => {
    alert('Google authentication is not implemented in this demo');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-content">
          <div className="modal-image">
            <img src="https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg" alt="Canyon Ranch Resort" />
          </div>
          
          <div className="modal-form-container">
            <div className="modal-header">
              <div className="modal-logo">
                <span className="logo-text">LONGENOMICS</span>
              </div>
              <div className="modal-help">
                <span>NEED HELP? <a href="#" className="contact-link">CONTACT US</a></span>
              </div>
            </div>
            
            <div className="modal-form">
              {mode === 'signin' ? (
                <>
                  <h1>Hello!</h1>
                  <p className="modal-subtitle">
                    For security reasons, we need to verify your identity before planning your stay.
                  </p>
                  
                  <form onSubmit={handleSignInSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Your email address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={signInData.email}
                        onChange={handleSignInChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={signInData.password}
                        onChange={handleSignInChange}
                        required
                        placeholder="Enter your password"
                      />
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <button type="submit" className="verification-button" disabled={loading}>
                      {loading ? 'SIGNING IN...' : 'SIGN IN'}
                    </button>
                  </form>
                  
                  <div className="modal-footer">
                    <p>Don't have an account? <button type="button" className="auth-link" onClick={() => onSwitchMode('signup')}>Sign up here</button></p>
                    <div className="test-accounts">
                      <p><strong>Test Accounts:</strong></p>
                      <p>Facility: test@facility.com / password</p>
                      <p>User: test@user.com / password</p>
                      <p>Admin: test@admin.com / password</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h1>Welcome!</h1>
                  <p className="modal-subtitle">
                    Create your account to access our wellness platform.
                  </p>
                  
                  <form onSubmit={handleSignUpSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={signUpData.firstName}
                          onChange={handleSignUpChange}
                          required
                          placeholder="Enter your first name"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={signUpData.lastName}
                          onChange={handleSignUpChange}
                          required
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={signUpData.email}
                        onChange={handleSignUpChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={signUpData.phone}
                        onChange={handleSignUpChange}
                        required
                        placeholder="+1 555-0123"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="role">Account Type</label>
                      <select
                        id="role"
                        name="role"
                        value={signUpData.role}
                        onChange={handleSignUpChange}
                        required
                      >
                        <option value="user">Program Creator</option>
                        <option value="facility">Facility Owner</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={signUpData.password}
                          onChange={handleSignUpChange}
                          required
                          placeholder="Enter password"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={signUpData.confirmPassword}
                          onChange={handleSignUpChange}
                          required
                          placeholder="Confirm password"
                        />
                      </div>
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <button type="submit" className="verification-button" disabled={loading}>
                      {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                    </button>
                  </form>
                  
                  <div className="divider">
                    <span>OR</span>
                  </div>
                  
                  <button className="google-button" onClick={handleGoogleAuth}>
                    <img src="/api/placeholder/20/20" alt="Google" />
                    Continue with Google
                  </button>
                  
                  <div className="modal-footer">
                    <p>Already have an account? <button type="button" className="auth-link" onClick={() => onSwitchMode('signin')}>Sign in here</button></p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;



