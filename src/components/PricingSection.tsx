// import React from 'react';
// import { Check, Star, Crown } from 'lucide-react';
// import '../styles/PricingSection.css';

// const Pricing: React.FC = () => {
//   const plans = [
//     {
//       name: "Core",
//       price: 0,
//       description: "Perfect for those starting their wellness journey",
//       features: [
//         "Initial health assessment",
//         "Basic biomarker testing",
//         "Monthly check-ins",
//         "Email support",
//         "Access to wellness library"
//       ],
//       popular: false,
//       cta: "Get Started"
//     },
//     {
//       name: "Premium",
//       price: 50,
//       description: "Comprehensive wellness program for committed individuals",
//       features: [
//         "Everything in Beginner",
//         "Advanced biomarker panel",
//         "Bi-weekly consultations",
//         "Personalized nutrition plan",
//         "Supplement recommendations",
//         "Priority support"
//       ],
//       popular: true,
//       cta: "Most Popular"
//     },
//     {
//       name: "Group",
//       price: 200,
//       description: "Wellness programs designed for small groups and families",
//       features: [
//         "Group assessments (up to 4 people)",
//         "Shared wellness dashboard",
//         "Group coaching sessions",
//         "Family nutrition planning",
//         "Bulk supplement discounts"
//       ],
//       popular: false,
//       cta: "Perfect for Families"
//     },
//     {
//       name: "Corporate",
//       price: "Contact Sales",
//       description: "Enterprise wellness solutions for teams and organizations",
//       features: [
//         "Team wellness assessments",
//         "Corporate dashboard",
//         "On-site consultations",
//         "Workplace wellness programs",
//         "Executive health packages",
//         "24/7 concierge support"
//       ],
//       popular: false,
//       cta: "Contact Sales"
//     }
//   ];

//   return (
//     <section className="pricing-section" id="pricing">
//       <div className="section-header">
//         <h2 id="pricehead">Choose Your Plan</h2>
//         <p id="pricesubhead">
//           Select the perfect wellness program that fits your lifestyle and goals
//         </p>
//       </div>
      
//       <div className="pricing-grid">
//         {plans.map((plan, index) => (
//           <div key={index} className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}>
//             {plan.popular && (
//               <div className="popular-badge">
//                 <Star size={16} />
//                 Most Popular
//               </div>
//             )}
            
//             <div className="pricing-header">
//               <h3 className="plan-name">{plan.name}</h3>
//               <div className="plan-price">
//                 <span className="currency">$</span>
//                 <span className="amount">{plan.price}</span>
//                 <span className="period">/month</span>
//               </div>
//               <p className="plan-description">{plan.description}</p>
//             </div>
            
//             <div className="pricing-features">
//               <ul>
//                 {plan.features.map((feature, featureIndex) => (
//                   <li key={featureIndex}>
//                     <Check size={16} className="feature-check" />
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <div className="pricing-footer">
//               <button className={`btn ${plan.popular ? 'btn-popular' : 'btn-secondary'} pricing-btn`}>
//                 {plan.cta}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <div className="pricing-guarantee">
//         <Crown size={24} />
//         <p>30-day money-back guarantee on all plans</p>
//       </div>
//     </section>
//   );
// };

// export default Pricing;



// components/PricingSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PricingTeaser.css';

const PricingSection: React.FC = () => {
  return (
    <section className="pricing-teaser">
      <div className="teaser-container">
        <h2 className="teaser-title">We Have Plans for Everybody</h2>
        <p className="teaser-subtitle">Find the perfect wellness program for your needs</p>
        <Link to="/pricing" className="teaser-button">
          View Pricing Plans
        </Link>
      </div>
    </section>
  );
};

export default PricingSection;