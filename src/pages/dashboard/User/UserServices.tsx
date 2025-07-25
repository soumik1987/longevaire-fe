// import React from 'react';
// import { Plus } from 'lucide-react';
// import DashboardLayout from '../../../components/Layout/DashboardLayout';

// const UserServices: React.FC = () => {
//   return (
//     <DashboardLayout role="user">
//       <div className="content-header">
//         <h1>SERVICES</h1>
//         <button className="primary-button">
//           <Plus size={16} />
//           BOOK A SERVICE
//         </button>
//       </div>
      
//       <div className="services-content">
//         <div className="services-empty">
//           <div className="empty-icon">
//             <img src="/placeholder-services.png" alt="Services" />
//           </div>
//           <h2>You don't have any services planned</h2>
//           <p>When you book a wellness service, it will appear here.</p>
          
//           <button className="primary-button">
//             <Plus size={16} />
//             BOOK A SERVICE
//           </button>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default UserServices;









import React from 'react';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import { Plus } from 'lucide-react';
import '../../../styles/UserServices.css';
const UserServices: React.FC = () => {
  return (
    <DashboardLayout role="user">
      <div className="services-container">
        <div className="content-header">
          <h1>SERVICES</h1>
          <button className="primary-button">
            <Plus size={16} />
            BOOK A SERVICE
          </button>
        </div>
        
        <div className="services-empty">
          <div className="empty-icon">
            <img src="/placeholder-services.png" alt="Services" />
          </div>
          <h2>You don't have any services planned</h2>
          <p>You still haven't scheduled any service. When you have an appointment it will appear here.</p>
          
          <button className="primary-button">
            <Plus size={16} />
            BOOK A SERVICE
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserServices;