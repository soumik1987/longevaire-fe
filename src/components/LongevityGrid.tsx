import React from 'react';
import '../styles/LongevityGrid.css';

const LongevityGrid: React.FC = () => {
  const gridItems = [
    {
      title: "World-class wellness clinics",
      description: "Access to top-tier clinics across the globe.",
      image: "https://images.pexels.com/photos/4047146/pexels-photo-4047146.jpeg"
    },
    {
      title: "Indulgent health retreats",
      description: "Experience luxury at its finest.",
      image: "https://images.pexels.com/photos/6629549/pexels-photo-6629549.jpeg"
    },
    {
      title: "Pioneers in longevity care",
      description: "Receive care from the best in the field.",
      image: "https://images.pexels.com/photos/6787203/pexels-photo-6787203.jpeg"
    },
    {
      title: "Tailored wellness journeys",
      description: "Crafting your perfect wellness escape.",
      image: "https://images.pexels.com/photos/3865577/pexels-photo-3865577.jpeg"
    }
  ];

  return (
    <section className="longevity-grid-section">
      <div className="container">
        <h2 id="discoverhead">Discover the art of living longer</h2>
        <div className="longevity-grid">
          {gridItems.map((item, index) => (
            <div key={index} className="grid-item fade-in-up">
              <div className="item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="item-content">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LongevityGrid;