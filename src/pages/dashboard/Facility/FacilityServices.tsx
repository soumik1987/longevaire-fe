// import React, { useState } from 'react';
// import DashboardLayout from '../../../components/Layout/DashboardLayout';
// import { Plus } from 'lucide-react';

// interface Service {
//   id: number;
//   name: string;
//   status: 'active' | 'inactive';
//   bookings: number;
// }

// const FacilityServices: React.FC = () => {
//   const [services, setServices] = useState<Service[]>([
//     { id: 1, name: 'Luxury Spa Room', status: 'active', bookings: 12 },
//     { id: 2, name: 'Yoga Studio', status: 'active', bookings: 8 },
//     { id: 3, name: 'Meditation Room', status: 'inactive', bookings: 0 }
//   ]);

//   const toggleServiceStatus = (id: number) => {
//     setServices(services.map(service => 
//       service.id === id 
//         ? { 
//             ...service, 
//             status: service.status === 'active' ? 'inactive' : 'active' 
//           } 
//         : service
//     ));
//   };

//   return (
//     <DashboardLayout role="facility">
//       <div className="content-header">
//         <h1>FACILITY SERVICES</h1>
//         <button className="primary-button">
//           <Plus size={16} />
//           ADD NEW SERVICE
//         </button>
//       </div>
      
//       <div className="services-content">
//         <div className="services-list">
//           <table>
//             <thead>
//               <tr>
//                 <th>Service Name</th>
//                 <th>Status</th>
//                 <th>Bookings</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {services.map(service => (
//                 <tr key={service.id}>
//                   <td>{service.name}</td>
//                   <td>
//                     <span className={`status-badge ${service.status}`}>
//                       {service.status}
//                     </span>
//                   </td>
//                   <td>{service.bookings}</td>
//                   <td>
//                     <button className="secondary-button">Edit</button>
//                     <button 
//                       className="danger-button"
//                       onClick={() => toggleServiceStatus(service.id)}
//                     >
//                       {service.status === 'active' ? 'Deactivate' : 'Activate'}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default FacilityServices;












import React, { useState } from 'react';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import { Plus } from 'lucide-react';
import '../../../styles/FacilityServices.css';

interface Service {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  bookings: number;
}

const FacilityServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Luxury Spa Room', status: 'active', bookings: 12 },
    { id: 2, name: 'Yoga Studio', status: 'active', bookings: 8 },
    { id: 3, name: 'Meditation Room', status: 'inactive', bookings: 0 }
  ]);

  const toggleServiceStatus = (id: number) => {
    setServices(services.map(service => 
      service.id === id 
        ? { 
            ...service, 
            status: service.status === 'active' ? 'inactive' : 'active' 
          } 
        : service
    ));
  };

  return (
    <DashboardLayout role="facility">
      <div className="facility-services-container">
        <div className="content-header">
          <h1>FACILITY SERVICES</h1>
          <button className="primary-button">
            <Plus size={16} />
            ADD NEW SERVICE
          </button>
        </div>
        
        <div className="services-content">
          <table className="services-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Status</th>
                <th>Bookings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>
                    <span className={`status-badge ${service.status}`}>
                      {service.status}
                    </span>
                  </td>
                  <td>{service.bookings}</td>
                  <td>
                    <button className="secondary-button">Edit</button>
                    <button 
                      className="secondary-button"
                      onClick={() => toggleServiceStatus(service.id)}
                    >
                      {service.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacilityServices;