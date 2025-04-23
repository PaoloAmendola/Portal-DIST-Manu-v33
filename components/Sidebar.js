import React from 'react';
import Link from 'next/link';

const Sidebar = ({ activePage, user }) => {
  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <h3>Bem<span>Beauty</span></h3>
      </div>

      <ul className="list-unstyled components">
        <li className={activePage === "dashboard" ? "active" : ""}>
          <Link href="/dashboard">
            <a><i className="bi bi-speedometer2"></i> Dashboard</a>
          </Link>
        </li>
        <li className={activePage === "about" ? "active" : ""}>
          <Link href="/about">
            <a><i className="bi bi-building"></i> Sobre Nós</a>
          </Link>
        </li>
        <li className={activePage === "product" ? "active" : ""}>
          <Link href="/product">
            <a><i className="bi bi-droplet-fill"></i> Produto NIVELA</a>
          </Link>
        </li>
        <li className={activePage === "materials" ? "active" : ""}>
          <Link href="/materials">
            <a><i className="bi bi-folder2-open"></i> Central de Materiais</a>
          </Link>
        </li>
        <li className={activePage === "academy" ? "active" : ""}>
          <Link href="/academy">
            <a><i className="bi bi-mortarboard"></i> Academia NIVELA</a>
          </Link>
        </li>
        <li className={activePage === "operations" ? "active" : ""}>
          <Link href="/operations">
            <a><i className="bi bi-box-seam"></i> Operações</a>
          </Link>
        </li>
        <li className={activePage === "financial" ? "active" : ""}>
          <Link href="/financial">
            <a><i className="bi bi-cash-coin"></i> Financeiro</a>
          </Link>
        </li>
        <li className={activePage === "support" ? "active" : ""}>
          <Link href="/support">
            <a><i className="bi bi-headset"></i> Suporte</a>
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <div className="distributor-level">
          <span className="badge bg-accent">{user?.user_metadata?.distributor_level || 'Distribuidor Básico'}</span>
        </div>
        <div className="sidebar-contact">
          <Link href="/support">
            <a><i className="bi bi-question-circle"></i> Ajuda</a>
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        #sidebar {
          min-width: 250px;
          max-width: 250px;
          background: #0D181C;
          color: #fff;
          transition: all 0.3s;
          position: fixed;
          height: 100vh;
          z-index: 999;
          box-shadow: 3px 0 10px rgba(0, 0, 0, 0.1);
        }
        
        #sidebar .sidebar-header {
          padding: 20px;
          background: #0A1215;
        }
        
        #sidebar .sidebar-header h3 {
          margin: 0;
          font-weight: 700;
        }
        
        #sidebar .sidebar-header h3 span {
          color: #9D4916;
        }
        
        #sidebar ul.components {
          padding: 20px 0;
          border-bottom: 1px solid #1A2930;
        }
        
        #sidebar ul li {
          position: relative;
        }
        
        #sidebar ul li a {
          padding: 12px 20px;
          font-size: 1rem;
          display: block;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s;
          border-left: 3px solid transparent;
        }
        
        #sidebar ul li a i {
          margin-right: 10px;
        }
        
        #sidebar ul li a:hover {
          color: #fff;
          background: #1A2930;
          border-left: 3px solid #9D4916;
        }
        
        #sidebar ul li.active > a {
          color: #fff;
          background: #1A2930;
          border-left: 3px solid #9D4916;
        }
        
        #sidebar .sidebar-footer {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 20px;
          background: #0A1215;
        }
        
        #sidebar .distributor-level {
          margin-bottom: 15px;
          text-align: center;
        }
        
        #sidebar .distributor-level .badge {
          background-color: #9D4916;
          color: #fff;
          padding: 8px 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        #sidebar .sidebar-contact {
          text-align: center;
        }
        
        #sidebar .sidebar-contact a {
          color: #fff;
          text-decoration: none;
          font-size: 0.9rem;
        }
        
        #sidebar .sidebar-contact a:hover {
          color: #D9C0AA;
        }
      `}</style>
    </nav>
  );
};

export default Sidebar;
