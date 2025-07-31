// import React from 'react';
// import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
// import '../styles/Footer.css';
// // import logo from '../assets/logo.jpg';

// const Footer: React.FC = () => {
//   const destinationLinks=["Clinics","Resorts","Spas","Retreats","Partners"];
//   const serviceLinks = ["Concierge", "Consulting", "Advisory", "Support", "Access"];
//   const resourceLinks = ["Insights", "Guides", "Events", "News", "Reports"];
//   const companyLinks = ["About", "Team", "Careers", "Contact", "Legal"];

//   return (
//     <div className="footer-wrapper">
//     <footer className="footer">
//       <div className="container">
//         <div className="footer-content">
//           <div className="footer-main">
//             <div className="footer-brand">
//               <div className="footer-logo">
//                 {/* <img src={logo} alt="Logo" className="logo-icon" /> */}
//                 <span className="brand-name">PRANISSA</span>
//               </div>
//               <p className="footer-tagline">Your gateway to timeless wellness</p>
//             </div>
            
//             <div className="footer-links">
//               <div className="link-group">
//                 <h4 className="link-title">Explore our Destinations</h4>
//                 <ul className="link-list">
//                   {destinationLinks.map((link, index) => (
//                     <li key={index}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="link-group">
//                 <h4 className="link-title">Our Services</h4>
//                 <ul className="link-list">
//                   {serviceLinks.map((link, index) => (
//                     <li key={index}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
//                   ))}
//                 </ul>
//               </div>
              
//               <div className="link-group">
//                 <h4 className="link-title">Resources</h4>
//                 <ul className="link-list">
//                   {resourceLinks.map((link, index) => (
//                     <li key={index}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
//                   ))}
//                 </ul>
//               </div>
              
//               <div className="link-group">
//                 <h4 className="link-title">Company</h4>
//                 <ul className="link-list">
//                   {companyLinks.map((link, index) => (
//                     <li key={index}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
          
//           <div className="footer-bottom">
//             <div className="social-links">
//               <a href="#" className="social-link" aria-label="Instagram">
//                 <Instagram size={20} />
//               </a>
//               <a href="#" className="social-link" aria-label="Twitter">
//                 <Twitter size={20} />
//               </a>
//               <a href="#" className="social-link" aria-label="Facebook">
//                 <Facebook size={20} />
//               </a>
//               <a href="#" className="social-link" aria-label="LinkedIn">
//                 <Linkedin size={20} />
//               </a>
//             </div>
//             <p className="footer-copyright">© 2025 Longenomics</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//     </div>
//   );
// };

// export default Footer;






















import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
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
        
        <div className="footer-bottom">
          <div className="social-links">
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
          <p className="footer-copyright">© 2025 Longenomics</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;