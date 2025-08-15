// import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import '../styles/Footer.css'; // This is the import for the new CSS file

const Footer = () => {
  const destinationLinks = ["Clinics", "Resorts", "Spas", "Retreats", "Partners"];
  const serviceLinks = ["Concierge", "Consulting", "Advisory", "Support", "Access"];
  const resourceLinks = ["Insights", "Guides", "Events", "News", "Reports"];
  const companyLinks = ["About", "Team", "Careers", "Contact", "Legal"];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="brand-name">PRANISSA</span>
            </div>
            <p className="footer-tagline">Your gateway to timeless wellness</p>
          </div>
          
          <div className="footer-links-grid">
            <div className="link-group">
              <h4 className="link-title">Explore our Destinations</h4>
              <ul className="link-list">
                {destinationLinks.map((link, index) => (
                  <li key={index}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
                ))}
              </ul>
            </div>

            <div className="link-group">
              <h4 className="link-title">Our Services</h4>
              <ul className="link-list">
                {serviceLinks.map((link, index) => (
                  <li key={index}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
                ))}
              </ul>
            </div>
            
            <div className="link-group">
              <h4 className="link-title">Resources</h4>
              <ul className="link-list">
                {resourceLinks.map((link, index) => (
                  <li key={index}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
                ))}
              </ul>
            </div>
            
            <div className="link-group">
              <h4 className="link-title">Company</h4>
              <ul className="link-list">
                {companyLinks.map((link, index) => (
                  <li key={index}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-minimalist-section">
          <div className="footer-social-top">
            <a href="#" className="social-link" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-copyright-bottom">
            <div className="footer-links">
              <a href="#" className="footer-link">Privacy</a>
              <a href="#" className="footer-link">Terms</a>
              <a href="#" className="footer-link">Cookies</a>
            </div>
            <p className="footer-copyright">© 2025 Pranissa</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
