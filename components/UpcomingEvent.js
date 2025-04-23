import React from 'react';

const UpcomingEvent = ({ title, date, location, time }) => {
  const eventDate = new Date(date);
  const formattedDate = eventDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  const daysRemaining = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="upcoming-event">
      <div className="event-date-badge">
        <div className="event-month">{eventDate.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()}</div>
        <div className="event-day">{eventDate.getDate()}</div>
      </div>
      
      <div className="event-details">
        <h6 className="event-title">{title}</h6>
        
        <div className="event-info">
          <div className="event-info-item">
            <i className="bi bi-geo-alt"></i>
            <span>{location}</span>
          </div>
          
          <div className="event-info-item">
            <i className="bi bi-clock"></i>
            <span>{time}</span>
          </div>
        </div>
        
        <div className="event-countdown">
          {daysRemaining > 0 ? (
            <span>Faltam {daysRemaining} dias</span>
          ) : (
            <span>Hoje!</span>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .upcoming-event {
          display: flex;
          gap: 15px;
        }
        
        .event-date-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 60px;
          height: 70px;
          background-color: #254C5A;
          color: white;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .event-month {
          background-color: #9D4916;
          width: 100%;
          text-align: center;
          padding: 2px 0;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .event-day {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          width: 100%;
        }
        
        .event-details {
          flex: 1;
        }
        
        .event-title {
          margin: 0 0 8px 0;
          font-size: 1rem;
          color: #0D181C;
        }
        
        .event-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 10px;
        }
        
        .event-info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #495057;
        }
        
        .event-info-item i {
          color: #A6B8C1;
          font-size: 0.9rem;
        }
        
        .event-countdown {
          font-size: 0.8rem;
          font-weight: 600;
          color: #9D4916;
        }
      `}</style>
    </div>
  );
};

export default UpcomingEvent;
