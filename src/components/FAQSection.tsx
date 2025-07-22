import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import '../styles/FAQSection.css';


const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How are concierge longevity experiences managed?",
      answer: "Coordinated access to elite clinics, wellness centers, and medical experts worldwide. Every aspect is managed for seamless, high-standard care."
    },
    {
      question: "How do I access global centers?",
      answer: "We connect you to a vetted network of top clinics, spas, and resorts. All arrangements and support are handled for you."
    },
    {
      question: "What programs can I choose?",
      answer: "Options include diagnostics, preventive, regenerative therapies, and holistic programs that are tailored to your goals."
    },
    {
      question: "How is my information secure?",
      answer: "Your data is strictly confidential. We follow strict privacy standards at every step."
    },
    {
      question: "How is my experience personalized?",
      answer: "We assess your health profile and objectives, then match you with the best experts and facilities for a custom plan."
    },
    {
      question: "How do I get started?",
      answer: "Contact us for a consultation. We'll discuss your goals and guide you through the next steps."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <h2 id="faqhead">Your Questions, Answered</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item fade-in-up">
              <button 
                className={`faq-question ${openIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown 
                  className={`faq-icon ${openIndex === index ? 'rotated' : ''}`} 
                  size={20} 
                />
              </button>
              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;