// // src/components/Auth/AuthModal.tsx
// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import '../../styles/AuthModal.css';

// interface AuthModalProps {
//   mode: 'signin' | 'signup';
//   onClose: () => void;
//   onSwitchMode: (mode: 'signin' | 'signup') => void;
// }

// const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitchMode }) => {
//   const { signIn, signUp } = useAuth();
//   const navigate = useNavigate();

//   const [signInData, setSignInData] = useState({ email: '', password: '' });
//   const [signUpData, setSignUpData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     role: 'user' as 'user' | 'facility' | 'admin'
//   });

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSignInSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const success = await signIn(signInData.email, signInData.password);
//       if (success) {
//         onClose();
//         navigate('/dashboard/services');
//       } else {
//         setError('Invalid email or password.');
//       }
//     } catch {
//       setError('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignUpSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     if (signUpData.password !== signUpData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     if (signUpData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }
//     setLoading(true);
//     try {
//       const { confirmPassword, ...userData } = signUpData;
//       const success = await signUp(userData);
//       if (success) {
//         onClose();
//         navigate('/dashboard/services');
//       } else {
//         setError('User with this email already exists');
//       }
//     } catch {
//       setError('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChangeSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSignInData({ ...signInData, [e.target.name]: e.target.value });
//   };

//   const handleChangeSignUp = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="auth-popup-overlay" onClick={onClose}>
//       <div className="auth-popup-box" onClick={(e) => e.stopPropagation()}>
//         <button className="auth-popup-close" onClick={onClose}>
//           <X size={20} />
//         </button>
//         <h2 className="auth-popup-heading">LONGENOMICS</h2>
//         <p className="auth-popup-subtext">
//           {mode === 'signin' ? 'Sign in to continue your journey' : 'Create your account'}
//         </p>

//         {mode === 'signin' ? (
//           <form onSubmit={handleSignInSubmit} className="auth-popup-form">
//             <div className="auth-popup-field">
//               <label>Email</label>
//               <input type="email" name="email" value={signInData.email} onChange={handleChangeSignIn} required />
//             </div>
//             <div className="auth-popup-field">
//               <label>Password</label>
//               <input type="password" name="password" value={signInData.password} onChange={handleChangeSignIn} required />
//             </div>
//             {error && <div className="auth-popup-error">{error}</div>}
//             <button className="auth-popup-button" disabled={loading}>
//               {loading ? 'Signing In...' : 'SIGN IN'}
//             </button>
//             <p className="auth-popup-footer">
//               Don’t have an account?{' '}
//               <button type="button" className="auth-popup-link" onClick={() => onSwitchMode('signup')}>
//                 Sign up
//               </button>
//             </p>
//           </form>
//         ) : (
//           <form onSubmit={handleSignUpSubmit} className="auth-popup-form">
//             <div className="auth-popup-row">
//               <div className="auth-popup-field">
//                 <label>First Name</label>
//                 <input type="text" name="firstName" value={signUpData.firstName} onChange={handleChangeSignUp} required />
//               </div>
//               <div className="auth-popup-field">
//                 <label>Last Name</label>
//                 <input type="text" name="lastName" value={signUpData.lastName} onChange={handleChangeSignUp} required />
//               </div>
//             </div>
//             <div className="auth-popup-field">
//               <label>Email</label>
//               <input type="email" name="email" value={signUpData.email} onChange={handleChangeSignUp} required />
//             </div>
//             <div className="auth-popup-field">
//               <label>Phone</label>
//               <input type="tel" name="phone" value={signUpData.phone} onChange={handleChangeSignUp} required />
//             </div>
//             <div className="auth-popup-field">
//               <label>Account Type</label>
//               <select name="role" value={signUpData.role} onChange={handleChangeSignUp}>
//                 <option value="user">Program Creator</option>
//                 <option value="facility">Facility Owner</option>
//                 <option value="admin">Administrator</option>
//               </select>
//             </div>
//             <div className="auth-popup-row">
//               <div className="auth-popup-field">
//                 <label>Password</label>
//                 <input type="password" name="password" value={signUpData.password} onChange={handleChangeSignUp} required />
//               </div>
//               <div className="auth-popup-field">
//                 <label>Confirm</label>
//                 <input type="password" name="confirmPassword" value={signUpData.confirmPassword} onChange={handleChangeSignUp} required />
//               </div>
//             </div>
//             {error && <div className="auth-popup-error">{error}</div>}
//             <button className="auth-popup-button" disabled={loading}>
//               {loading ? 'Creating...' : 'Create Account'}
//             </button>
//             <p className="auth-popup-footer">
//               Already have an account?{' '}
//               <button type="button" className="auth-popup-link" onClick={() => onSwitchMode('signin')}>
//                 Sign in
//               </button>
//             </p>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthModal;






















// src/components/AuthModal.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import '../../styles/AuthModal.css';

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

  const handleTestAccount = (email: string) => {
    if (mode === 'signin') {
      setSignInData({
        email: email,
        password: 'password'
      });
    } else {
      setSignUpData({
        ...signUpData,
        email: email,
        password: 'password',
        confirmPassword: 'password'
      });
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="auth-modal-content">
          <div className="auth-modal-image">
            <img src="https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg" alt="Wellness Resort" />
          </div>
          
          <div className="auth-modal-form-container">
            <div className="auth-modal-header">
              <div className="auth-modal-logo">
                <span className="auth-logo-text">LONGENOMICS</span>
              </div>
              <div className="auth-modal-help">
                {/* <span>NEED HELP? <Link to="/contact" className="auth-contact-link">CONTACT US</Link></span> */}
              </div>
            </div>
            
            <div className="auth-modal-form">
              {mode === 'signin' ? (
                <>
                  <h1 className="auth-modal-title">Hello!</h1>
                  <p className="auth-modal-subtitle">
                    For security reasons, we need to verify your identity before planning your stay.
                  </p>
                  
                  <form onSubmit={handleSignInSubmit} className="auth-form">
                    <div className="auth-form-group">
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
                    
                    <div className="auth-form-group">
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
                    
                    {error && <div className="auth-error-message">{error}</div>}
                    
                    <button type="submit" className="auth-verification-button" disabled={loading}>
                      {loading ? 'SIGNING IN...' : 'SIGN IN'}
                    </button>
                  </form>
                  
                  <div className="auth-modal-footer">
                    <p>Don't have an account? <button type="button" className="auth-link-button" onClick={() => onSwitchMode('signup')}>Sign up here</button></p>
                    <div className="auth-test-accounts">
                      <p><strong>Test Accounts:</strong></p>
                      <p>Facility: <button className="auth-test-account" onClick={() => handleTestAccount('test@facility.com')}>test@facility.com</button> / password</p>
                      <p>User: <button className="auth-test-account" onClick={() => handleTestAccount('test@user.com')}>test@user.com</button> / password</p>
                      <p>Admin: <button className="auth-test-account" onClick={() => handleTestAccount('test@admin.com')}>test@admin.com</button> / password</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="auth-modal-title">Welcome!</h1>
                  <p className="auth-modal-subtitle">
                    Create your account to access our wellness platform.
                  </p>
                  
                  <form onSubmit={handleSignUpSubmit} className="auth-form">
                    <div className="auth-form-row">
                      <div className="auth-form-group">
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
                      
                      <div className="auth-form-group">
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
                    
                    <div className="auth-form-group">
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
                    
                    <div className="auth-form-group">
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
                    
                    <div className="auth-form-group">
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
                    
                    <div className="auth-form-row">
                      <div className="auth-form-group">
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
                      
                      <div className="auth-form-group">
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
                    
                    {error && <div className="auth-error-message">{error}</div>}
                    
                    <button type="submit" className="auth-verification-button" disabled={loading}>
                      {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                    </button>
                  </form>
                  
                  <div className="auth-divider">
                    <span>OR</span>
                  </div>
                  
                  <button className="auth-google-button" onClick={handleGoogleAuth}>
                    <FcGoogle size={20} />
                    Continue with Google
                  </button>
                  
                  <div className="auth-modal-footer">
                    <p>Already have an account? <button type="button" className="auth-link-button" onClick={() => onSwitchMode('signin')}>Sign in here</button></p>
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
