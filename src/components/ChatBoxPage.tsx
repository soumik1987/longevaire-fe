import React, { useState, useEffect, useRef } from 'react';
import { Plus, Mic, Send, Image, FileText, Camera, X, MicOff } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../styles/ChatBarPage.css';
import RecommendationSection from './RecommendationSection';
import ProgramsSection from './ProgramsSection';

type SpeechRecognitionType = typeof window.SpeechRecognition extends undefined
  ? typeof window.webkitSpeechRecognition
  : typeof window.SpeechRecognition;

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
}

const ChatboxPage: React.FC = () => {
  const location = useLocation();
  const initialMessage = location.state?.initialMessage || "I'd like to learn about wellness programs";
  
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'user', content: initialMessage }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<InstanceType<SpeechRecognitionType> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  useEffect(() => {
    const messagesContainer = document.querySelector('.chat-messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
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

  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsRecording(true);
      };
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setCurrentMessage(finalTranscript + interimTranscript);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
      
      return recognition;
    }
    return null;
  };

  const handleMicClick = () => {
    if (isRecording) {
      if (recognition) {
        recognition.stop();
      }
    } else {
      const newRecognition = initSpeechRecognition();
      if (newRecognition) {
        setRecognition(newRecognition);
        newRecognition.start();
      } else {
        alert('Speech recognition is not supported in your browser');
      }
    }
  };

  const handlePlusClick = () => {
    setShowAttachMenu(!showAttachMenu);
  };

  const handleFileUpload = (type: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('accept', getAcceptType(type));
      fileInputRef.current.click();
    }
    setShowAttachMenu(false);
  };

  const getAcceptType = (type: string) => {
    switch (type) {
      case 'image':
        return 'image/*';
      case 'document':
        return '.pdf,.doc,.docx,.txt';
      case 'camera':
        return 'image/*';
      default:
        return '*/*';
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCurrentMessage(prev => prev + ` [File: ${file.name}]`);
    }
  };

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

  const handleClickOutside = () => {
    if (showAttachMenu) {
      setShowAttachMenu(false);
    }
  };

  return (
    <div className="chatbox-page" onClick={handleClickOutside}>
      <div className="chat-section">
        <div className="chat-container">
          <div className="chat-header">
            <h1 className="chat-title">
              Let's build a personalized wellness program for you
            </h1>
          </div>
          
          <div className="chat-messages-container">
            {messages.map((message) => (
              <div key={message.id} className={`chat-message ${message.type}`}>
                <div className="message-content">
                  {message.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="chat-message assistant">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="chat-input-container">
            <form onSubmit={handleSubmit} className="chat-input-form">
              <div className="input-bar">
                <div className="chatbar-attach-container">
                  <button 
                    type="button" 
                    className={`plus-btn ${showAttachMenu ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlusClick();
                    }}
                  >
                    {showAttachMenu ? <X size={20} /> : <Plus size={20} />}
                  </button>
                  
                  {showAttachMenu && (
                    <div className="chatbar-attach-menu">
                      <button
                        type="button"
                        className="chatbar-attach-option"
                        onClick={() => handleFileUpload('image')}
                      >
                        <Image size={20} />
                        <span>Photo</span>
                      </button>
                      <button
                        type="button"
                        className="chatbar-attach-option"
                        onClick={() => handleFileUpload('document')}
                      >
                        <FileText size={20} />
                        <span>Document</span>
                      </button>
                      <button
                        type="button"
                        className="chatbar-attach-option"
                        onClick={() => handleFileUpload('camera')}
                      >
                        <Camera size={20} />
                        <span>Camera</span>
                      </button>
                    </div>
                  )}
                </div>
                
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder={isRecording ? "Listening..." : "Ask me about any wellness program..."}
                  className={`text-input ${isRecording ? 'recording' : ''}`}
                />
                
                <button 
                  type="button" 
                  className={`mic-btn ${isRecording ? 'recording' : ''}`}
                  onClick={handleMicClick}
                >
                  {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                
                <button type="submit" className="send-btn" disabled={!currentMessage.trim()}>
                  <Send size={20} />
                </button>
              </div>
            </form>
            
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
          </div>
        </div>
      </div>
      
      {/* Replace the programs section with the two new sections */}
      <RecommendationSection />
      <ProgramsSection />
    </div>
  );
};

export default ChatboxPage;