import React, { useEffect, useState } from 'react';
import '../styles/ElevateSection.css';

const ElevateSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the background image
    const img = new Image();
    img.src = 'https://images.pexels.com/photos/6787334/pexels-photo-6787334.jpeg';
    img.onload = () => {
      setBgImageLoaded(true);
      document.documentElement.style.setProperty(
        '--bg-image',
        'url("https://images.pexels.com/photos/6787334/pexels-photo-6787334.jpeg")'
      );
    };

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && bgImageLoaded) {
            setIsLoaded(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('.elevate-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, [bgImageLoaded]);

  return (
    <section className={`elevate-section ${isLoaded ? 'loaded' : ''}`}>
      <div className="elevate-overlay">
        <div className="container">
          <div className="elevate-content">
            <h2 className="elevate-title">Elevate your longevity journey</h2>
            <p className="elevate-description">
              Discover leading insights, expert strategies, and premier destinations in longevity. 
              Access the latest research, wellness innovations, and exclusive global clinics for 
              optimal health and extended vitality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ElevateSection);