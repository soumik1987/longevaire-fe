import React from 'react';
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

  return (
    <section className="wellness-insights-section">
      <div className="wellness-insights-container">
        <div className="left-content-block">
          <div className="left-content-inner">
            <h2 className="main-heading">
              Curated wellness insights, delivered
            </h2>
            <p className="sub-text">
              Explore global centers, trends, and expertise.
            </p>
            <button 
              onClick={handleExploreClick}
              className="explore-button"
            >
              Explore Insights
              <ArrowRight className="button-icon" />
            </button>
          </div>
        </div>

        <div className="cards-container">
          <div className="cards-grid">
            {insightCards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="insight-card"
              >
                <div className="card-image-container">
                  <img
                    src={card.image}
                    alt={card.heading}
                    className="card-image"
                  />
                  <div className="card-label">
                    <span className="label-text">
                      {card.label}
                    </span>
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="card-heading">
                    {card.heading}
                  </h3>
                  <p className="card-description">
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
