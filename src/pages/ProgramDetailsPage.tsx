import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProgramByName, fetchRelatedPrograms } from '../api';
import type { Program } from '../data/programs';
import BookingModal from '../components/BookingModal';
import GalleryModal from '../components/GalleryModal';
import { ChevronLeft, ChevronRight, Calendar, Utensils, Bed, CalendarDays, Mountain, Dumbbell, HeartPulse, Leaf, Sun, Moon, Waves, Bike } from 'lucide-react';
import '../styles/ProgramDetailsPage.css';

interface LocationState {
  programName: string;
}

interface SectionRefs {
  overview: React.RefObject<HTMLDivElement>;
  included: React.RefObject<HTMLDivElement>;
  offers: React.RefObject<HTMLDivElement>;
  events: React.RefObject<HTMLDivElement>;
  schedule: React.RefObject<HTMLDivElement>;
  gallery: React.RefObject<HTMLDivElement>;
  location: React.RefObject<HTMLDivElement>;
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
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  // const [expandedIncludes, setExpandedIncludes] = useState<Record<number, boolean>>({});

  const sectionNavRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const includedRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const sectionRefs: SectionRefs = {
    overview: overviewRef as React.RefObject<HTMLDivElement>,
    included: includedRef as React.RefObject<HTMLDivElement>,
    offers: offersRef as React.RefObject<HTMLDivElement>,
    events: eventsRef as React.RefObject<HTMLDivElement>,
    schedule: scheduleRef as React.RefObject<HTMLDivElement>,
    gallery: galleryRef as React.RefObject<HTMLDivElement>,
    location: locationRef as React.RefObject<HTMLDivElement>
  };

  const getIncludeIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('dining') || lowerTitle.includes('chef') || lowerTitle.includes('food')) {
      return <Utensils size={20} />;
    } else if (lowerTitle.includes('accommodation') || lowerTitle.includes('room') || lowerTitle.includes('stay')) {
      return <Bed size={20} />;
    } else if (lowerTitle.includes('activity') || lowerTitle.includes('event') || lowerTitle.includes('schedule')) {
      return <CalendarDays size={20} />;
    } else if (lowerTitle.includes('setting') || lowerTitle.includes('nature') || lowerTitle.includes('view')) {
      return <Mountain size={20} />;
    } else if (lowerTitle.includes('spa') || lowerTitle.includes('wellness') || lowerTitle.includes('massage')) {
      return <HeartPulse size={20} />;
    } else if (lowerTitle.includes('sport') || lowerTitle.includes('fitness') || lowerTitle.includes('gym')) {
      return <Dumbbell size={20} />;
    } else if (lowerTitle.includes('health') || lowerTitle.includes('medical') || lowerTitle.includes('therapy')) {
      return <HeartPulse size={20} />;
    } else if (lowerTitle.includes('yoga') || lowerTitle.includes('meditation') || lowerTitle.includes('mindfulness')) {
      return <Leaf size={20} />;
    } else if (lowerTitle.includes('morning') || lowerTitle.includes('sunrise') || lowerTitle.includes('day')) {
      return <Sun size={20} />;
    } else if (lowerTitle.includes('night') || lowerTitle.includes('evening') || lowerTitle.includes('sleep')) {
      return <Moon size={20} />;
    } else if (lowerTitle.includes('water') || lowerTitle.includes('pool') || lowerTitle.includes('swim')) {
      return <Waves size={20} />;
    } else if (lowerTitle.includes('cycling') || lowerTitle.includes('bike')) {
      return <Bike size={20} />;
    }
    return <Utensils size={20} />;
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
        const ref = sectionRefs[sectionId as keyof SectionRefs];
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [program]);

  useEffect(() => {
    if (!program?.includes) return;

    const interval = setInterval(() => {
      setCurrentIncludedIndex(prev => (prev + 1) % program.includes!.length);
    }, 4000);

    return () => clearInterval(interval);
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

      <nav ref={sectionNavRef} className={`section-navigation ${isNavSticky ? 'sticky' : ''}`}>
        <div className="section-nav-container">
          <button className={activeSection === 'overview' ? 'active' : ''} onClick={() => scrollToSection('overview')}>
            ABOUT PROGRAM
          </button>
          <button className={activeSection === 'included' ? 'active' : ''} onClick={() => scrollToSection('included')}>
            WHAT'S INCLUDED
          </button>
          <button className={activeSection === 'offers' ? 'active' : ''} onClick={() => scrollToSection('offers')}>
            SPECIAL OFFERS
          </button>
          <button className={activeSection === 'events' ? 'active' : ''} onClick={() => scrollToSection('events')}>
            EVENTS & RETREATS
          </button>
          <button className={activeSection === 'schedule' ? 'active' : ''} onClick={() => scrollToSection('schedule')}>
            DAILY SCHEDULE
          </button>
          <button className={activeSection === 'gallery' ? 'active' : ''} onClick={() => scrollToSection('gallery')}>
            GALLERY
          </button>
          <button className={activeSection === 'location' ? 'active' : ''} onClick={() => scrollToSection('location')}>
            ARRIVAL
          </button>
        </div>
      </nav>

      <div className="content-container">
        <section id="overview" ref={overviewRef} className="content-section overview-section">
          <div className="overview-wrapper">
            <div className="overview-content">
              <div className="award-winning-container-top">
                <div className="award-winning-content-top">
                  <h2 className="award-winning-title">AWARD-WINNING WELLNESS</h2>
                  <p className="award-winning-subtitle">
                    Recognized with the highest honor of Three Keys by the Michelin Guide
                  </p>
                </div>
              </div>
              <div className="image-grid-special-container">
                {program.imageGallery?.[0] && program.imageGallery?.[1] && program.imageGallery?.[2] ? (
                  <div className="image-grid-special">
                    <div className="image-item left-image">
                      <img src={program.imageGallery[0]} alt="Program feature left" />
                    </div>
                    <div className="image-item center-image">
                      <img src={program.imageGallery[1]} alt="Program feature center" />
                    </div>
                    <div className="image-item right-image">
                      <img src={program.imageGallery[2]} alt="Program feature right" />
                    </div>
                  </div>
                ) : (
                  <p>Not enough images to display the special layout.</p>
                )}
              </div>
              <div className="description-below-images">
                <p>
                  {program.description || `Harness the regenerative power of stem cells in Tucson's unique desert environment, combining advanced medical treatments with natural healing elements for comprehensive rejuvenation.`}
                </p>
              </div>
            </div>
            <div className="overview-booking-card">
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
        </section>

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

        <section id="included" ref={includedRef} className="content-section included-section">
        <div className="included-header">
          <h2 className="section-title">ALWAYS INCLUDED</h2>
          <p className="section-subtitle">When you want it all taken care of, it matters where you stay.</p>
        </div>
        
        {program?.includes && program.includes.length > 0 ? (
          <div className="included-content-wrapper">
            <div className="included-features">
              <div className="included-feature active">
                <h3 className="feature-title">Program Features</h3>
                <ul className="feature-list">
                  {program.includes.map((item, index) => (
                    <li 
                      key={index}
                      className={`feature-item ${currentIncludedIndex === index ? 'active' : ''}`}
                    >
                      <div className="feature-icon">
                        {getIncludeIcon(item.title)}
                      </div>
                      <div className="feature-text">
                        <h4>{item.title}</h4>
                        {currentIncludedIndex === index && (
                          <>
                            <p className="feature-description">{item.description}</p>
                            <div className="progress-bar">
                              <div className="progress-fill"></div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="feature-toggle">
                        {currentIncludedIndex === index ? '-' : '+'}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="included-image-container">
              <div className="included-image-wrapper">
                <img
                  src={program.imageGallery?.[currentIncludedIndex + 8] || "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=800"}
                  alt={program.includes[currentIncludedIndex].title}
                  className="included-image"
                />
              </div>
              
              <div className="included-extra-info">
                <h4>20+ Daily Optional Activities</h4>
                <ul>
                  <li>A Peaceful Setting in the Redwoods</li>
                  <li>World-Class Spa Amenities</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-included">
            <p>No included features listed for this program.</p>
          </div>
        )}
      </section>

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

        <section id="events" ref={eventsRef} className="content-section events-section">
          <div className="events-header">
            <h2 className="section-title events-title">EVENTS & RETREATS</h2>
            <p className="section-subtitle events-subtitle">Gain fresh perspectives on physical, spiritual, and mental wellness</p>
          </div>
          <div className="events-slider-container">
            <button 
              className={`slider-nav-btn slider-nav-prev ${currentSlide === 0 ? 'disabled' : ''}`}
              onClick={() => setCurrentSlide(Math.max(currentSlide - 1, 0))}
              disabled={currentSlide === 0}
              aria-label="Previous events"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="events-slider-wrapper">
              <div 
                className="events-slider"
                style={{
                  transform: `translateX(-${currentSlide * (100 / 4)}%)`,
                }}
              >
                {relatedPrograms.map((program, index) => (
                  <div key={index} className="event-slide-card">
                    <div className="event-card-image">
                      <img src={program.imageGallery?.[0] || "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=400"} alt={program.name} />
                      <div className="event-card-overlay">
                        <div className="event-badge" style={{ backgroundColor: index % 2 === 0 ? '#D97706' : '#DC2626' }}>
                          {index % 2 === 0 ? 'GUEST EXPERT' : 'SIGNATURE EVENT'}
                        </div>
                        <div className="event-card-content">
                          <div className="event-location">{program.location.split(' - ')[0].toUpperCase()}</div>
                          <h3 className="event-title">{program.name.toUpperCase()}</h3>
                          <p className="event-description">{program.description || 'A transformative wellness experience'}</p>
                          <div className="event-date">
                            <Calendar size={16} />
                            <span>{program.duration || 'Contact for details'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button 
              className={`slider-nav-btn slider-nav-next ${currentSlide >= Math.max(0, relatedPrograms.length - 4) ? 'disabled' : ''}`}
              onClick={() => setCurrentSlide(Math.min(currentSlide + 1, Math.max(0, relatedPrograms.length - 4)))}
              disabled={currentSlide >= Math.max(0, relatedPrograms.length - 4)}
              aria-label="Next events"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </section>

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

        <section id="location" ref={locationRef} className="content-section location-section">
          <div className="section-header">
            <h2 className="section-title">{program.location.split(' - ')[0].toUpperCase()} ARRIVAL</h2>
            <p className="section-subtitle">Find your way to our wellness sanctuary</p>
          </div>
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
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Program Location"
              />
            </div>
          </div>
        </section>
      </div>

      {showBookingModal && program && (
        <BookingModal
          program={program}
          onClose={() => setShowBookingModal(false)}
          onSuccess={() => setShowBookingModal(false)}
        />
      )}

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