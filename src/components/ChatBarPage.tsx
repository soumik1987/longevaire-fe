
// src/components/ChatBarPage.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Mic, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import ProgramsSection from './ProgramsSection';
import '../styles/ChatBarPage.css';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
}

const ChatBarPage: React.FC = () => {
  const location = useLocation();
  const initialMessage = location.state?.initialMessage || "I'd like to learn about wellness programs";
  
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'user', content: initialMessage }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Simulate assistant typing response
    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: 2,
        type: 'assistant',
        content: "Thank you for sharing your wellness goals! I'm here to help you find the perfect program. Below you'll find our curated wellness programs - each designed to support different aspects of your journey. Feel free to explore them and ask me any questions about specific programs that interest you."
      }]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        content: currentMessage.trim()
      };
      setMessages(prev => [...prev, newMessage]);
      setCurrentMessage('');
      
      // Simulate assistant response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const assistantResponse: Message = {
          id: messages.length + 2,
          type: 'assistant',
          content: "I'd be happy to help you with that! Let me know if you'd like more details about any of the wellness programs shown below, or if you have specific questions about what might work best for your goals."
        };
        setMessages(prev => [...prev, assistantResponse]);
      }, 1500);
    }
  };

  return (
    <div className="chatbar-page-container">
      <div className="chatbar-window-section">
        <div className="chatbar-header">
          <h1 className="chatbar-page-title">
            Let's build a personalised wellness program for you
          </h1>
        </div>
        
        <div className="chatbar-messages-area">
          <div className="chatbar-messages-container">
            {messages.map((message) => (
              <div key={message.id} className={`chatbar-message ${message.type}`}>
                <div className="chatbar-message-content">
                  {message.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="chatbar-message assistant">
                <div className="chatbar-message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="chatbar-input-section">
          <form onSubmit={handleSubmit} className="chatbar-input-form">
            <div className="chatbar-input-bar">
              <button type="button" className="chatbar-plus-btn">
                <Plus size={20} />
              </button>
              
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Ask me about any wellness program..."
                className="chatbar-text-input"
              />
              
              <button type="button" className="chatbar-mic-btn">
                <Mic size={20} />
              </button>
              
              <button type="submit" className="chatbar-send-btn" disabled={!currentMessage.trim()}>
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="programs-display-section">
        <ProgramsSection />
      </div>
    </div>
  );
};

export default ChatBarPage;