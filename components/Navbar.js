import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = ({ user, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <button type="button" id="sidebarCollapse" className="btn">
          <i className="bi bi-list"></i>
        </button>
        
        <div className="ms-auto d-flex align-items-center">
          <div className="search-container me-3">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Buscar..." />
              <button className="btn btn-primary" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
          
          <div className="dropdown me-3">
            <button 
              className="btn position-relative" 
              type="button" 
              onClick={toggleNotifications}
            >
              <i className="bi bi-bell"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-accent">
                3
              </span>
            </button>
            {showNotifications && (
              <ul className="dropdown-menu dropdown-menu-end show">
                <li><a className="dropdown-item" href="#">Novo comunicado: Lançamento da Linha Premium</a></li>
                <li><a className="dropdown-item" href="#">Lembrete: Convenção Anual de Distribuidores</a></li>
                <li><a className="dropdown-item" href="#">Atualização: Nova política de devoluções</a></li>
              </ul>
            )}
          </div>
          
          <div className="dropdown">
            <button 
              className="btn d-flex align-items-center" 
              type="button"
              onClick={toggleUserMenu}
            >
              <img src="https://via.placeholder.com/40" className="rounded-circle me-2" alt="Foto do usuário" />
              <span>{user?.user_metadata?.full_name || 'Usuário'} <i className="bi bi-chevron-down ms-1"></i></span>
            </button>
            {showUserMenu && (
              <ul className="dropdown-menu dropdown-menu-end show">
                <li><Link href="/profile"><a className="dropdown-item"><i className="bi bi-person"></i> Meu Perfil</a></Link></li>
                <li><Link href="/settings"><a className="dropdown-item"><i className="bi bi-gear"></i> Configurações</a></Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" onClick={onLogout}><i className="bi bi-box-arrow-right"></i> Sair</a></li>
              </ul>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .navbar {
          padding: 15px 20px;
          background: #fff;
          border-bottom: 1px solid #eaeaea;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        #sidebarCollapse {
          background: transparent;
          border: none;
          font-size: 1.5rem;
          color: #254C5A;
          padding: 0;
        }
        
        .search-container {
          width: 300px;
        }
        
        .search-container .form-control {
          border-right: none;
        }
        
        .search-container .btn {
          background-color: #254C5A;
          border-color: #254C5A;
        }
        
        .dropdown .btn {
          background: transparent;
          border: none;
          color: #0D181C;
        }
        
        .dropdown .btn i.bi-bell {
          font-size: 1.2rem;
        }
        
        .dropdown .badge {
          background-color: #9D4916;
          font-size: 0.6rem;
        }
        
        .dropdown-menu {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border: none;
          border-radius: 8px;
          padding: 10px 0;
        }
        
        .dropdown-item {
          padding: 8px 20px;
          color: #0D181C;
        }
        
        .dropdown-item:hover {
          background-color: #f8f9fa;
        }
        
        .dropdown-item i {
          margin-right: 8px;
          color: #254C5A;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
