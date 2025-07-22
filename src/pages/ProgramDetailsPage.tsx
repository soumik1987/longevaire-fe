import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProgramByName, fetchRelatedPrograms } from '../api';
import type { Program } from '../data/programs';
import BookingModal from '../components/BookingModal';
import GalleryModal from '../components/GalleryModal';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import '../styles/ProgramDetailsPage.css';

interface LocationState {
  programName: string;
}

const ProgramDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isNavSticky, setIsNavSticky] = useState<boolean>(false);
  const [currentIncludedIndex, setCurrentIncludedIndex] = useState<number>(0);
  const [relatedPrograms, setRelatedPrograms] = useState<Program[]>([]);

  // Slider state
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  // const sliderRef = useRef<HTMLDivElement>(null);

  const sectionNavRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const overviewRef = useRef<HTMLDivElement>(null);
  const includedRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
    overview: overviewRef as React.RefObject<HTMLDivElement>,
    included: includedRef as React.RefObject<HTMLDivElement>,
    offers: offersRef as React.RefObject<HTMLDivElement>,
    events: eventsRef as React.RefObject<HTMLDivElement>,
    schedule: scheduleRef as React.RefObject<HTMLDivElement>,
    gallery: galleryRef as React.RefObject<HTMLDivElement>,
    location: locationRef as React.RefObject<HTMLDivElement>,
  };

  // Sample event data to demonstrate slider
  const sampleEvents = [
    {
      id: 1,
      badge: 'GUEST EXPERT',
      badgeColor: '#D97706',
      location: 'WOODSIDE, CA',
      title: 'PLAYFUL LIVING',
      description: 'Reclaiming Childhood Joy with Steve Jordan',
      date: 'Sep 4—8, 2025',
      image: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      badge: 'SIGNATURE EVENT',
      badgeColor: '#DC2626',
      location: 'WOODSIDE, CA',
      title: 'ROOTED IN LOVE',
      description: 'A Couples Weekend in The Redwoods',
      date: 'Sep 11—15, 2025',
      image: 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      badge: 'GUEST EXPERT',
      badgeColor: '#D97706',
      location: 'WOODSIDE, CA',
      title: 'HAPPY TRAILS WITH WENDY FIGONE',
      description: 'A weekend of physical, mental, and spiritual well-being',
      date: 'Sep 25—29, 2025',
      image: 'https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      badge: 'GUEST EXPERT',
      badgeColor: '#D97706',
      location: 'WOODSIDE, CA',
      title: 'RESTORE YOUR INNER BALANCE',
      description: 'Movement, Meditation & Other Rituals',
      date: 'Oct 9—13, 2025',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      badge: 'SIGNATURE EVENT',
      badgeColor: '#DC2626',
      location: 'WOODSIDE, CA',
      title: 'MINDFUL MOVEMENT RETREAT',
      description: 'Connect body, mind and spirit through movement',
      date: 'Oct 20—24, 2025',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const eventsToShow = relatedPrograms.length > 0 ? relatedPrograms.map((program, index) => ({
    id: index,
    badge: index % 2 === 0 ? 'GUEST EXPERT' : 'SIGNATURE EVENT',
    badgeColor: index % 2 === 0 ? '#D97706' : '#DC2626',
    location: program.location.split(' - ')[0].toUpperCase(),
    title: program.name.toUpperCase(),
    description: program.description || 'A transformative wellness experience',
    date: program.duration || 'Contact for details',
    image: program.imageGallery?.[0] || 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=400'
  })) : sampleEvents;

  const cardsPerView = 4;
  const maxSlides = Math.max(0, eventsToShow.length - cardsPerView);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxSlides));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const state = location.state as LocationState;

    if (!state || !state.programName) {
      navigate('/explore');
      return;
    }

    const loadProgram = async () => {
      try {
        const foundProgram = await fetchProgramByName(state.programName);
        if (foundProgram) {
          setProgram(foundProgram);
          const related = await fetchRelatedPrograms(foundProgram);
          setRelatedPrograms(related);
        } else {
          navigate('/explore');
        }
      } catch (error) {
        console.error('Error loading program:', error);
        navigate('/explore');
      }
    };

    loadProgram();
  }, [location.state, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const mainNavHeight = 80;
      const sectionNavHeight = sectionNavRef.current?.offsetHeight ?? 0;
      const offset = mainNavHeight + sectionNavHeight + 10;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (sectionNavRef.current && heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        setIsNavSticky(scrollTop >= (heroBottom - mainNavHeight));
      }

      let currentActiveSection = 'overview';

      for (const sectionId in sectionRefs) {
        const ref = sectionRefs[sectionId];
        if (ref.current) {
          const sectionTop = ref.current.offsetTop;
          const sectionBottom = sectionTop + ref.current.offsetHeight;

          if (scrollTop + offset >= sectionTop && scrollTop + offset < sectionBottom) {
            currentActiveSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentActiveSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [program]);

  useEffect(() => {
    if (program?.includes && program.includes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIncludedIndex((prev) => (prev + 1) % program.includes!.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [program]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const mainNavHeight = 80;
      const sectionNavHeight = 60;
      const offset = mainNavHeight + sectionNavHeight + 20;

      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  if (!program) {
    return (
      <div className="program-details-page">
        <div className="loading">Loading program details...</div>
      </div>
    );
  }

  return (
    <div className="program-details-page">
      {/* Hero Section */}
      <section ref={heroRef} className="hero-section">
        <div className="hero-image-container">
          <img
            src={program.imageGallery?.[0] || "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1200"}
            alt={program.name}
            className="hero-image"
          />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title-programdetails">{program.name.toUpperCase()}</h1>
              <p className="hero-subtitle-programdetails">A Transformative Wellness Journey in {program.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Section Navigation */}
      <nav ref={sectionNavRef} className={`section-navigation ${isNavSticky ? 'sticky' : ''}`}>
        <div className="section-nav-container">
          <button
            className={activeSection === 'overview' ? 'active' : ''}
            onClick={() => scrollToSection('overview')}
          >
            ABOUT PROGRAM
          </button>
          <button
            className={activeSection === 'included' ? 'active' : ''}
            onClick={() => scrollToSection('included')}
          >
            WHAT'S INCLUDED
          </button>
          <button
            className={activeSection === 'offers' ? 'active' : ''}
            onClick={() => scrollToSection('offers')}
          >
            SPECIAL OFFERS
          </button>
          <button
            className={activeSection === 'events' ? 'active' : ''}
            onClick={() => scrollToSection('events')}
          >
            EVENTS & RETREATS
          </button>
          <button
            className={activeSection === 'schedule' ? 'active' : ''}
            onClick={() => scrollToSection('schedule')}
          >
            DAILY SCHEDULE
          </button>
          <button
            className={activeSection === 'gallery' ? 'active' : ''}
            onClick={() => scrollToSection('gallery')}
          >
            GALLERY
          </button>
          <button
            className={activeSection === 'location' ? 'active' : ''}
            onClick={() => scrollToSection('location')}
          >
            ARRIVAL
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-container">
          {/* Program Overview Section */}
          <section id="overview" ref={overviewRef} className="content-section overview-section">
            <h2 className="section-title-programdetails">AWARD-WINNING WELLNESS</h2>
            <div className="overview-grid">
              <div className="overview-images">
                {program.imageGallery?.[1] && (
                  <img src={program.imageGallery[1]} alt="Program feature 1" />
                )}
                {program.imageGallery?.[2] && (
                  <img src={program.imageGallery[2]} alt="Program feature 2" />
                )}
                {program.imageGallery?.[3] && (
                  <img src={program.imageGallery[3]} alt="Program feature 3" />
                )}
              </div>
              <div className="overview-text">
                <p>{program.description || "Recognized with the highest honor of Three Keys by the Michelin Guide, this is a destination wellness resort that inspires. From movement to mindfulness, every aspect of well-being is nurtured during your transformative stay."}</p>
              </div>
            </div>
          </section>

          {/* Plan Your Journey Section */}
          <section className="content-section journey-section">
            <h2 className="section-title">PLAN YOUR JOURNEY</h2>
            <p className="section-subtitle">Choose a style of stay that works for your type of journey</p>
            <div className="journey-grid">
              <div className="journey-card">
                <img src={program.imageGallery?.[4] || "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="Stay Your Way" />
                <h3>Stay Your Way</h3>
              </div>
              <div className="journey-card">
                <img src={program.imageGallery?.[5] || "https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="Designed Experiences" />
                <h3>Designed Experiences</h3>
              </div>
              <div className="journey-card">
                <img src={program.imageGallery?.[6] || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="Events & Retreats" />
                <h3>Events & Retreats</h3>
              </div>
              <div className="journey-card">
                <img src={program.imageGallery?.[7] || "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="Group Stays" />
                <h3>Group Stays</h3>
              </div>
            </div>
          </section>

          {/* Always Included Section */}
          <section id="included" ref={includedRef} className="content-section included-section">
            <h2 className="section-title">ALWAYS INCLUDED</h2>
            <p className="section-subtitle">Every experience is designed to help you feel your best</p>
            {program.includes && program.includes.length > 0 ? (
              <div className="included-content">
                <div className="included-left">
                  <div className="included-list">
                    {program.includes.map((item, index) => (
                      <div
                        key={index}
                        className={`included-item ${index === currentIncludedIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIncludedIndex(index)}
                      >
                        <div className="included-icon">
                          {index === currentIncludedIndex ? '●' : '○'}
                        </div>
                        <div className="included-text">
                          <h4>{item.title}</h4>
                          {index === currentIncludedIndex && (
                            <p>{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="included-right">
                  <div className="included-image">
                    <img
                      src={program.imageGallery?.[currentIncludedIndex + 8] || "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=800"}
                      alt={program.includes[currentIncludedIndex].title}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-included">
                <p>No included features listed for this program.</p>
              </div>
            )}
          </section>

          {/* Special Offers Section */}
          <section id="offers" ref={offersRef} className="content-section offers-section">
            <h2 className="section-title">SPECIAL OFFERS</h2>
            <p className="section-subtitle">Explore limited-time offers to help you enjoy your perfect getaway</p>
            <div className="offers-grid">
              <div className="offer-card">
                <img src={program.imageGallery?.[9] || "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="Early Bird Special" />
                <div className="offer-content">
                  <h3>Big Ultimate Mindful Yoga Experience</h3>
                  <p>Enjoy a 3-day yoga retreat</p>
                </div>
              </div>
              <div className="offer-card">
                <img src={program.imageGallery?.[10] || "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="Extended Stay Discount" />
                <div className="offer-content">
                  <h3>Spa Fitness Getaway</h3>
                  <p>Enjoy a 3-day spa retreat</p>
                </div>
              </div>
            </div>
          </section>

          {/* Events & Retreats Section with Slider */}
          <section id="events" ref={eventsRef} className="content-section events-section">
            <div className="events-header">
              <h2 className="section-title events-title">EVENTS & RETREATS</h2>
              <p className="section-subtitle events-subtitle">Gain fresh perspectives on physical, spiritual, and mental wellness</p>
            </div>

            <div className="events-slider-container">
              <button 
                className={`slider-nav-btn slider-nav-prev ${currentSlide === 0 ? 'disabled' : ''}`}
                onClick={prevSlide}
                disabled={currentSlide === 0}
                aria-label="Previous events"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="events-slider-wrapper">
                <div 
                  className="events-slider"
                  style={{
                    transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`,
                  }}
                >
                  {eventsToShow.map((event) => (
                    <div key={event.id} className="event-slide-card">
                      <div className="event-card-image">
                        <img src={event.image} alt={event.title} />
                        <div className="event-card-overlay">
                          <div 
                            className="event-badge" 
                            style={{ backgroundColor: event.badgeColor }}
                          >
                            {event.badge}
                          </div>
                          <div className="event-card-content">
                            <div className="event-location">{event.location}</div>
                            <h3 className="event-title">{event.title}</h3>
                            <p className="event-description">{event.description}</p>
                            <div className="event-date">
                              <Calendar size={16} />
                              <span>{event.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                className={`slider-nav-btn slider-nav-next ${currentSlide >= maxSlides ? 'disabled' : ''}`}
                onClick={nextSlide}
                disabled={currentSlide >= maxSlides}
                aria-label="Next events"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {eventsToShow.length === 0 && (
              <div className="no-events">
                <p className="error-section-evenretreat">No events available at this location currently.</p>
              </div>
            )}
          </section>

          {/* Daily Schedule Section */}
          <section id="schedule" ref={scheduleRef} className="content-section schedule-section">
            <h2 className="section-title">DAILY SCHEDULE</h2>
            <p className="section-subtitle">Choose from over 40 daily organized resort activities, with three included in your stay</p>
            <div className="schedule-grid">
              <div className="schedule-card">
                <img src={program.imageGallery?.[11] || "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="Fitness Classes" />
                <h3>Fitness Classes + Outdoor Activities</h3>
              </div>
              <div className="schedule-card">
                <img src={program.imageGallery?.[12] || "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="Clinics & Workshops" />
                <h3>Clinics & Workshops</h3>
              </div>
              <div className="schedule-card">
                <img src={program.imageGallery?.[13] || "https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="Gatherings & Experiences" />
                <h3>Gatherings & Experiences</h3>
              </div>
              <div className="schedule-card">
                <img src={program.imageGallery?.[14] || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="View All Activities" />
                <h3>View All Activities</h3>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section id="gallery" ref={galleryRef} className="content-section gallery-section">
            <div className="gallery-hero">
              {program.imageGallery && program.imageGallery.length > 0 ? (
                <img src={program.imageGallery[0]} alt="Program Highlights" />
              ) : (
                <img src="https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Program Highlights" />
              )}
              <div className="gallery-overlay">
                <h2 className="gallery-title">{program.location.split(' - ')[0].toUpperCase()} HIGHLIGHTS</h2>
                {program.imageGallery && program.imageGallery.length > 0 && (
                  <button className="gallery-button" onClick={() => setShowGalleryModal(true)}>
                    VIEW GALLERY
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Location Section */}
          <section id="location" ref={locationRef} className="content-section location-section">
            <h2 className="section-title">{program.location.split(' - ')[0].toUpperCase()} ARRIVAL</h2>
            <div className="location-content">
              <div className="location-info">
                <p className="location-address">{program.details || "16350 Skyline Blvd., Woodside, CA 94062, United States"}</p>
                <p className="location-phone">Phone: +1 (650) 851-4777</p>
              </div>
              <div className="location-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.639!2d-122.2711!3d37.4419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI2JzMxLjAiTiAxMjLCsDE2JzE2LjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Program Location"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sticky Booking Widget */}
        <div className="booking-widget">
          <div className="booking-card">
            <h3 className="booking-title">Ready to Transform?</h3>
            <div className="booking-info">
              <div className="info-item">
                <span className="info-label">Duration:</span>
                <span className="info-value">{program.duration || 'Contact for details'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location:</span>
                <span className="info-value">{program.location}</span>
              </div>
              {program.bookingOptions?.pricePerPerson && (
                <div className="info-item">
                  <span className="info-label">Starting from:</span>
                  <span className="info-value price">{program.bookingOptions.pricePerPerson}</span>
                </div>
              )}
            </div>
            <button className="book-now-btn" onClick={() => setShowBookingModal(true)}>
              Book Now
            </button>
            <p className="booking-note">
              Secure your spot with our wellness experts
            </p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && program && (
        <BookingModal
          program={program}
          onClose={() => setShowBookingModal(false)}
          onSuccess={() => setShowBookingModal(false)}
        />
      )}

      {/* Gallery Modal */}
      {showGalleryModal && program.imageGallery && (
        <GalleryModal
          images={program.imageGallery}
          title={program.name}
          onClose={() => setShowGalleryModal(false)}
        />
      )}
    </div>
  );
};

export default ProgramDetailsPage;