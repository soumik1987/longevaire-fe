import React from 'react';

interface RemarkModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  remark: string;
  setRemark: (value: string) => void;
}

const RemarkModal: React.FC<RemarkModalProps> = ({ onConfirm, onCancel, remark, setRemark }) => {
  return (
    <div className="modal-overlay">
      <div className="remark-modal">
        <h3>Add Remark for Rejection</h3>
        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter reason for rejection..."
          rows={4}
        />
        <div className="modal-actions">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemarkModal;