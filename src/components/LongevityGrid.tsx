import React, { useRef } from 'react';
import '../styles/LongevityGrid.css';

const LongevityGrid: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth <= 768 ? 280 : 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const gridItems = [
    {
      title: "Global Wellness Partnerships",
      description: "Gain access to a curated network of the world's most trusted wellness clinics and longevity centers. Our partners specialize in cutting-edge diagnostics, anti-aging therapies, and regenerative protocols, all delivered with unmatched discretion and care",
      image: "https://pranissa-media.s3.us-east-1.amazonaws.com/images/forest+bunglow.png"
    },
    {
      title: "Immersive Wellness Travel",
      description: "Hosted in award-winning resorts and five-star sanctuaries, our retreats are more than escapes, they're gateways to transformation. Every experience is rooted in healing environments, nature-rich destinations, and thoughtfully designed comfort.",
      image: "https://pranissa-media.s3.us-east-1.amazonaws.com/images/desertcamp.png"
    },
    {
      title: "Pioneers in longevity care",
      description: "Each journey is developed and supervised by a team of leading longevity doctors, functional longevity experts, and integrative health coaches-so you're never alone on the path to total renewal.",
      image: "https://images.pexels.com/photos/6787203/pexels-photo-6787203.jpeg"
    },
    {
      title: "Tailored wellness journeys",
      description: "From hormonal balance to sleep, cognitive performance to metabolic resets, every itinerary is built around your biomarkers, lifestyle, and aspirations, designed to help you live, feel, and perform at your highest level",
      image: "https://pranissa-media.s3.us-east-1.amazonaws.com/images/spa.png"
    }
  ];

  return (
    <section className="longevity-grid-section">
      <div className="longevity-grid-container">
        <h2 id="discoverhead">Discover the art of living longer</h2>
        <div className="longevity-scroll-wrapper">
          <button className="longetivity-grid-scroll-arrow left" onClick={() => scroll('left')}>&#8249;</button>
          <div className="longevity-grid" ref={scrollRef}>
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
          <button className="longetivity-grid-scroll-arrow right" onClick={() => scroll('right')}>&#8250;</button>
        </div>
      </div>
    </section>
  );
};

export default LongevityGrid;