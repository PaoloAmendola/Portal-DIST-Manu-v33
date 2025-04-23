import React from 'react';

const MetricCard = ({ title, value, change, changeType }) => {
  const getChangeIcon = () => {
    if (changeType === 'positive') return <i className="bi bi-arrow-up-right"></i>;
    if (changeType === 'negative') return <i className="bi bi-arrow-down-right"></i>;
    return <i className="bi bi-dash"></i>;
  };

  const getChangeClass = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-danger';
    return 'text-secondary';
  };

  return (
    <div className="metric-card">
      <div className="metric-title">{title}</div>
      <div className="metric-value">{value}</div>
      <div className={`metric-change ${getChangeClass()}`}>
        {getChangeIcon()} {change}%
      </div>
      
      <style jsx>{`
        .metric-card {
          background-color: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          height: 100%;
        }
        
        .metric-title {
          color: #A6B8C1;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }
        
        .metric-value {
          color: #0D181C;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 10px;
        }
        
        .metric-change {
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .metric-change i {
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default MetricCard;
