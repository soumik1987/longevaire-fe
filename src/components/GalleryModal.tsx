import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/GalleryModal.css';

interface GalleryModalProps {
  images: string[];
  title: string;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ images, title, onClose }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  
  const imagesPerSlide = 12;
  const totalSlides = Math.ceil(images.length / imagesPerSlide);
  
  const getCurrentSlideImages = () => {
    const startIndex = currentSlide * imagesPerSlide;
    return images.slice(startIndex, startIndex + imagesPerSlide);
  };
  
  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-modal-header">
          <div className="gallery-header-left">
            <h2>{title}</h2>
            <p>Gallery Collection</p>
          </div>
          <button className="gallery-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="gallery-content">
          <div className="gallery-masonry">
            {getCurrentSlideImages().map((img, index) => {
              const globalIndex = currentSlide * imagesPerSlide + index;
              return (
                <div 
                  key={globalIndex} 
                  className={`gallery-item ${index % 3 === 0 ? 'tall' : index % 5 === 0 ? 'wide' : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`Gallery item ${globalIndex + 1}`} 
                    loading="lazy"
                  />
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
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
        
        {selectedImage && (
          <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
            <div className="lightbox-content">
              <img src={selectedImage} alt="Enlarged view" />
              <button 
                className="lightbox-close"
                onClick={() => setSelectedImage(null)}
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