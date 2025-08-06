

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import '../styles/AnimatedSlideshow.css';
import { useNavigate } from 'react-router-dom';
import '../styles/Slideshow.css';

interface AnimatedSlide {
  id: number;
  title: string;
  subtitle: string;
  videoUrl: string;
}

const AnimatedSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const slideshowRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const slides: AnimatedSlide[] = [
    {
      id: 1,
      title: 'Discover Inner Peace',
      subtitle: 'Find balance and tranquility through our wellness programs',
      videoUrl: 'https://videos.pexels.com/video-files/3130967/3130967-uhd_2560_1440_24fps.mp4'
    },
    {
      id: 2,
      title: 'Rejuvenate Your Soul',
      subtitle: 'Experience transformative wellness journeys designed for your well-being',
      videoUrl: 'https://videos.pexels.com/video-files/5658056/5658056-hd_1920_1080_24fps.mp4'
    },
    {
      id: 3,
      title: 'Embrace Serenity',
      subtitle: 'Connect with nature and discover your path to mindful living',
      videoUrl: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4'
    },
    {
      id: 4,
      title: 'Transform Your Being',
      subtitle: 'Unlock your potential through mindful practices and holistic wellness',
      videoUrl: 'https://videos.pexels.com/video-files/8818531/8818531-uhd_2560_1440_25fps.mp4'
    },
    {
      id: 5,
      title: 'Find Your Balance',
      subtitle: 'Journey towards harmony with our expertly crafted wellness experiences',
      videoUrl: 'https://videos.pexels.com/video-files/3783761/3783761-hd_1920_1080_25fps.mp4'
    },
    {
      id: 6,
      title: 'Awaken Your Energy',
      subtitle: 'Revitalize body and mind with outdoor mindful movement',
      videoUrl: 'https://videos.pexels.com/video-files/6298195/6298195-uhd_2560_1440_25fps.mp4'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        audioRef.current?.pause();
      } else {
        videoRef.current.play().catch(() => {});
        audioRef.current?.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleBookClick = () => {
    audioRef.current?.pause();
    navigate('/explore');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            if (isPlaying) {
              audioRef.current?.play().catch(() => {});
            }
          } else {
            audioRef.current?.pause();
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    if (slideshowRef.current) {
      observer.observe(slideshowRef.current);
    }

    return () => {
      if (slideshowRef.current) {
        observer.unobserve(slideshowRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }

    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, [currentSlide]);

  return (
    <section className="hero-slideshow" ref={slideshowRef}>
      {/* 🎵 Background Music */}
      <audio ref={audioRef} loop preload="auto">
        <source
          src="https://www.bensound.com/bensound-music/bensound-tenderness.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* 🎥 Background Video */}
      <div className="hero-slideshow__video-container">
        <video
          ref={videoRef}
          className="hero-slideshow__video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={slides[currentSlide].videoUrl} type="video/mp4" />
        </video>
        <div className="hero-slideshow__overlay"></div>
      </div>

      {/* 📝 Slide Content */}
      <div className="hero-slideshow__content">
        <div className="hero-slideshow__content-inner">
          <h1 className="slide-title hero-slideshow__title">
            {slides[currentSlide].title}
          </h1>
          <p className="slide-description hero-slideshow__subtitle">
            {slides[currentSlide].subtitle}
          </p>
          <div className="hero-slideshow__cta">
            <button className="hero-slideshow__button" onClick={handleBookClick}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* ⬅️➡️ Arrows */}
      <button
        onClick={prevSlide}
        className="hero-slideshow__nav-button hero-slideshow__nav-button--prev"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="hero-slideshow__nav-button hero-slideshow__nav-button--next"
      >
        <ChevronRight size={24} />
      </button>

      {/* ⏯️ Play/Pause */}
      <button onClick={toggleVideo} className="hero-slideshow__video-control">
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* 🔘 Pagination Dots */}
      <div className="dot-indicator hero-slideshow__pagination">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`hero-slideshow__dot ${
              index === currentSlide ? 'hero-slideshow__dot--active' : ''
            }`}
          />
        ))}
      </div>

      {/* 📊 Progress Bar */}
      <div className="progress-bar hero-slideshow__progress">
        <div
          className="progress hero-slideshow__progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </section>
  );
};

export default AnimatedSlideshow;
