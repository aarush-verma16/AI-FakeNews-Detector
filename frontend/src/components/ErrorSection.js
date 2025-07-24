import React from 'react';

const ErrorSection = ({ error, onClose }) => {
  return (
    <div className="error-section">
      <div className="error-card">
        <div className="error-icon">⚠️</div>
        <div className="error-message">{error}</div>
        <button className="error-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default ErrorSection;
