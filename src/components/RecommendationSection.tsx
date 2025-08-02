import { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/RecommedationSection.css';

const destinationsrecommended = [
  {
    id: 1,
    location: "LENOX, MA",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: "Two MICHELIN Keys",
    description: "An exceptional stay",
    ratingType: "michelin",
    keyCount: 2
  },
  {
    id: 2,
    location: "TUCSON, AZ",
    image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: "Three MICHELIN Keys",
    description: "An extraordinary stay",
    ratingType: "michelin",
    keyCount: 3
  },
  {
    id: 3,
    location: "WOODSIDE, CA",
    image: "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: "Three MICHELIN Keys",
    description: "An extraordinary stay",
    ratingType: "michelin",
    keyCount: 3
  },
  {
    id: 4,
    location: "LAS VEGAS, NV",
    image: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: "★★★★",
    description: "",
    ratingType: "stars"
  },
  {
    id: 5,
    location: "FORT WORTH, TX",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: "Luxury Resort",
    description: "Premium experience",
    ratingType: "text"
  },
  {
    id: 6,
    location: "ASPEN, CO",
    image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: "Four MICHELIN Keys",
    description: "Mountain retreat",
    ratingType: "michelin",
    keyCount: 4
  }
];

function RecommendationSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const updateScrollProgress = () => {
    if (scrollContainerRef.current) {
      // Scroll progress logic can be added here if needed
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollProgress);
      return () => container.removeEventListener('scroll', updateScrollProgress);
    }
  }, []);

  const renderRating = (destination: any) => {
    if (destination.ratingType === 'michelin') {
      return (
        <div className="recommendadedsection-destination-rating">
          <div className="recommendadedsection-michelin-keys">
            {Array.from({ length: destination.keyCount }).map((_, i) => (
              <div key={i} className="recommendadedsection-michelin-key"></div>
            ))}
          </div>
          <span className="recommendadedsection-rating-text">{destination.rating}</span>
        </div>
      );
    } else if (destination.ratingType === 'stars') {
      return (
        <div className="recommendadedsection-destination-rating">
          <span className="recommendadedsection-star-rating">{destination.rating}</span>
        </div>
      );
    } else {
      return (
        <div className="recommendadedsection-destination-rating">
          <span className="recommendadedsection-rating-text">{destination.rating}</span>
        </div>
      );
    }
  };

  return (
    <div className="reco">
      {/* Our Destinations Section */}
      <section className="recommendadedsection-destinations-container">
        {/* Header */}
        <div className="recommendadedsection-destinations-header">
          <h2 className="recommendadedsection-destinations-title">
            OUR RECOMMENDATIONS
          </h2>
          <p className="recommendadedsection-destinations-subtitle">
            Explore distinct destinations designed for healing and renewal, set across stunning desert, forest, or mountain landscapes.
          </p>
        </div>

        {/* Scrollable Cards Container */}
        <div className="recommendadedsection-destinations-scroll-wrapper">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="recommendadedsection-scroll-arrow recommendadedsection-scroll-arrow-left"
            aria-label="Scroll left"
          >
            <ChevronLeft />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="recommendadedsection-scroll-arrow recommendadedsection-scroll-arrow-right"
            aria-label="Scroll right"
          >
            <ChevronRight />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="recommendadedsection-destinations-scroll-container"
          >
            {destinationsrecommended.map((destination) => (
              <div
                key={destination.id}
                className="recommendadedsection-destination-card"
              >
                {/* Image */}
                <div className="recommendadedsection-destination-image-container">
                  <img
                    src={destination.image}
                    alt={destination.location}
                    className="recommendadedsection-destination-image"
                  />
                </div>

                {/* Content */}
                <div className="recommendadedsection-destination-content">
                  <h3 className="recommendadedsection-destination-location">
                    {destination.location}
                  </h3>
                  
                  {/* Rating */}
                  {renderRating(destination)}
                  
                  {destination.description && (
                    <p className="recommendadedsection-rating-description">
                      {destination.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default RecommendationSection;