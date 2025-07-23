import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/GalleryModal.css';

interface GalleryModalProps {
  images: string[];
  title: string;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ images, title, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  const imagesPerSlide = 12;
  const totalSlides = Math.ceil(images.length / imagesPerSlide);
  
  // Preload next and previous slides
  useEffect(() => {
    const preloadImages = () => {
      const startIndex = Math.max(0, currentSlide - 1) * imagesPerSlide;
      const endIndex = Math.min(images.length, (currentSlide + 2) * imagesPerSlide);
      
      for (let i = startIndex; i < endIndex; i++) {
        if (!loadedImages.has(images[i])) {
          const img = new Image();
          img.src = images[i];
          img.onload = () => {
            setLoadedImages(prev => new Set(prev).add(images[i]));
          };
        }
      }
    };
    
    preloadImages();
  }, [currentSlide, images, loadedImages]);

  const getCurrentSlideImages = () => {
    const startIndex = currentSlide * imagesPerSlide;
    return images.slice(startIndex, startIndex + imagesPerSlide);
  };
  
  const nextSlide = () => {
    if (currentSlide >= totalSlides - 1 || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };
  
  const prevSlide = () => {
    if (currentSlide <= 0 || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(prev => Math.max(prev - 1, 0));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleImageClick = (img: string) => {
    // Check if image is loaded before showing in lightbox
    if (loadedImages.has(img)) {
      setSelectedImage(img);
    }
  };

  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div className={`gallery-modal-content ${isTransitioning ? 'transitioning' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="gallery-modal-header">
          <div className="gallery-header-left">
            <h2>{title}</h2>
            <p>Gallery Collection</p>
          </div>
          <button 
            className="gallery-close-btn" 
            onClick={onClose}
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="gallery-content">
          <div className="gallery-masonry">
            {getCurrentSlideImages().map((img, index) => {
              const globalIndex = currentSlide * imagesPerSlide + index;
              const isLoaded = loadedImages.has(img);
              
              return (
                <div 
                  key={globalIndex} 
                  className={`gallery-item ${index % 3 === 0 ? 'tall' : index % 5 === 0 ? 'wide' : ''} ${isLoaded ? 'loaded' : 'loading'}`}
                  onClick={() => handleImageClick(img)}
                >
                  {isLoaded ? (
                    <img 
                      src={img} 
                      alt={`Gallery item ${globalIndex + 1}`} 
                      loading="lazy"
                      decoding="async"
                      width={300}
                      height={200}
                    />
                  ) : (
                    <div className="image-placeholder"></div>
                  )}
                  <div className="gallery-item-overlay">
                    <span className="gallery-item-number">{globalIndex + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {totalSlides > 1 && (
            <div className="gallery-navigation">
              <button 
                className={`gallery-nav-btn ${currentSlide === 0 ? 'disabled' : ''}`}
                onClick={prevSlide}
                disabled={currentSlide === 0}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="gallery-pagination">
                <span>{currentSlide + 1} of {totalSlides}</span>
              </div>
              
              <button 
                className={`gallery-nav-btn ${currentSlide === totalSlides - 1 ? 'disabled' : ''}`}
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
        
        {selectedImage && (
          <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="lightbox-image"
              />
              <button 
                className="lightbox-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryModal;