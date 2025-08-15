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
      image: "https://pranissa-media.s3.us-east-1.amazonaws.com/images/hamam.png?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      label: "Insight",
      heading: "Market intelligence report",
      description: "Track emerging luxury wellness trends.",
      image: "https://pranissa-media.s3.us-east-1.amazonaws.com/images/latesthealth.jpg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      label: "Education",
      heading: "Professional advisory access",
      description: "Gain access to leading experts and educational resources.",
      image: "https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      label: "Update",
      heading: "Global center launches",
      description: "See new openings in key markets.",
      image: "https://pranissa-media.s3.us-east-1.amazonaws.com/images/balconyswim.png?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 5,
      label: "Featured",
      heading: "Next-Gen Therapies",
      description: "Discover breakthrough treatments for holistic well-being.",
      image: "https://pranissa-media.s3.us-east-1.amazonaws.com/images/ChatGPT+Image+Aug+2%2C+2025+at+07_35_33+PM.png"
    },
    {
      id: 6,
      label: "Spotlight",
      heading: "Personalized Longevity Plans",
      description: "Tailored programs designed for your unique health journey.",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const handleExploreClick = () => {
    console.log('Explore insights clicked');
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="luxury-wellness-insights-section">
      <div className="luxury-wellness-insights-container">
        <div className="luxury-wellness-left-panel">
          <div className="luxury-wellness-content-block">
            <h2 className="luxury-wellness-main-title">
              Curated wellness insights, delivered
            </h2>
            <p className="luxury-wellness-subtitle">
              Explore global centers, trends, and expertise through our carefully selected collection of premium wellness insights.
            </p>
            <button
              onClick={handleExploreClick}
              className="luxury-wellness-cta-button"
            >
              <span>Explore Insights</span>
              <ArrowRight className="luxury-wellness-button-arrow" />
              <div className="luxury-wellness-button-shine"></div>
            </button>
          </div>
        </div>

        <div className="luxury-wellness-right-panel">
          <div className="luxury-wellness-horizontal-cards-container">
            <button 
              className="luxury-wellness-scroll-arrow luxury-wellness-scroll-left" 
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              &#8249;
            </button>
            
            <div className="luxury-wellness-cards-container luxury-wellness-horizontal-scroll" ref={scrollRef}>
              {insightCards.map((card, index) => (
                <div
                  key={card.id}
                  className={`luxury-wellness-insight-card luxury-wellness-card-${index + 1}`}
                  style={{ '--card-index': index } as React.CSSProperties}
                >
                  <img
                    src={card.image}
                    alt={card.heading}
                    className="luxury-wellness-card-image"
                  />
                  <div className="luxury-wellness-card-gradient-overlay"></div>
                  <div className="luxury-wellness-card-label">
                    {card.label}
                  </div>
                  <div className="luxury-wellness-card-content">
                    <h3 className="luxury-wellness-card-title">
                      {card.heading}
                    </h3>
                    <p className="luxury-wellness-card-text">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="luxury-wellness-scroll-arrow luxury-wellness-scroll-right" 
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>
      

    </section>
  );
};

export default WellnessInsightsSection;