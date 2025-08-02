import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import '../styles/WellnessInsightsSection.css';

interface InsightCard {
  id: number;
  label: string;
  heading: string;
  description: string;
  image: string;
}

const WellnessInsightsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const insightCards: InsightCard[] = [
    {
      id: 1,
      label: "New",
      heading: "Premier center spotlight",
      description: "Discover our latest elite destination.",
      image: "https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      label: "Insight",
      heading: "Market intelligence report",
      description: "Track emerging luxury wellness trends.",
      image: "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      label: "Education",
      heading: "Professional advisory access",
      description: "Gain access to leading experts and educational resources.",
      image: "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      label: "Update",
      heading: "Global center launches",
      description: "See new openings in key markets.",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 5,
      label: "Featured",
      heading: "Next-Gen Therapies",
      description: "Discover breakthrough treatments for holistic well-being.",
      image: "https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 6,
      label: "Spotlight",
      heading: "Personalized Longevity Plans",
      description: "Tailored programs designed for your unique health journey.",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const handleCardClick = (cardId: number) => {
    console.log(`Clicked card ${cardId}`);
  };

  const handleExploreClick = () => {
    console.log('Explore insights clicked');
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280; // Fixed scroll amount for mobile
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="wellness-insight-section">
      <div className="wellness-insight-container">
        <div className="wellness-insight-left-content-wrapper">
          <div className="wellness-insight-left-content-block">
            <h2 className="wellness-insight-main-heading">
              Curated wellness insights, delivered
            </h2>
            <p className="wellness-insight-sub-text">
              Explore global centers, trends, and expertise.
            </p>
            <button 
              onClick={handleExploreClick}
              className="wellness-insight-explore-button"
            >
              Explore Insights
              <ArrowRight className="wellness-insight-button-icon" />
            </button>
          </div>
        </div>

        <div className="wellness-insight-right-content-wrapper">
          {/* Mobile arrows - only visible on mobile */}
          <div className="mobile-scroll-controls">
            <button 
              className="wellness-insight-scroll-arrow left" 
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              &#8249;
            </button>
            <button 
              className="wellness-insight-scroll-arrow right" 
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              &#8250;
            </button>
          </div>
          
          <div className="wellness-insight-cards-grid" ref={scrollRef}>
            {insightCards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="wellness-insight-card"
              >
                <div className="wellness-insight-card-image-container">
                  <img
                    src={card.image}
                    alt={card.heading}
                    className="wellness-insight-card-image"
                  />
                  <div className="wellness-insight-card-label">
                    {card.label}
                  </div>
                </div>
                <div className="wellness-insight-card-content">
                  <h3 className="wellness-insight-card-heading">
                    {card.heading}
                  </h3>
                  <p className="wellness-insight-card-description">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WellnessInsightsSection;