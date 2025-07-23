import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProgramByName, fetchRelatedPrograms } from '../api';
import type { Program } from '../data/programs';
import BookingModal from '../components/BookingModal';
import GalleryModal from '../components/GalleryModal';
import { ChevronLeft, ChevronRight, Calendar, Utensils, Bed, CalendarDays, Mountain, Dumbbell, HeartPulse, Leaf, Sun, Moon, Waves, Bike } from 'lucide-react';
import '../styles/ProgramDetailsPage.css';

const ProgramDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [currentIncludedIndex, setCurrentIncludedIndex] = useState(0);
  const [relatedPrograms, setRelatedPrograms] = useState<Program[]>([]);
  const [currentEventSlide, setCurrentEventSlide] = useState(0);
  const [currentMobileIncludedSlide, setCurrentMobileIncludedSlide] = useState(0);
  const [currentMobileEventSlide, setCurrentMobileEventSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  
  // Initialize refs with proper null values
  const sectionNavRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const includedRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRequestRef = useRef<number | null>(null);

  const sectionRefs = useRef({
    overview: overviewRef,
    included: includedRef,
    offers: offersRef,
    events: eventsRef,
    schedule: scheduleRef,
    gallery: galleryRef,
    location: locationRef
  }).current;

  const preloadImages = useCallback((imageUrls: string[]) => {
    imageUrls.forEach(url => {
      if (!loadedImages.has(url)) {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(url));
        };
      }
    });
  }, [loadedImages]);

  const getIncludeIcon = useCallback((title: string) => {
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
  }, []);

  // Load program data
  useEffect(() => {
    const state = location.state as { programName: string };
    if (!state?.programName) {
      navigate('/explore');
      return;
    }

    const loadProgram = async () => {
      try {
        const foundProgram = await fetchProgramByName(state.programName);
        if (foundProgram) {
          setProgram(foundProgram);
          // Preload images as soon as we have the program data
          if (foundProgram.imageGallery) {
            preloadImages(foundProgram.imageGallery);
          }
          const related = await fetchRelatedPrograms(foundProgram);
          setRelatedPrograms(related);
          // Preload related program images
          related.forEach(p => {
            if (p.imageGallery?.[0]) {
              preloadImages([p.imageGallery[0]]);
            }
          });
        } else {
          navigate('/explore');
        }
      } catch (error) {
        navigate('/explore');
      }
    };

    loadProgram();
  }, [location.state, navigate, preloadImages]);

  const handleScroll = useCallback(() => {
    if (scrollRequestRef.current) {
      cancelAnimationFrame(scrollRequestRef.current);
    }

    scrollRequestRef.current = requestAnimationFrame(() => {
      const mainNavHeight = 80;
      const sectionNavHeight = sectionNavRef.current?.offsetHeight ?? 0;
      const offset = mainNavHeight + sectionNavHeight + 10;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDirection = scrollTop > lastScrollPosition ? 'down' : 'up';
      setLastScrollPosition(scrollTop);

      if (sectionNavRef.current && heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        const shouldBeSticky = scrollTop >= (heroBottom - mainNavHeight);
        
        if (shouldBeSticky !== isNavSticky) {
          setIsNavSticky(shouldBeSticky);
        }

        // Smooth transition for the sticky nav
        if (scrollDirection === 'down' && shouldBeSticky) {
          sectionNavRef.current.style.transform = 'translateY(0)';
          sectionNavRef.current.style.opacity = '1';
        } else if (scrollDirection === 'up' && !shouldBeSticky) {
          sectionNavRef.current.style.transform = 'translateY(-100%)';
          sectionNavRef.current.style.opacity = '0';
        }
      }

      let currentActiveSection = 'overview';
      for (const sectionId in sectionRefs) {
        const ref = sectionRefs[sectionId as keyof typeof sectionRefs].current;
        if (ref) {
          const sectionTop = ref.offsetTop;
          const sectionBottom = sectionTop + ref.offsetHeight;
          if (scrollTop + offset >= sectionTop && scrollTop + offset < sectionBottom) {
            currentActiveSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentActiveSection);
    });
  }, [isNavSticky, sectionRefs, lastScrollPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRequestRef.current) {
        cancelAnimationFrame(scrollRequestRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!program?.includes) return;
    const interval = setInterval(() => {
      setCurrentIncludedIndex(prev => (prev + 1) % program.includes!.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [program]);

  const scrollToSection = useCallback((sectionId: string) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const mainNavHeight = 80;
      const sectionNavHeight = 60;
      const offset = mainNavHeight + sectionNavHeight + 20;
      const targetPosition = element.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      scrollTimeoutRef.current = setTimeout(() => {
        setActiveSection(sectionId);
      }, 300);
    }
  }, []);

  const nextMobileIncludedSlide = useCallback(() => {
    if (!program?.includes) return;
    setCurrentMobileIncludedSlide(prev => 
      prev === program.includes!.length - 1 ? 0 : prev + 1
    );
  }, [program]);

  const prevMobileIncludedSlide = useCallback(() => {
    if (!program?.includes) return;
    setCurrentMobileIncludedSlide(prev => 
      prev === 0 ? program.includes!.length - 1 : prev - 1
    );
  }, [program]);

  const nextMobileEventSlide = useCallback(() => {
    if (!relatedPrograms.length) return;
    setCurrentMobileEventSlide(prev => 
      prev === relatedPrograms.length - 1 ? 0 : prev + 1
    );
  }, [relatedPrograms]);

  const prevMobileEventSlide = useCallback(() => {
    if (!relatedPrograms.length) return;
    setCurrentMobileEventSlide(prev => 
      prev === 0 ? relatedPrograms.length - 1 : prev - 1
    );
  }, [relatedPrograms]);

  const nextEventSlide = useCallback(() => {
    if (!relatedPrograms.length) return;
    const cardsPerView = window.innerWidth <= 576 ? 1 : window.innerWidth <= 1024 ? 3 : 4;
    setCurrentEventSlide(prev => 
      prev >= relatedPrograms.length - cardsPerView ? 0 : prev + 1
    );
  }, [relatedPrograms]);

  const prevEventSlide = useCallback(() => {
    if (!relatedPrograms.length) return;
    const cardsPerView = window.innerWidth <= 576 ? 1 : window.innerWidth <= 1024 ? 3 : 4;
    setCurrentEventSlide(prev => 
      prev === 0 ? relatedPrograms.length - cardsPerView : prev - 1
    );
  }, [relatedPrograms]);

  const goToEventSlide = useCallback((index: number) => {
    setCurrentEventSlide(index);
  }, []);

  const handleEventCardClick = useCallback((programName: string) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      navigate('/program-details', { 
        state: { programName }
      });
    }, 300); 
  }, [navigate]);

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
            loading="lazy"
            decoding="async"
          />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title-programdetails">{program.name.toUpperCase()}</h1>
              <p className="hero-subtitle-programdetails">A Transformative Wellness Journey in {program.location}</p>
            </div>
          </div>
        </div>
      </section>

      <nav 
        ref={sectionNavRef} 
        className={`section-navigation ${isNavSticky ? 'sticky' : ''}`}
        style={{
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
          willChange: 'transform, opacity',
          transform: isNavSticky ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isNavSticky ? 1 : 0
        }}
      >
        <div className="section-nav-container">
          {Object.keys(sectionRefs).map((section) => (
            <button 
              key={section}
              className={activeSection === section ? 'active' : ''} 
              onClick={() => scrollToSection(section)}
            >
              {section === 'overview' && 'ABOUT PROGRAM'}
              {section === 'included' && "WHAT'S INCLUDED"}
              {section === 'offers' && 'SPECIAL OFFERS'}
              {section === 'events' && 'EVENTS & RETREATS'}
              {section === 'schedule' && 'DAILY SCHEDULE'}
              {section === 'gallery' && 'GALLERY'}
              {section === 'location' && 'ARRIVAL'}
            </button>
          ))}
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
                      <img src={program.imageGallery[0]} alt="Program feature left" loading="lazy" decoding="async" />
                    </div>
                    <div className="image-item center-image">
                      <img src={program.imageGallery[1]} alt="Program feature center" loading="lazy" decoding="async" />
                    </div>
                    <div className="image-item right-image">
                      <img src={program.imageGallery[2]} alt="Program feature right" loading="lazy" decoding="async" />
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

        <section id="included" ref={includedRef} className="content-section included-section">
          <div className="included-header">
            <h2 className="section-title">ALWAYS INCLUDED</h2>
            <p className="section-subtitle">When you want it all taken care of, it matters where you stay.</p>
          </div>
          
          <div className="desktop-included-view">
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
                          onClick={() => setCurrentIncludedIndex(index)}
                        >
                          <div className="feature-icon">
                            {getIncludeIcon(item.title)}
                          </div>
                          <div className="feature-text">
                            <h4>{item.title}</h4>
                            {currentIncludedIndex === index && (
                              <>
                                <p className="feature-description">{item.description}</p>
                                <div className="progress-bar-include">
                                  <div className="progress-fill-include"></div>
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
                      loading="lazy"
                      decoding="async"
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
          </div>

          <div className="mobile-included-view">
            {program?.includes && program.includes.length > 0 ? (
              <div className="mobile-included-slider">
                <div className="mobile-included-slider-container">
                  <div 
                    className="mobile-included-slides"
                    style={{
                      transform: `translateX(-${currentMobileIncludedSlide * 100}%)`,
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {program.includes.map((item, index) => (
                      <div key={index} className="mobile-included-slide">
                        <div className="mobile-included-card">
                          <div className="mobile-included-image-container">
                            <img
                              src={program.imageGallery?.[index + 8] || "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=800"}
                              alt={item.title}
                              className="mobile-included-image"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <div className="mobile-included-content">
                            <div className="mobile-included-header">
                              <div className="mobile-included-icon">
                                {getIncludeIcon(item.title)}
                              </div>
                              <h3>{item.title}</h3>
                            </div>
                            <p className="mobile-included-description">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mobile-included-nav">
                  <button 
                    className="mobile-included-prev"
                    onClick={prevMobileIncludedSlide}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div className="mobile-included-dots">
                    {program.includes.map((_, index) => (
                      <button
                        key={index}
                        className={`mobile-included-dot ${currentMobileIncludedSlide === index ? 'active' : ''}`}
                        onClick={() => setCurrentMobileIncludedSlide(index)}
                      />
                    ))}
                  </div>
                  <button 
                    className="mobile-included-next"
                    onClick={nextMobileIncludedSlide}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-included">
                <p>No included features listed for this program.</p>
              </div>
            )}
          </div>
        </section>

        <section id="offers" ref={offersRef} className="content-section offers-section">
          <h2 className="section-title">SPECIAL OFFERS</h2>
          <p className="section-subtitle">Explore limited-time offers to help you enjoy your perfect getaway</p>
          <div className="offers-grid">
            <div className="offer-card">
              <img src={program.imageGallery?.[9] || "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="Early Bird Special" loading="lazy" decoding="async" />
              <div className="offer-content">
                <h3>Big Ultimate Mindful Yoga Experience</h3>
                <p>Enjoy a 3-day yoga retreat</p>
              </div>
            </div>
            <div className="offer-card">
              <img src={program.imageGallery?.[10] || "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="Extended Stay Discount" loading="lazy" decoding="async" />
              <div className="offer-content">
                <h3>Spa Fitness Getaway</h3>
                <p>Enjoy a 3-day spa retreat</p>
              </div>
            </div>
          </div>
        </section>

        <section id="events" ref={eventsRef} className="content-section events-section">
          <div className="events-header">
            <h2 className="section-title">EVENTS & RETREATS</h2>
            <p className="section-subtitle">Gain fresh perspectives on physical, spiritual, and mental wellness</p>
          </div>

          <div className="desktop-events-view">
            <div className="events-slider-container">
              <button
                className="slider-nav-btn slider-nav-prev"
                onClick={prevEventSlide}
              >
                <ChevronLeft size={24} />
              </button>
              <div className="events-slider-wrapper">
                <div
                  className={`events-slider ${relatedPrograms.length <= 2 ? 'display-two-cards-desktop' : 'display-five-cards-desktop'}`}
                  style={{
                    transform: `translateX(-${currentEventSlide * (100 / (relatedPrograms.length <= 2 ? 2 : 5))}%)`,
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {relatedPrograms.map((program, index) => (
                    <div 
                      key={index} 
                      className="event-slide-card"
                      onClick={() => handleEventCardClick(program.name)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="event-card-image">
                        <img src={program.imageGallery?.[0] || "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=400"} alt={program.name} loading="lazy" decoding="async" />
                        <div className="event-card-overlay">
                          <div className="event-badge" style={{ backgroundColor: index % 2 === 0 ? '#D97706' : '#DC2626' }}>
                            {index % 2 === 0 ? 'GUEST EXPERT' : 'SIGNATURE EVENT'}
                          </div>
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
                  ))}
                </div>
              </div>
              <button
                className="slider-nav-btn slider-nav-next"
                onClick={nextEventSlide}
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="slider-pagination">
              {Array.from({ length: Math.ceil(relatedPrograms.length / (relatedPrograms.length <= 2 ? 2 : 5)) }).map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${Math.floor(currentEventSlide / (relatedPrograms.length <= 2 ? 2 : 5)) === index ? 'active' : ''}`}
                  onClick={() => goToEventSlide(index * (relatedPrograms.length <= 2 ? 2 : 5))}
                />
              ))}
            </div>
          </div>

          <div className="mobile-events-view">
            {relatedPrograms.length > 0 ? (
              <div className="mobile-events-slider">
                <div className="mobile-events-slider-container">
                  <div
                    className="mobile-events-slides"
                    style={{
                      transform: `translateX(-${currentMobileEventSlide * 100}%)`,
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {relatedPrograms.map((program, index) => (
                      <div 
                        key={index} 
                        className="mobile-events-slide"
                        onClick={() => handleEventCardClick(program.name)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="mobile-events-card">
                          <div className="mobile-events-image-container">
                            <img
                              src={program.imageGallery?.[0] || "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=400"}
                              alt={program.name}
                              className="mobile-events-image"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="mobile-events-overlay">
                              <div className="mobile-events-badge" style={{ backgroundColor: index % 2 === 0 ? '#D97706' : '#DC2626' }}>
                                {index % 2 === 0 ? 'GUEST EXPERT' : 'SIGNATURE EVENT'}
                              </div>
                              <div className="mobile-events-location">{program.location.split(' - ')[0].toUpperCase()}</div>
                              <h3 className="mobile-events-title">{program.name.toUpperCase()}</h3>
                              <p className="mobile-events-description">{program.description || 'A transformative wellness experience'}</p>
                              <div className="mobile-events-date">
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
                <div className="mobile-events-nav">
                  <button
                    className="mobile-events-prev"
                    onClick={prevMobileEventSlide}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div className="mobile-events-dots">
                    {relatedPrograms.map((_, index) => (
                      <button
                        key={index}
                        className={`mobile-events-dot ${currentMobileEventSlide === index ? 'active' : ''}`}
                        onClick={() => setCurrentMobileEventSlide(index)}
                      />
                    ))}
                  </div>
                  <button
                    className="mobile-events-next"
                    onClick={nextMobileEventSlide}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-events">
                <p>No related events or retreats found.</p>
              </div>
            )}
          </div>
        </section>

        <section id="schedule" ref={scheduleRef} className="content-section schedule-section">
          <h2 className="section-title">DAILY SCHEDULE</h2>
          <p className="section-subtitle">Choose from over 40 daily organized resort activities, with three included in your stay</p>
          <div className="schedule-grid">
            <div className="schedule-card">
              <img src={program.imageGallery?.[11] || "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="Fitness Classes" loading="lazy" decoding="async" />
              <h3>Fitness Classes + Outdoor Activities</h3>
            </div>
            <div className="schedule-card">
              <img src={program.imageGallery?.[12] || "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="Clinics & Workshops" loading="lazy" decoding="async" />
              <h3>Clinics & Workshops</h3>
            </div>
            <div className="schedule-card">
              <img src={program.imageGallery?.[13] || "https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="Gatherings & Experiences" loading="lazy" decoding="async" />
              <h3>Gatherings & Experiences</h3>
            </div>
            <div className="schedule-card">
              <img src={program.imageGallery?.[14] || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="View All Activities" loading="lazy" decoding="async" />
              <h3>View All Activities</h3>
            </div>
          </div>
        </section>

        <section id="gallery" ref={galleryRef} className="content-section gallery-section">
          <div className="gallery-hero">
            {program.imageGallery && program.imageGallery.length > 0 ? (
              <img src={program.imageGallery[0]} alt="Program Highlights" loading="lazy" decoding="async" />
            ) : (
              <img src="https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Program Highlights" loading="lazy" decoding="async" />
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