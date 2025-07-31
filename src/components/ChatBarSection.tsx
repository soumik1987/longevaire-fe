// import React, { useState } from 'react';
// import { Plus, Mic, Send } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/ChatBarSection.css';

// const ChatBarSection: React.FC = () => {
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (message.trim()) {
//       navigate(`/chat?message=${encodeURIComponent(message.trim())}`);
//     }
//   };

//   return (
//     <div className="chatbar-section">
//       <div className="chatbar-content">
//         <h2 className="chatbar-heading">Let's build a personalised wellness program for you</h2>
//         <form onSubmit={handleSubmit} className="chatbar-input-form">
//           <div className="chatbar-input-bar">
//             <button type="button" className="chatbar-plus-btn">
//               <Plus size={20} />
//             </button>
            
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Tell us about your wellness goals..."
//               className="chatbar-text-input"
//             />
            
//             <button type="button" className="chatbar-mic-btn">
//               <Mic size={20} />
//             </button>
            
//             <button type="submit" className="chatbar-send-btn" disabled={!message.trim()}>
//               <Send size={20} />
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatBarSection;



// src/components/ChatBarSection.tsx
import React, { useState } from 'react';
import { Plus, Mic, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChatBarSection.css';

const ChatBarSection: React.FC = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      navigate('/chat', { state: { initialMessage: message.trim() } });
    }
  };

  return (
    <div className="chatbar-section">
      <div className="chatbar-content">
        <h2 className="chatbar-heading">Let's find your optimal wellness program</h2>
        <form onSubmit={handleSubmit} className="chatbar-input-form">
          <div className="chatbar-input-bar">
            <button type="button" className="chatbar-plus-btn">
              <Plus size={20} />
            </button>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your wellness goals..."
              className="chatbar-text-input"
            />
            
            <button type="button" className="chatbar-mic-btn">
              <Mic size={20} />
            </button>
            
            <button type="submit" className="chatbar-send-btn" disabled={!message.trim()}>
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBarSection;