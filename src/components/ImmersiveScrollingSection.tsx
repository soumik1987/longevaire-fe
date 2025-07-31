import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/ImmersiveScrollingSection.css';
import { useNavigate } from 'react-router-dom';


interface CardContent {
  label: string;
  heading: string;
  description: string;
  actionText: string;
}

interface SectionData {
  id: string;
  backgroundUrl: string;
  cardContent: CardContent;
}

const sectionData: SectionData[] = [
  {
    id: 'redefining-luxury',
    backgroundUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    cardContent: {
      label: 'PREMIER DESTINATIONS',
      heading: 'Redefining luxury wellness',
      description: 'Experience elite retreats with absolute privacy, world-class care, and holistic renewal. Discover the pinnacle of global wellness.',
      actionText: 'Discover →'
    }
  },
  {
    id: 'exclusive-access',
    backgroundUrl: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    cardContent: {
      label: 'CURATED EXPERIENCES',
      heading: 'Exclusive access worldwide',
      description: 'Explore a select network of renowned centers, offering transformative programs for discerning clients.',
      actionText: 'Browse →'
    }
  },
  {
    id: 'global-leaders',
    backgroundUrl: 'https://pranissa-media.s3.us-east-1.amazonaws.com/images/6starhotel.png',
    cardContent: {
      label: 'TOP PRACTITIONERS',
      heading: 'Global wellness leaders',
      description: 'Engage with leading specialists delivering tailored therapies and measurable results.',
      actionText: 'Connect →'
    }
  },
  {
    id: 'personalized-plans',
    backgroundUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    cardContent: {
      label: 'PRIVATE SESSIONS',
      heading: 'Personalized wellness plans',
      description: 'Book confidential consultations with elite advisors for bespoke guidance and exceptional service.',
      actionText: 'Schedule →'
    }
  }
];

interface ScrollCardSectionProps {
  section: SectionData;
  isActive: boolean;
  onIntersect: (id: string, isIntersecting: boolean) => void;
}

const ScrollCardSection: React.FC<ScrollCardSectionProps> = ({ section, isActive, onIntersect }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onIntersect(section.id, entry.isIntersecting);
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [section.id, onIntersect]);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div 
      ref={sectionRef}
      className={`scroll-card-section ${isActive ? 'active' : ''}`}
      style={{ backgroundImage: `url(${section.backgroundUrl})` }}
    >
      <motion.div 
        ref={cardRef}
        className="content-card"
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="card-label">{section.cardContent.label}</div>
        <h2 className="card-heading">{section.cardContent.heading}</h2>
        <p className="card-description">{section.cardContent.description}</p>
        <motion.button
  className="card-action"
  onClick={() => navigate('/explore')}
  whileHover={{ x: 5 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }}
>
  {section.cardContent.actionText}
</motion.button>

      </motion.div>
    </div>
  );
};

const ImmersiveScrollSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(sectionData[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleIntersect = (id: string, isIntersecting: boolean) => {
    if (isIntersecting) {
      setActiveSection(id);
    }
  };

  return (
    <div ref={containerRef} className="immersive-scroll-container">
      {sectionData.map((section) => (
        <ScrollCardSection
          key={section.id}
          section={section}
          isActive={activeSection === section.id}
          onIntersect={handleIntersect}
        />
      ))}
    </div>
  );
};

export default ImmersiveScrollSection;
