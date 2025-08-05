
// import React, { useState, useRef } from 'react';
// import { Plus, Mic, Send, Image, FileText, Camera, X, MicOff } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/ChatBarSection.css';

// type SpeechRecognitionType = typeof window.SpeechRecognition extends undefined
//   ? typeof window.webkitSpeechRecognition
//   : typeof window.SpeechRecognition;

// const ChatBarSection: React.FC = () => {
//   const [message, setMessage] = useState('');
//   const [showAttachMenu, setShowAttachMenu] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recognition, setRecognition] = useState<InstanceType<SpeechRecognitionType> | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

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
//       setMessage(prev => prev + ` [File: ${file.name}]`);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (message.trim()) {
//       navigate('/chat', { state: { initialMessage: message.trim() } });
//     }
//   };

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
  const [shouldKeepListening, setShouldKeepListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;
      
      recognition.onstart = () => {
        setIsRecording(true);
      };
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setMessage(prev => {
            const newText = prev + finalTranscript;
            return newText;
          });
        }
      };
      
      recognition.onend = () => {
        // Only restart if we should keep listening and user hasn't manually stopped
        if (shouldKeepListening) {
          try {
            recognition.start();
          } catch (error) {
            console.log('Recognition restart failed:', error);
            setIsRecording(false);
            setShouldKeepListening(false);
          }
        } else {
          setIsRecording(false);
        }
      };
      
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        
        // Handle specific errors
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please allow microphone access and try again.');
          setIsRecording(false);
          setShouldKeepListening(false);
        } else if (event.error === 'network') {
          console.log('Network error, attempting to restart...');
          if (shouldKeepListening) {
            setTimeout(() => {
              try {
                recognition.start();
              } catch (error) {
                console.log('Network error restart failed:', error);
                setIsRecording(false);
                setShouldKeepListening(false);
              }
            }, 1000);
          }
        } else {
          // For other errors, restart if we should keep listening
          if (shouldKeepListening) {
            setTimeout(() => {
              try {
                recognition.start();
              } catch (error) {
                console.log('Error restart failed:', error);
                setIsRecording(false);
                setShouldKeepListening(false);
              }
            }, 1000);
          }
        }
      };
      
      return recognition;
    }
    return null;
  };

  const handleMicClick = () => {
    if (isRecording && shouldKeepListening) {
      // Stop recording
      setShouldKeepListening(false);
      if (recognition) {
        recognition.stop();
      }
      setIsRecording(false);
    } else {
      // Start recording
      const newRecognition = initSpeechRecognition();
      if (newRecognition) {
        setRecognition(newRecognition);
        setShouldKeepListening(true);
        try {
          newRecognition.start();
        } catch (error) {
          console.error('Failed to start recognition:', error);
          alert('Failed to start speech recognition. Please try again.');
          setShouldKeepListening(false);
        }
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
      // Stop recording if active
      if (isRecording && shouldKeepListening) {
        setShouldKeepListening(false);
        if (recognition) {
          recognition.stop();
        }
        setIsRecording(false);
      }
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
              title={isRecording ? "Stop recording" : "Start recording"}
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