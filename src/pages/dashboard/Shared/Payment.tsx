import React from 'react';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import { Plus, CreditCard } from 'lucide-react';

interface PaymentProps {
  role: 'user' | 'facility' | 'admin';
}

const Payment: React.FC<PaymentProps> = ({ role }) => {
  return (
    <DashboardLayout role={role}>
      <div className="content-header">
        <h1>PAYMENT METHODS</h1>
        <button className="primary-button">
          <Plus size={16} />
          ADD PAYMENT METHOD
        </button>
      </div>
      
      <div className="payment-content">
        <div className="payment-empty">
          <CreditCard size={60} />
          <h2>No payment methods added</h2>
          <p>Add a payment method to make transactions easier</p>
          <button className="primary-button">
            <Plus size={16} />
            ADD PAYMENT METHOD
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payment;