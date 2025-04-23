import React from 'react';

const AnnouncementList = ({ announcements }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'bi-exclamation-triangle-fill';
      case 'medium':
        return 'bi-info-circle-fill';
      case 'low':
        return 'bi-bell-fill';
      default:
        return 'bi-info-circle-fill';
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Avisos e Comunicados</h5>
        <a href="#" className="btn btn-sm btn-outline-primary">Ver Todos</a>
      </div>
      <div className="card-body">
        {announcements && announcements.length > 0 ? (
          <div className="announcement-list">
            {announcements.map((announcement) => (
              <div key={announcement.id} className={`announcement-item ${getPriorityClass(announcement.priority)}`}>
                <div className="announcement-icon">
                  <i className={`bi ${getPriorityIcon(announcement.priority)}`}></i>
                </div>
                <div className="announcement-content">
                  <h6>{announcement.title}</h6>
                  <p>{announcement.content}</p>
                  <div className="announcement-date">
                    {new Date(announcement.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data-message">
            <i className="bi bi-megaphone"></i>
            <p>Nenhum comunicado disponível no momento.</p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .announcement-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .announcement-item {
          display: flex;
          gap: 15px;
          padding: 15px;
          border-radius: 8px;
          background-color: #f8f9fa;
          border-left: 4px solid #A6B8C1;
        }
        
        .announcement-item.priority-high {
          background-color: rgba(220, 53, 69, 0.1);
          border-left-color: #dc3545;
        }
        
        .announcement-item.priority-medium {
          background-color: rgba(255, 193, 7, 0.1);
          border-left-color: #ffc107;
        }
        
        .announcement-item.priority-low {
          background-color: rgba(13, 110, 253, 0.1);
          border-left-color: #0d6efd;
        }
        
        .announcement-icon {
          font-size: 1.5rem;
          color: #A6B8C1;
          display: flex;
          align-items: flex-start;
          padding-top: 3px;
        }
        
        .priority-high .announcement-icon {
          color: #dc3545;
        }
        
        .priority-medium .announcement-icon {
          color: #ffc107;
        }
        
        .priority-low .announcement-icon {
          color: #0d6efd;
        }
        
        .announcement-content {
          flex: 1;
        }
        
        .announcement-content h6 {
          margin: 0 0 5px 0;
          font-size: 1rem;
          color: #0D181C;
        }
        
        .announcement-content p {
          margin: 0 0 10px 0;
          font-size: 0.9rem;
          color: #495057;
        }
        
        .announcement-date {
          font-size: 0.8rem;
          color: #A6B8C1;
        }
        
        .no-data-message {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 30px 0;
          color: #A6B8C1;
        }
        
        .no-data-message i {
          font-size: 2rem;
          margin-bottom: 10px;
        }
        
        .no-data-message p {
          font-size: 0.9rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementList;
