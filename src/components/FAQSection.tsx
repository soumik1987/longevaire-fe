import React, { useEffect, useState, memo } from 'react';
import { ChevronDown } from 'lucide-react';
import { fetchFAQs } from '../api';
import type { FAQ } from '../data/faq';
import '../styles/FAQSection.css';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = memo(({ question, answer, isOpen, onClick }) => (
  <div className="faq-item fade-in-up">
    <button
      className={`faq-question ${isOpen ? 'active' : ''}`}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={`faq-${question}`}
    >
      <span>{question}</span>
      <ChevronDown className={`faq-icon ${isOpen ? 'rotated' : ''}`} size={20} />
    </button>
    {isOpen && (
      <div className="faq-answer open" id={`faq-${question}`}>
        <p>{answer}</p>
      </div>
    )}
  </div>
));

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    const loadFAQs = async () => {
      const data = await fetchFAQs();
      setFaqs(data);
    };

    loadFAQs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="faq-section">
      <div className="container">
        <h2 id="faqhead">Your Questions, Answered</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
