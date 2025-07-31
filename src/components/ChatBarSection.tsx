// // // import React, { useState } from 'react';
// // // import { Plus, Mic, Send } from 'lucide-react';
// // // import { useNavigate } from 'react-router-dom';
// // // import '../styles/ChatBarSection.css';

// // // const ChatBarSection: React.FC = () => {
// // //   const [message, setMessage] = useState('');
// // //   const navigate = useNavigate();

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (message.trim()) {
// // //       navigate(`/chat?message=${encodeURIComponent(message.trim())}`);
// // //     }
// // //   };

// // //   return (
// // //     <div className="chatbar-section">
// // //       <div className="chatbar-content">
// // //         <h2 className="chatbar-heading">Let's build a personalised wellness program for you</h2>
// // //         <form onSubmit={handleSubmit} className="chatbar-input-form">
// // //           <div className="chatbar-input-bar">
// // //             <button type="button" className="chatbar-plus-btn">
// // //               <Plus size={20} />
// // //             </button>
            
// // //             <input
// // //               type="text"
// // //               value={message}
// // //               onChange={(e) => setMessage(e.target.value)}
// // //               placeholder="Tell us about your wellness goals..."
// // //               className="chatbar-text-input"
// // //             />
            
// // //             <button type="button" className="chatbar-mic-btn">
// // //               <Mic size={20} />
// // //             </button>
            
// // //             <button type="submit" className="chatbar-send-btn" disabled={!message.trim()}>
// // //               <Send size={20} />
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ChatBarSection;



// // // src/components/ChatBarSection.tsx
// // import React, { useState } from 'react';
// // import { Plus, Mic, Send } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import '../styles/ChatBarSection.css';

// // const ChatBarSection: React.FC = () => {
// //   const [message, setMessage] = useState('');
// //   const navigate = useNavigate();

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (message.trim()) {
// //       navigate('/chat', { state: { initialMessage: message.trim() } });
// //     }
// //   };

// //   return (
// //     <div className="chatbar-section">
// //       <div className="chatbar-content">
// //         <h2 className="chatbar-heading">Let's find your optimal wellness program</h2>
// //         <form onSubmit={handleSubmit} className="chatbar-input-form">
// //           <div className="chatbar-input-bar">
// //             <button type="button" className="chatbar-plus-btn">
// //               <Plus size={20} />
// //             </button>
            
// //             <input
// //               type="text"
// //               value={message}
// //               onChange={(e) => setMessage(e.target.value)}
// //               placeholder="Tell us about your wellness goals..."
// //               className="chatbar-text-input"
// //             />
            
// //             <button type="button" className="chatbar-mic-btn">
// //               <Mic size={20} />
// //             </button>
            
// //             <button type="submit" className="chatbar-send-btn" disabled={!message.trim()}>
// //               <Send size={20} />
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatBarSection;






// import React, { useState, useRef } from 'react';
// import { Plus, Mic, Send, Image, FileText, Camera, X, MicOff } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/ChatBarSection.css';

// const ChatBarSection: React.FC = () => {
//   const [message, setMessage] = useState('');
//   const [showAttachMenu, setShowAttachMenu] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   // Initialize speech recognition
//   const initSpeechRecognition = () => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       const recognition = new SpeechRecognition();
      
//       recognition.continuous = true;
//       recognition.interimResults = true;
//       recognition.lang = 'en-US';
      
//       recognition.onstart = () => {
//         setIsRecording(true);
//       };
      
//       recognition.onresult = (event) => {
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
        
//         setMessage(finalTranscript + interimTranscript);
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
//       // Stop recording
//       if (recognition) {
//         recognition.stop();
//       }
//     } else {
//       // Start recording
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
//       setMessage(prev => prev + ` [File: ${file.name}]`);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (message.trim()) {
//       navigate('/chat', { state: { initialMessage: message.trim() } });
//     }
//   };

//   // Close attachment menu when clicking outside
//   const handleClickOutside = () => {
//     if (showAttachMenu) {
//       setShowAttachMenu(false);
//     }
//   };

//   return (
//     <div className="chatbar-section" onClick={handleClickOutside}>
//       <div className="chatbar-content">
//         <h2 className="chatbar-heading">Let's find your optimal wellness program</h2>
//         <form onSubmit={handleSubmit} className="chatbar-input-form">
//           <div className="chatbar-input-bar">
//             <div className="chatbar-attach-container">
//               <button 
//                 type="button" 
//                 className={`chatbar-plus-btn ${showAttachMenu ? 'active' : ''}`}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handlePlusClick();
//                 }}
//               >
//                 {showAttachMenu ? <X size={20} /> : <Plus size={20} />}
//               </button>
              
//               {showAttachMenu && (
//                 <div className="chatbar-attach-menu">
//                   <button
//                     type="button"
//                     className="chatbar-attach-option"
//                     onClick={() => handleFileUpload('image')}
//                   >
//                     <Image size={20} />
//                     <span>Photo</span>
//                   </button>
//                   <button
//                     type="button"
//                     className="chatbar-attach-option"
//                     onClick={() => handleFileUpload('document')}
//                   >
//                     <FileText size={20} />
//                     <span>Document</span>
//                   </button>
//                   <button
//                     type="button"
//                     className="chatbar-attach-option"
//                     onClick={() => handleFileUpload('camera')}
//                   >
//                     <Camera size={20} />
//                     <span>Camera</span>
//                   </button>
//                 </div>
//               )}
//             </div>
            
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder={isRecording ? "Listening..." : "Tell us about your wellness goals..."}
//               className={`chatbar-text-input ${isRecording ? 'recording' : ''}`}
//             />
            
//             <button 
//               type="button" 
//               className={`chatbar-mic-btn ${isRecording ? 'recording' : ''}`}
//               onClick={handleMicClick}
//             >
//               {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
//             </button>
            
//             <button type="submit" className="chatbar-send-btn" disabled={!message.trim()}>
//               <Send size={20} />
//             </button>
//           </div>
//         </form>
        
//         <input
//           ref={fileInputRef}
//           type="file"
//           style={{ display: 'none' }}
//           onChange={handleFileSelect}
//         />
//       </div>
//     </div>
//   );
// };

// export default ChatBarSection;










import React, { useState, useRef } from 'react';
import { Plus, Mic, Send, Image, FileText, Camera, X, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChatBarSection.css';

type SpeechRecognitionType = typeof window.SpeechRecognition extends undefined
  ? typeof window.webkitSpeechRecognition
  : typeof window.SpeechRecognition;

const ChatBarSection: React.FC = () => {
  const [message, setMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<InstanceType<SpeechRecognitionType> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
        
        setMessage(finalTranscript + interimTranscript);
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
      setMessage(prev => prev + ` [File: ${file.name}]`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      navigate('/chat', { state: { initialMessage: message.trim() } });
    }
  };

  const handleClickOutside = () => {
    if (showAttachMenu) {
      setShowAttachMenu(false);
    }
  };

  return (
    <div className="chatbar-section" onClick={handleClickOutside}>
      <div className="chatbar-content">
        <h2 className="chatbar-heading">Let's find your optimal wellness program</h2>
        <form onSubmit={handleSubmit} className="chatbar-input-form">
          <div className="chatbar-input-bar">
            <div className="chatbar-attach-container">
              <button 
                type="button" 
                className={`chatbar-plus-btn ${showAttachMenu ? 'active' : ''}`}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isRecording ? "Listening..." : "Tell us about your wellness goals..."}
              className={`chatbar-text-input ${isRecording ? 'recording' : ''}`}
            />
            
            <button 
              type="button" 
              className={`chatbar-mic-btn ${isRecording ? 'recording' : ''}`}
              onClick={handleMicClick}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            
            <button type="submit" className="chatbar-send-btn" disabled={!message.trim()}>
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
  );
};

export default ChatBarSection;