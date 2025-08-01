// import React, { useState, useEffect, useRef } from 'react';
// import { Plus, Mic, Send, ChevronLeft, ChevronRight, Calendar, Image, FileText, Camera, X, MicOff } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { getAllPrograms } from '../data/programs';
// import type { Program } from '../data/programs';
// import '../styles/ChatBarPage.css';

// type SpeechRecognitionType = typeof window.SpeechRecognition extends undefined
//   ? typeof window.webkitSpeechRecognition
//   : typeof window.SpeechRecognition;

// interface Message {
//   id: number;
//   type: 'user' | 'assistant';
//   content: string;
// }

// interface ProgramCard extends Program {
//   id: number;
//   badge: string;
//   image: string;
//   title: string;
//   subtitle: string;
//   availableDate: string;
// }

// const ChatboxPage: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const initialMessage = location.state?.initialMessage || "I'd like to learn about wellness programs";
  
//   const [messages, setMessages] = useState<Message[]>([
//     { id: 1, type: 'user', content: initialMessage }
//   ]);
//   const [currentMessage, setCurrentMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(true);
//   const [showAttachMenu, setShowAttachMenu] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recognition, setRecognition] = useState<InstanceType<SpeechRecognitionType> | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   const [programs] = useState<ProgramCard[]>(() => {
//     return getAllPrograms().map((program, index) => ({
//       ...program,
//       id: index + 1,
//       badge: program.highlights?.[0] || 'Featured',
//       image: program.imageGallery?.[0] || 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=600',
//       title: program.name,
//       subtitle: program.details,
//       availableDate: program.bookingOptions?.availableDates?.[0] || 'Available soon'
//     }));
//   });
//   const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
//   const programsPerPage = 3;
//   const totalProgramPages = Math.ceil(programs.length / programsPerPage);

//   useEffect(() => {
//     const messagesContainer = document.querySelector('.chat-messages-container');
//     if (messagesContainer) {
//       messagesContainer.scrollTop = messagesContainer.scrollHeight;
//     }
//   }, [messages, isTyping]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsTyping(false);
//       setMessages(prev => [...prev, {
//         id: 2,
//         type: 'assistant',
//         content: "Thank you for sharing your wellness goals! I'm here to help you find the perfect program. Below you'll find our curated wellness programs - each designed to support different aspects of your journey. Feel free to explore them and ask me any questions about specific programs that interest you."
//       }]);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   const initSpeechRecognition = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition();
      
//       recognition.continuous = true;
//       recognition.interimResults = true;
//       recognition.lang = 'en-US';
      
//       recognition.onstart = () => {
//         setIsRecording(true);
//       };
      
//       recognition.onresult = (event: SpeechRecognitionEvent) => {
//         let finalTranscript = '';
//         let interimTranscript = '';
        
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript;
//           if (event.results[i].isFinal) {
//             finalTranscript += transcript;
//           } else {
//             interimTranscript += transcript;
//           }
//         }
        
//         setCurrentMessage(finalTranscript + interimTranscript);
//       };
      
//       recognition.onend = () => {
//         setIsRecording(false);
//       };
      
//       recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
//         console.error('Speech recognition error:', event.error);
//         setIsRecording(false);
//       };
      
//       return recognition;
//     }
//     return null;
//   };

//   const handleMicClick = () => {
//     if (isRecording) {
//       if (recognition) {
//         recognition.stop();
//       }
//     } else {
//       const newRecognition = initSpeechRecognition();
//       if (newRecognition) {
//         setRecognition(newRecognition);
//         newRecognition.start();
//       } else {
//         alert('Speech recognition is not supported in your browser');
//       }
//     }
//   };

//   const handlePlusClick = () => {
//     setShowAttachMenu(!showAttachMenu);
//   };

//   const handleFileUpload = (type: string) => {
//     if (fileInputRef.current) {
//       fileInputRef.current.setAttribute('accept', getAcceptType(type));
//       fileInputRef.current.click();
//     }
//     setShowAttachMenu(false);
//   };

//   const getAcceptType = (type: string) => {
//     switch (type) {
//       case 'image':
//         return 'image/*';
//       case 'document':
//         return '.pdf,.doc,.docx,.txt';
//       case 'camera':
//         return 'image/*';
//       default:
//         return '*/*';
//     }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setCurrentMessage(prev => prev + ` [File: ${file.name}]`);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (currentMessage.trim()) {
//       const newMessage: Message = {
//         id: messages.length + 1,
//         type: 'user',
//         content: currentMessage.trim()
//       };
//       setMessages(prev => [...prev, newMessage]);
//       setCurrentMessage('');
      
//       setIsTyping(true);
//       setTimeout(() => {
//         setIsTyping(false);
//         const assistantResponse: Message = {
//           id: messages.length + 2,
//           type: 'assistant',
//           content: "I'd be happy to help you with that! Let me know if you'd like more details about any of the wellness programs shown below, or if you have specific questions about what might work best for your goals."
//         };
//         setMessages(prev => [...prev, assistantResponse]);
//       }, 1500);
//     }
//   };

//   const getCurrentPagePrograms = () => {
//     const startIndex = currentProgramIndex * programsPerPage;
//     return programs.slice(startIndex, startIndex + programsPerPage);
//   };

//   const handlePreviousPrograms = () => {
//     setCurrentProgramIndex(prev => (prev > 0 ? prev - 1 : totalProgramPages - 1));
//   };

//   const handleNextPrograms = () => {
//     setCurrentProgramIndex(prev => (prev < totalProgramPages - 1 ? prev + 1 : 0));
//   };

//   const goToProgramPage = (pageIndex: number) => {
//     setCurrentProgramIndex(pageIndex);
//   };

//   const handleProgramClick = (programName: string) => {
//     navigate('/program-details', { state: { programName } });
//   };

//   const handleClickOutside = () => {
//     if (showAttachMenu) {
//       setShowAttachMenu(false);
//     }
//   };

//   return (
//     <div className="chatbox-page" onClick={handleClickOutside}>
//       <div className="chat-section">
//         <div className="chat-container">
//           <div className="chat-header">
//             <h1 className="chat-title">
//               Let's build a personalized wellness program for you
//             </h1>
//           </div>
          
//           <div className="chat-messages-container">
//             {messages.map((message) => (
//               <div key={message.id} className={`chat-message ${message.type}`}>
//                 <div className="message-content">
//                   {message.content}
//                 </div>
//               </div>
//             ))}
            
//             {isTyping && (
//               <div className="chat-message assistant">
//                 <div className="message-content">
//                   <div className="typing-indicator">
//                     <span></span>
//                     <span></span>
//                     <span></span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
          
//           <div className="chat-input-container">
//             <form onSubmit={handleSubmit} className="chat-input-form">
//               <div className="input-bar">
//                 <div className="chatbar-attach-container">
//                   <button 
//                     type="button" 
//                     className={`plus-btn ${showAttachMenu ? 'active' : ''}`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handlePlusClick();
//                     }}
//                   >
//                     {showAttachMenu ? <X size={20} /> : <Plus size={20} />}
//                   </button>
                  
//                   {showAttachMenu && (
//                     <div className="chatbar-attach-menu">
//                       <button
//                         type="button"
//                         className="chatbar-attach-option"
//                         onClick={() => handleFileUpload('image')}
//                       >
//                         <Image size={20} />
//                         <span>Photo</span>
//                       </button>
//                       <button
//                         type="button"
//                         className="chatbar-attach-option"
//                         onClick={() => handleFileUpload('document')}
//                       >
//                         <FileText size={20} />
//                         <span>Document</span>
//                       </button>
//                       <button
//                         type="button"
//                         className="chatbar-attach-option"
//                         onClick={() => handleFileUpload('camera')}
//                       >
//                         <Camera size={20} />
//                         <span>Camera</span>
//                       </button>
//                     </div>
//                   )}
//                 </div>
                
//                 <input
//                   type="text"
//                   value={currentMessage}
//                   onChange={(e) => setCurrentMessage(e.target.value)}
//                   placeholder={isRecording ? "Listening..." : "Ask me about any wellness program..."}
//                   className={`text-input ${isRecording ? 'recording' : ''}`}
//                 />
                
//                 <button 
//                   type="button" 
//                   className={`mic-btn ${isRecording ? 'recording' : ''}`}
//                   onClick={handleMicClick}
//                 >
//                   {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
//                 </button>
                
//                 <button type="submit" className="send-btn" disabled={!currentMessage.trim()}>
//                   <Send size={20} />
//                 </button>
//               </div>
//             </form>
            
//             <input
//               ref={fileInputRef}
//               type="file"
//               style={{ display: 'none' }}
//               onChange={handleFileSelect}
//             />
//           </div>
//         </div>
//       </div>
      
//       <div className="programs-section">
//         <div className="programs-container">
//           <h2 className="programs-section-title">Our Wellness Programs</h2>
//           <div className="programs-grid">
//             {getCurrentPagePrograms().map((program) => (
//               <div 
//                 key={program.id} 
//                 className="program-card"
//                 onClick={() => handleProgramClick(program.name)}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter' || e.key === ' ') {
//                     handleProgramClick(program.name);
//                   }
//                 }}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <div className="program-card-badge">
//                   {program.badge}
//                 </div>
//                 <div className="program-card-image">
//                   <img src={program.image} alt={program.title} />
//                 </div>
//                 <div className="program-card-content">
//                   <div className="program-card-location">{program.location}</div>
//                   <h3 className="program-card-title">{program.title}</h3>
//                   <p className="program-card-subtitle">{program.subtitle}</p>
//                   <div className="program-card-date">
//                     <Calendar size={16} />
//                     <span>{program.availableDate}</span>
//                   </div>
//                   <div className="learn-more-link">LEARN MORE</div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="programs-navigation">
//             <button 
//               onClick={handlePreviousPrograms}
//               className="programs-nav-btn"
//               aria-label="Previous page"
//             >
//               <ChevronLeft size={20} />
//             </button>
            
//             <div className="programs-pagination">
//               {Array.from({ length: totalProgramPages }, (_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToProgramPage(index)}
//                   className={`programs-dot ${index === currentProgramIndex ? 'programs-dot-active' : ''}`}
//                   aria-label={`Go to page ${index + 1}`}
//                 />
//               ))}
//             </div>
            
//             <button 
//               onClick={handleNextPrograms}
//               className="programs-nav-btn"
//               aria-label="Next page"
//             >
//               <ChevronRight size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatboxPage;












import React, { useState, useEffect, useRef } from 'react';
import { Plus, Mic, Send, Calendar, Image, FileText, Camera, X, MicOff } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllPrograms } from '../data/programs';
import type { Program } from '../data/programs';
import '../styles/ChatBarPage.css';

type SpeechRecognitionType = typeof window.SpeechRecognition extends undefined
  ? typeof window.webkitSpeechRecognition
  : typeof window.SpeechRecognition;

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
}

interface ProgramCard extends Program {
  id: number;
  badge: string;
  image: string;
  title: string;
  subtitle: string;
  availableDate: string;
}

const ChatboxPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  
  const [programs] = useState<ProgramCard[]>(() => {
    return getAllPrograms().map((program, index) => ({
      ...program,
      id: index + 1,
      badge: program.highlights?.[0] || 'Featured',
      image: program.imageGallery?.[0] || 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: program.name,
      subtitle: program.details,
      availableDate: program.bookingOptions?.availableDates?.[0] || 'Available soon'
    }));
  });

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

  const handleProgramClick = (programName: string) => {
    navigate('/program-details', { state: { programName } });
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
      
      <div className="chatboxpage-programs-section">
        <div className="chatboxpage-programs-section-container">
          <div className="chatboxpage-programs-header">
            <h2 className="chatboxpage-programs-main-title">OUR WELLNESS PROGRAMS</h2>
            <p className="chatboxpage-programs-subtitle">Gain fresh perspectives on physical, spiritual, and mental wellness.</p>
          </div>
          
          <div className="chatboxpage-programs-scroll-container">
            <div className="chatboxpage-programs-horizontal-scroll">
              {programs.map((program) => (
                <div 
                  key={program.id} 
                  className="program-card"
                  onClick={() => handleProgramClick(program.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleProgramClick(program.name);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="chatboxpage-program-card-image">
                    <img src={program.image} alt={program.title} />
                    <div className="chatboxpage-program-card-badge">
                      {program.badge}
                    </div>
                    <div className="chatboxpage-program-card-content">
                      <div className="chatboxpage-program-card-location">{program.location}</div>
                      <h3 className="chatboxpage-program-card-title">{program.title}</h3>
                      <p className="chatboxpage-program-card-subtitle">{program.subtitle}</p>
                      <div className="chatboxpage-program-card-date">
                        <Calendar size={16} />
                        <span>{program.availableDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatboxPage;