// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import '../styles/Slideshow.css';

// interface Slide {
//   id: number;
//   image: string;
//   title: string;
//   description: string;
// }

// const slides: Slide[] = [
//   {
//     id: 1,
//     image: 'https://pranissa-media.s3.us-east-1.amazonaws.com/images/snowbath.png',
//     title: 'Discover Inner Peace',
//     description: 'Find balance and tranquility through our wellness programs'
//   },
//   {
//     id: 2,
//     image: 'https://images.pexels.com/photos/3984339/pexels-photo-3984339.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
//     title: 'Holistic Health Solutions',
//     description: 'Comprehensive wellness approaches for mind, body, and spirit'
//   },
//   {
//     id: 3,
//     image: 'https://pranissa-media.s3.us-east-1.amazonaws.com/images/5starhotel.png',
//     title: 'Mindful Living',
//     description: 'Transform your daily routine with mindfulness practices'
//   },
//   {
//     id: 4,
//     image: 'https://pranissa-media.s3.us-east-1.amazonaws.com/images/yoga.png',
//     title: 'Natural Healing',
//     description: 'Embrace the power of nature in your wellness journey'
//   },
//   {
//     id: 5,
//     image: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
//     title: 'Fitness & Vitality',
//     description: 'Build strength and energy through personalized fitness programs'
//   }
// ];

// const Slideshow: React.FC = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   useEffect(() => {
//     if (!isAutoPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isAutoPlaying]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const progress = ((currentSlide + 1) / slides.length) * 100;

//   return (
//     <div className="slideshow">
//       <div className="slide-wrapper">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`slide ${
//               index === currentSlide
//                 ? 'active'
//                 : index < currentSlide
//                 ? 'left'
//                 : 'right'
//             }`}
//           >
//             <img src={slide.image} alt={slide.title} className="slide-image" />
//             <div className="slide-overlay"></div>
//             <div className="slide-text">
//               <h1 className="slide-title">{slide.title}</h1>
//               <p className="slide-description">{slide.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button className="nav-button left" onClick={prevSlide}>
//         <ChevronLeft size={24} />
//       </button>
//       <button className="nav-button right" onClick={nextSlide}>
//         <ChevronRight size={24} />
//       </button>

//       <div className="dot-indicators">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`dot ${index === currentSlide ? 'active-dot' : ''}`}
//           />
//         ))}
//       </div>

//       <div className="progress-bar">
//         <div
//           className="progress"
//           style={{ width: `${progress}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Slideshow;













import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Slideshow.css';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://pranissa-media.s3.us-east-1.amazonaws.com/images/snowbath.png',
    title: 'Discover Inner Peace',
    description: 'Find balance and tranquility through our wellness programs'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/3984339/pexels-photo-3984339.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    title: 'Holistic Health Solutions',
    description: 'Comprehensive wellness approaches for mind, body, and spirit'
  },
  {
    id: 3,
    image: 'https://pranissa-media.s3.us-east-1.amazonaws.com/images/5starhotel.png',
    title: 'Mindful Living',
    description: 'Transform your daily routine with mindfulness practices'
  },
  {
    id: 4,
    image: 'https://pranissa-media.s3.us-east-1.amazonaws.com/images/yoga.png',
    title: 'Natural Healing',
    description: 'Embrace the power of nature in your wellness journey'
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    title: 'Fitness & Vitality',
    description: 'Build strength and energy through personalized fitness programs'
  }
];

const Slideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;

  const handleBookClick = () => {
    navigate('/explore');
  };

  return (
    <div className="slideshow">
      <div className="slide-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${
              index === currentSlide
                ? 'active'
                : index < currentSlide
                ? 'left'
                : 'right'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="slide-image" />
            <div className="slide-overlay"></div>
            <div className="slide-text">
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-description">{slide.description}</p>
              <button 
                className="slideshow-book-btn"
                onClick={handleBookClick}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="nav-button left" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>
      <button className="nav-button right" onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>

      <div className="dot-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`dot ${index === currentSlide ? 'active-dot' : ''}`}
          />
        ))}
      </div>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Slideshow;