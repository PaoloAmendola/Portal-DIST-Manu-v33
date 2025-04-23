import React from 'react';
import Link from 'next/link';

const QuickAccess = () => {
  const quickLinks = [
    { 
      id: 1, 
      title: 'Fazer Pedido', 
      icon: 'bi-cart-plus', 
      color: '#254C5A', 
      link: '/operations/orders/new' 
    },
    { 
      id: 2, 
      title: 'Catálogo de Produtos', 
      icon: 'bi-box-seam', 
      color: '#9D4916', 
      link: '/operations/products' 
    },
    { 
      id: 3, 
      title: 'Materiais de Marketing', 
      icon: 'bi-megaphone', 
      color: '#A6B8C1', 
      link: '/materials/marketing' 
    },
    { 
      id: 4, 
      title: 'Suporte Técnico', 
      icon: 'bi-headset', 
      color: '#D9C0AA', 
      link: '/support' 
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Acesso Rápido</h5>
      </div>
      <div className="card-body">
        <div className="quick-access-grid">
          {quickLinks.map((link) => (
            <Link href={link.link} key={link.id}>
              <a className="quick-access-item">
                <div className="quick-access-icon" style={{ backgroundColor: link.color }}>
                  <i className={`bi ${link.icon}`}></i>
                </div>
                <div className="quick-access-title">{link.title}</div>
              </a>
            </Link>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .quick-access-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        
        .quick-access-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
          border-radius: 8px;
          background-color: #f8f9fa;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .quick-access-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .quick-access-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
          color: white;
          font-size: 1.5rem;
        }
        
        .quick-access-title {
          font-size: 0.85rem;
          color: #0D181C;
          text-align: center;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default QuickAccess;
