import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCurrentUser, fetchDocuments, fetchFavoriteDocuments, toggleFavorite } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Materials() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [documents, setDocuments] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    const checkUser = async () => {
      try {
        const { user, error } = await getCurrentUser();
        
        if (error || !user) {
          router.push('/login');
          return;
        }
        
        setUser(user);
        
        // Fetch documents and favorites
        await fetchUserDocuments(user.id);
      } catch (error) {
        console.error('Error checking user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, [router]);

  const fetchUserDocuments = async (userId) => {
    try {
      // Fetch all documents
      const { data: documentsData, error: documentsError } = await fetchDocuments();
      if (!documentsError) {
        setDocuments(documentsData || []);
      }
      
      // Fetch user favorites
      const { data: favoritesData, error: favoritesError } = await fetchFavoriteDocuments(userId);
      if (!favoritesError) {
        setFavorites(favoritesData || []);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleCategoryChange = async (category) => {
    setActiveCategory(category);
    setLoading(true);
    
    try {
      if (category === 'all') {
        const { data, error } = await fetchDocuments();
        if (!error) {
          setDocuments(data || []);
        }
      } else if (category === 'favorites') {
        const { data, error } = await fetchFavoriteDocuments(user.id);
        if (!error) {
          setFavorites(data || []);
        }
      } else {
        const { data, error } = await fetchDocuments(category);
        if (!error) {
          setDocuments(data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching documents by category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (documentId) => {
    try {
      await toggleFavorite(user.id, documentId);
      // Refresh favorites
      await fetchUserDocuments(user.id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isFavorite = (documentId) => {
    return favorites.some(fav => fav.document_id === documentId);
  };

  const getDocumentIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return 'bi-file-earmark-pdf';
      case 'doc':
      case 'docx':
        return 'bi-file-earmark-word';
      case 'xls':
      case 'xlsx':
        return 'bi-file-earmark-excel';
      case 'ppt':
      case 'pptx':
        return 'bi-file-earmark-ppt';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'bi-file-earmark-image';
      case 'zip':
      case 'rar':
        return 'bi-file-earmark-zip';
      default:
        return 'bi-file-earmark-text';
    }
  };

  if (loading) {
    return <div className="loading-container">Carregando...</div>;
  }

  return (
    <div className="wrapper">
      <Sidebar activePage="materials" user={user} />
      
      <div id="content">
        <Navbar user={user} />
        
        <div className="page-header">
          <h1>Central de Materiais</h1>
          <p>Acesse todos os documentos, apresentações e materiais de marketing para impulsionar seus resultados.</p>
        </div>
        
        <div className="materials-container">
          {/* Search and Filter */}
          <div className="row mb-4">
            <div className="col-md-8">
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Buscar materiais..." 
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button className="btn btn-primary" type="button">
                  <i className="bi bi-search"></i> Buscar
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select"
                value={activeCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="all">Todos os tipos</option>
                <option value="apresentacoes">Apresentações</option>
                <option value="tecnicos">Materiais Técnicos</option>
                <option value="marketing">Materiais de Marketing</option>
                <option value="vendas">Materiais de Vendas</option>
                <option value="favorites">Favoritos</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="row mb-4">
            <h5 className="mb-3">Categorias</h5>
            <div className="col-md-3 mb-4">
              <div className="card category-card">
                <div className="card-body text-center">
                  <div className="category-icon">
                    <i className="bi bi-file-earmark-slides"></i>
                  </div>
                  <h5>Apresentações Institucionais</h5>
                  <p className="text-muted">12 arquivos</p>
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => handleCategoryChange('apresentacoes')}
                  >
                    Acessar
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card category-card">
                <div className="card-body text-center">
                  <div className="category-icon">
                    <i className="bi bi-file-earmark-text"></i>
                  </div>
                  <h5>Materiais Técnicos</h5>
                  <p className="text-muted">18 arquivos</p>
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => handleCategoryChange('tecnicos')}
                  >
                    Acessar
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card category-card">
                <div className="card-body text-center">
                  <div className="category-icon">
                    <i className="bi bi-megaphone"></i>
                  </div>
                  <h5>Materiais de Marketing</h5>
                  <p className="text-muted">24 arquivos</p>
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => handleCategoryChange('marketing')}
                  >
                    Acessar
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card category-card">
                <div className="card-body text-center">
                  <div className="category-icon">
                    <i className="bi bi-graph-up-arrow"></i>
                  </div>
                  <h5>Materiais de Vendas</h5>
                  <p className="text-muted">15 arquivos</p>
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => handleCategoryChange('vendas')}
                  >
                    Acessar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Document List */}
          <div className="row mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                {activeCategory === 'all' ? 'Todos os Documentos' : 
                 activeCategory === 'favorites' ? 'Documentos Favoritos' : 
                 `Documentos - ${activeCategory}`}
              </h5>
              {searchTerm && <span>Resultados para: "{searchTerm}"</span>}
            </div>
            
            {filteredDocuments.length > 0 ? (
              <div className="document-grid">
                {filteredDocuments.map((document) => (
                  <div key={document.id} className="document-card">
                    <div className="document-icon">
                      <i className={`bi ${getDocumentIcon(document.file_type)}`}></i>
                    </div>
                    <div className="document-info">
                      <h6>{document.title}</h6>
                      <p>{document.description}</p>
                      <div className="document-meta">
                        <span className="document-date">
                          Atualizado em {new Date(document.updated_at).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="document-category">{document.category}</span>
                      </div>
                    </div>
                    <div className="document-actions">
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-download"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button 
                        className={`btn btn-sm ${isFavorite(document.id) ? 'btn-outline-accent' : 'btn-outline-secondary'}`}
                        onClick={() => handleToggleFavorite(document.id)}
                      >
                        <i className={`bi ${isFavorite(document.id) ? 'bi-star-fill' : 'bi-star'}`}></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-documents">
                <i className="bi bi-folder2-open"></i>
                <p>Nenhum documento encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .wrapper {
          display: flex;
          width: 100%;
          align-items: stretch;
        }
        
        #content {
          width: calc(100% - 250px);
          min-height: 100vh;
          transition: all 0.3s;
          position: absolute;
          top: 0;
          right: 0;
        }
        
        .page-header {
          padding: 0 20px 20px 20px;
        }
        
        .page-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #0D181C;
          margin-bottom: 5px;
        }
        
        .page-header p {
          color: #A6B8C1;
          font-size: 1.1rem;
        }
        
        .materials-container {
          padding: 0 20px;
        }
        
        .category-card {
          height: 100%;
          transition: all 0.3s ease;
        }
        
        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .category-icon {
          font-size: 2.5rem;
          color: #254C5A;
          margin-bottom: 15px;
        }
        
        .document-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .document-card {
          background-color: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .document-icon {
          font-size: 2rem;
          color: #254C5A;
          margin-bottom: 15px;
        }
        
        .document-info {
          flex: 1;
        }
        
        .document-info h6 {
          margin: 0 0 10px 0;
          font-size: 1rem;
          color: #0D181C;
        }
        
        .document-info p {
          margin: 0 0 15px 0;
          font-size: 0.9rem;
          color: #495057;
        }
        
        .document-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          font-size: 0.8rem;
          color: #A6B8C1;
        }
        
        .document-actions {
          display: flex;
          gap: 10px;
        }
        
        .btn-outline-accent {
          color: #9D4916;
          border-color: #9D4916;
        }
        
        .btn-outline-accent:hover {
          background-color: #9D4916;
          color: white;
        }
        
        .no-documents {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0;
          color: #A6B8C1;
        }
        
        .no-documents i {
          font-size: 3rem;
          margin-bottom: 15px;
        }
        
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 1.2rem;
          color: #254C5A;
        }
      `}</style>
    </div>
  );
}
