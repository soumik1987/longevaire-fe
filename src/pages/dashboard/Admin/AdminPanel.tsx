import React, { useState } from 'react';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import { Check, X, BarChart, Users } from 'lucide-react';
import '../../../styles/AdminPanel.css';
interface Program {
  id: number;
  title: string;
  creator: string;
  status: 'pending' | 'approved' | 'rejected';
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'programs' | 'users' | 'analytics'>('programs');
  const [programs, setPrograms] = useState<Program[]>([
    { id: 1, title: 'Wellness Retreat', creator: 'John Doe', status: 'pending' },
    { id: 2, title: 'Spa Package', creator: 'Jane Smith', status: 'approved' }
  ]);

  const handleApprove = (id: number) => {
    setPrograms(programs.map(program => 
      program.id === id ? { ...program, status: 'approved' } : program
    ));
  };

  const handleReject = (id: number) => {
    setPrograms(programs.map(program => 
      program.id === id ? { ...program, status: 'rejected' } : program
    ));
  };

  return (
    <DashboardLayout role="admin">
      <div className="admin-panel-container">
        <h1>ADMIN PANEL</h1>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'programs' ? 'active' : ''}`}
          onClick={() => setActiveTab('programs')}
        >
          Programs
        </button>
        <button 
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={16} />
          Users
        </button>
        <button 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart size={16} />
          Analytics
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'programs' && (
          <div className="programs-list">
            {programs.map(program => (
              <div key={program.id} className="program-item">
                <h3>{program.title}</h3>
                <p>Creator: {program.creator}</p>
                <span className={`status ${program.status}`}>
                  {program.status.toUpperCase()}
                </span>
                {program.status === 'pending' && (
                  <div className="actions">
                    <button 
                      className="approve-button"
                      onClick={() => handleApprove(program.id)}
                    >
                      <Check size={16} /> Approve
                    </button>
                    <button 
                      className="reject-button"
                      onClick={() => handleReject(program.id)}
                    >
                      <X size={16} /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="users-list">
            <p>User management content will appear here</p>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="analytics-grid">
            <p>Analytics content will appear here</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;