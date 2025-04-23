import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCurrentUser } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Academy() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
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
      } catch (error) {
        console.error('Error checking user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, [router]);

  if (loading) {
    return <div className="loading-container">Carregando...</div>;
  }

  return (
    <div className="wrapper">
      <Sidebar activePage="academy" user={user} />
      
      <div id="content">
        <Navbar user={user} />
        
        <div className="page-header">
          <h1>Academia NIVELA</h1>
          <p>Acesse treinamentos exclusivos e torne-se um especialista no produto NIVELA.</p>
        </div>
        
        <div className="academy-container">
          <div className="row">
            <div className="col-md-8">
              <div className="featured-course">
                <div className="featured-course-image">
                  <img src="https://via.placeholder.com/800x400" alt="Curso Destaque" />
                  <div className="featured-badge">Em Destaque</div>
                </div>
                <div className="featured-course-content">
                  <h2>Especialista em NIVELA: Técnicas Avançadas</h2>
                  <p className="course-description">
                    Domine todas as técnicas de aplicação do NIVELA em diferentes tipos de cabelo e aprenda 
                    estratégias avançadas para maximizar os resultados e a satisfação dos clientes.
                  </p>
                  <div className="course-meta">
                    <span><i className="bi bi-clock"></i> 4 horas de conteúdo</span>
                    <span><i className="bi bi-play-circle"></i> 12 vídeos</span>
                    <span><i className="bi bi-file-earmark-text"></i> 5 materiais complementares</span>
                  </div>
                  <button className="btn btn-primary mt-3">Iniciar Treinamento</button>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="academy-stats">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="bi bi-mortarboard"></i>
                  </div>
                  <div className="stat-content">
                    <h3>3</h3>
                    <p>Cursos Concluídos</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="bi bi-award"></i>
                  </div>
                  <div className="stat-content">
                    <h3>2</h3>
                    <p>Certificações</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="bi bi-clock-history"></i>
                  </div>
                  <div className="stat-content">
                    <h3>8h</h3>
                    <p>Horas de Estudo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row mt-5">
            <div className="col-12">
              <div className="section-title">
                <h3>Treinamentos Disponíveis</h3>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="course-card">
                <div className="course-image">
                  <img src="https://via.placeholder.com/400x225" alt="Fundamentos do NIVELA" />
                  <div className="course-level beginner">Básico</div>
                </div>
                <div className="course-content">
                  <h4>Fundamentos do NIVELA</h4>
                  <p>
                    Conheça a tecnologia ASTRO QUAT V3 e os princípios básicos de aplicação do produto NIVELA.
                  </p>
                  <div className="course-meta">
                    <span><i className="bi bi-clock"></i> 1.5 horas</span>
                    <span><i className="bi bi-play-circle"></i> 6 vídeos</span>
                  </div>
                  <div className="course-progress">
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span className="progress-text">Concluído</span>
                  </div>
                  <button className="btn btn-outline-primary mt-3 w-100">Revisar Curso</button>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="course-card">
                <div className="course-image">
                  <img src="https://via.placeholder.com/400x225" alt="Técnicas de Aplicação" />
                  <div className="course-level intermediate">Intermediário</div>
                </div>
                <div className="course-content">
                  <h4>Técnicas de Aplicação</h4>
                  <p>
                    Aprenda diferentes técnicas de aplicação para diversos tipos de cabelo e necessidades específicas.
                  </p>
                  <div className="course-meta">
                    <span><i className="bi bi-clock"></i> 2 horas</span>
                    <span><i className="bi bi-play-circle"></i> 8 vídeos</span>
                  </div>
                  <div className="course-progress">
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span className="progress-text">Concluído</span>
                  </div>
                  <button className="btn btn-outline-primary mt-3 w-100">Revisar Curso</button>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="course-card">
                <div className="course-image">
                  <img src="https://via.placeholder.com/400x225" alt="Vendas Consultivas" />
                  <div className="course-level intermediate">Intermediário</div>
                </div>
                <div className="course-content">
                  <h4>Vendas Consultivas</h4>
                  <p>
                    Desenvolva habilidades de vendas consultivas para apresentar o NIVELA de forma eficaz aos clientes.
                  </p>
                  <div className="course-meta">
                    <span><i className="bi bi-clock"></i> 1.5 horas</span>
                    <span><i className="bi bi-play-circle"></i> 5 vídeos</span>
                  </div>
                  <div className="course-progress">
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span className="progress-text">Concluído</span>
                  </div>
                  <button className="btn btn-outline-primary mt-3 w-100">Revisar Curso</button>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="course-card">
                <div className="course-image">
                  <img src="https://via.placeholder.com/400x225" alt="Especialista em NIVELA" />
                  <div className="course-level advanced">Avançado</div>
                </div>
                <div className="course-content">
                  <h4>Especialista em NIVELA: Técnicas Avançadas</h4>
                  <p>
                    Domine técnicas avançadas de aplicação e personalização de tratamentos com NIVELA.
                  </p>
                  <div className="course-meta">
                    <span><i className="bi bi-clock"></i> 4 horas</span>
                    <span><i className="bi bi-play-circle"></i> 12 vídeos</span>
                  </div>
                  <div className="course-progress">
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" style={{ width: '0%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span className="progress-text">Não iniciado</span>
                  </div>
                  <button className="btn btn-primary mt-3 w-100">Iniciar Curso</button>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="course-card">
                <div className="course-image">
                  <img src="https://via.placeholder.com/400x225" alt="Gestão de Salão" />
                  <div className="course-level intermediate">Intermediário</div>
                </div>
                <div className="course-content">
                  <h4>Gestão de Salão com NIVELA</h4>
                  <p>
                    Aprenda a implementar o NIVELA em seu salão, desde precificação até estratégias de marketing.
                  </p>
                  <div className="course-meta">
                    <span><i className="bi bi-clock"></i> 3 horas</span>
                    <span><i className="bi bi-play-circle"></i> 10 vídeos</span>
                  </div>
                  <div className="course-progress">
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" style={{ width: '0%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span className="progress-text">Não iniciado</span>
                  </div>
                  <button className="btn btn-primary mt-3 w-100">Iniciar Curso</button>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="course-card coming-soon">
                <div className="course-image">
                  <img src="https://via.placeholder.com/400x225" alt="Masterclass NIVELA" />
                  <div className="course-level advanced">Avançado</div>
                </div>
                <div className="course-content">
                  <div className="coming-soon-badge">Em Breve</div>
                  <h4>Masterclass NIVELA 2025</h4>
                  <p>
                    Conteúdo exclusivo com as últimas tendências e técnicas avançadas para o uso do NIVELA.
                  </p>
                  <div className="course-meta">
                    <span><i className="bi bi-clock"></i> 5 horas</span>
                    <span><i className="bi bi-play-circle"></i> 15 vídeos</span>
                  </div>
                  <button className="btn btn-outline-secondary mt-3 w-100" disabled>Em Breve</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row mt-5">
            <div className="col-12">
              <div className="section-title">
                <h3>Certificações</h3>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="certification-card">
                <div className="certification-icon">
                  <i className="bi bi-award"></i>
                </div>
                <div className="certification-content">
                  <h4>Especialista NIVELA Nível 1</h4>
                  <p>
                    Certificação que atesta conhecimento nos fundamentos e técnicas básicas de aplicação do NIVELA.
                  </p>
                  <div className="certification-meta">
                    <span><i className="bi bi-calendar-check"></i> Obtida em: 15/02/2025</span>
                    <span><i className="bi bi-person-check"></i> Validada por: Bem Beauty Professional</span>
                  </div>
                  <button className="btn btn-outline-primary mt-3">Ver Certificado</button>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="certification-card">
                <div className="certification-icon">
                  <i className="bi bi-award"></i>
                </div>
                <div className="certification-content">
                  <h4>Consultor de Vendas NIVELA</h4>
                  <p>
                    Certificação que atesta habilidades em vendas consultivas e apresentação do produto NIVELA.
                  </p>
                  <div className="certification-meta">
                    <span><i className="bi bi-calendar-check"></i> Obtida em: 10/03/2025</span>
                    <span><i className="bi bi-person-check"></i> Validada por: Bem Beauty Professional</span>
                  </div>
                  <button className="btn btn-outline-primary mt-3">Ver Certificado</button>
                </div>
              </div>
            </div>
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
        
        .academy-container {
          padding: 0 20px 40px 20px;
        }
        
        .featured-course {
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        .featured-course-image {
          position: relative;
        }
        
        .featured-course-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .featured-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background-color: #9D4916;
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .featured-course-content {
          padding: 25px;
        }
        
        .featured-course-content h2 {
          color: #254C5A;
          margin-bottom: 15px;
          font-weight: 700;
          font-size: 1.5rem;
        }
        
        .course-description {
          color: #495057;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        
        .course-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 10px;
        }
        
        .course-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #A6B8C1;
          font-size: 0.9rem;
        }
        
        .academy-stats {
          display: flex;
          flex-direction: column;
          gap: 15px;
          height: 100%;
        }
        
        .stat-card {
          background-color: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #254C5A;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .stat-content h3 {
          margin: 0 0 5px 0;
          color: #0D181C;
          font-size: 1.5rem;
          font-weight: 700;
        }
        
        .stat-content p {
          margin: 0;
          color: #A6B8C1;
          font-size: 0.9rem;
        }
        
        .section-title {
          border-bottom: 2px solid #D9C0AA;
          padding-bottom: 10px;
          margin-bottom: 30px;
        }
        
        .section-title h3 {
          color: #254C5A;
          font-weight: 700;
          margin: 0;
        }
        
        .course-card {
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          height: 100%;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .course-image {
          position: relative;
        }
        
        .course-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .course-level {
          position: absolute;
          top: 10px;
          left: 10px;
          padding: 3px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
        }
        
        .course-level.beginner {
          background-color: #28a745;
        }
        
        .course-level.intermediate {
          background-color: #fd7e14;
        }
        
        .course-level.advanced {
          background-color: #dc3545;
        }
        
        .course-content {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .course-content h4 {
          color: #254C5A;
          margin-bottom: 10px;
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .course-content p {
          color: #495057;
          margin-bottom: 15px;
          font-size: 0.9rem;
          flex: 1;
        }
        
        .course-progress {
          margin-top: 10px;
        }
        
        .progress {
          height: 6px;
          background-color: #f5f7fa;
        }
        
        .progress-bar {
          background-color: #254C5A;
        }
        
        .progress-text {
          display: block;
          text-align: right;
          font-size: 0.8rem;
          color: #A6B8C1;
          margin-top: 5px;
        }
        
        .course-card.coming-soon {
          position: relative;
        }
        
        .coming-soon-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background-color: #9D4916;
          color: white;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
          z-index: 1;
        }
        
        .certification-card {
          background-color: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          display: flex;
          gap: 20px;
          height: 100%;
        }
        
        .certification-icon {
          font-size: 2.5rem;
          color: #9D4916;
          flex-shrink: 0;
        }
        
        .certification-content {
          flex: 1;
        }
        
        .certification-content h4 {
          color: #254C5A;
          margin-bottom: 10px;
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        .certification-content p {
          color: #495057;
          margin-bottom: 15px;
        }
        
        .certification-meta {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 15px;
        }
        
        .certification-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #A6B8C1;
          font-size: 0.9rem;
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
