import { useState } from 'react';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import '../../../styles/Preferences.css';
interface PreferencesProps {
  role: 'user' | 'facility' | 'admin';
}

const Preferences: React.FC<PreferencesProps> = ({ role }) => {
  const [preferences, setPreferences] = useState({
    notifications: true,
    language: 'en'
  });
  const [showMessageBox, setShowMessageBox] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Type assertion for checkbox

    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMessageBox(true);
    setTimeout(() => {
      setShowMessageBox(false);
    }, 2000);
  };

  return (
    <DashboardLayout role={role}>
      <div className="preferences">
        <h1>PREFERENCES</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="notifications"
                checked={preferences.notifications}
                onChange={handleChange}
              />
              Enable Notifications
            </label>
          </div>
          
          <div className="form-group">
            <label>Language</label>
            <select
              name="language"
              value={preferences.language}
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          
          <button type="submit" className="primary-button">
            Save Preferences
          </button>
        </form>

        {showMessageBox && (
          <div className="message-box-overlay">
            <div className="message-box">
              <p>Preferences saved successfully!</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Preferences;
