import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCurrentUser } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Product() {
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
      <Sidebar activePage="product" user={user} />
      
      <div id="content">
        <Navbar user={user} />
        
        <div className="page-header">
          <h1>Produto NIVELA</h1>
          <p>Conheça todos os detalhes sobre o revolucionário retexturizador capilar com tecnologia ASTRO QUAT V3.</p>
        </div>
        
        <div className="product-container">
          <div className="row">
            <div className="col-md-6">
              <div className="product-image-container">
                <img src="https://via.placeholder.com/600x400" alt="Produto NIVELA" className="product-image" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-info">
                <h2>NIVELA Retexturizador Capilar</h2>
                <div className="product-badge">Tecnologia Patenteada</div>
                
                <p className="product-description">
                  O NIVELA é um revolucionário retexturizador capilar desenvolvido com a exclusiva tecnologia ASTRO QUAT V3, 
                  que proporciona resultados excepcionais na transformação dos fios, reduzindo o volume e eliminando o frizz 
                  sem comprometer a saúde do cabelo.
                </p>
                
                <div className="product-highlights">
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <i className="bi bi-award"></i>
                    </div>
                    <div className="highlight-content">
                      <h5>Tecnologia Exclusiva</h5>
                      <p>ASTRO QUAT V3 patenteada para resultados superiores</p>
                    </div>
                  </div>
                  
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <i className="bi bi-droplet"></i>
                    </div>
                    <div className="highlight-content">
                      <h5>Ativos Naturais</h5>
                      <p>Fórmula enriquecida com óleos e extratos naturais</p>
                    </div>
                  </div>
                  
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <i className="bi bi-shield-check"></i>
                    </div>
                    <div className="highlight-content">
                      <h5>Sem Formol</h5>
                      <p>100% livre de formol e outros componentes nocivos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row mt-5">
            <div className="col-12">
              <div className="section-title">
                <h3>Benefícios Comprovados</h3>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="bi bi-clock"></i>
                </div>
                <h4>Redução de 70% do Tempo de Secagem</h4>
                <p>
                  A tecnologia ASTRO QUAT V3 reorganiza as fibras capilares, facilitando a secagem e reduzindo 
                  significativamente o tempo necessário para finalizar os cabelos.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="bi bi-moisture"></i>
                </div>
                <h4>Eliminação do Frizz por até 3 Meses</h4>
                <p>
                  Resultados duradouros com efeito anti-frizz que permanece mesmo em condições de alta umidade, 
                  garantindo cabelos controlados por até 3 meses.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="bi bi-stars"></i>
                </div>
                <h4>Brilho e Maciez Incomparáveis</h4>
                <p>
                  Além de controlar o volume, o NIVELA proporciona brilho intenso e maciez excepcional, 
                  deixando os cabelos com aspecto saudável e natural.
                </p>
              </div>
            </div>
          </div>
          
          <div className="row mt-5">
            <div className="col-12">
              <div className="section-title">
                <h3>Diferenciais Técnicos</h3>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="technical-info">
                <h4>Tecnologia ASTRO QUAT V3</h4>
                <p>
                  A tecnologia patenteada ASTRO QUAT V3 representa um avanço significativo no tratamento capilar. 
                  Desenvolvida após anos de pesquisa, esta tecnologia utiliza um complexo quaternário de última geração 
                  que atua nas três camadas do fio, proporcionando resultados superiores sem danificar a estrutura capilar.
                </p>
                <p>
                  Diferente de outros produtos do mercado, o NIVELA não quebra as ligações de dissulfeto do cabelo, 
                  mas reorganiza as fibras capilares de forma inteligente, preservando a integridade e a saúde dos fios.
                </p>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="technical-info">
                <h4>Textura em Gel</h4>
                <p>
                  O NIVELA possui uma textura em gel exclusiva que facilita a aplicação e garante distribuição uniforme 
                  do produto em todos os fios. Esta formulação inovadora permite melhor controle durante a aplicação, 
                  evitando desperdícios e otimizando o rendimento do produto.
                </p>
                <p>
                  A textura em gel também contribui para a estabilidade dos ativos, garantindo que todos os componentes 
                  da fórmula permaneçam em suas concentrações ideais até o momento da aplicação.
                </p>
              </div>
            </div>
          </div>
          
          <div className="row mt-5">
            <div className="col-12">
              <div className="section-title">
                <h3>Materiais Técnicos</h3>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="material-card">
                <div className="material-icon">
                  <i className="bi bi-file-earmark-pdf"></i>
                </div>
                <h5>Guia Técnico Completo</h5>
                <p>Documento detalhado com todas as informações técnicas sobre o produto NIVELA.</p>
                <Link href="/materials?category=tecnicos">
                  <a className="btn btn-outline-primary">Acessar</a>
                </Link>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="material-card">
                <div className="material-icon">
                  <i className="bi bi-file-earmark-text"></i>
                </div>
                <h5>Manual de Aplicação</h5>
                <p>Passo a passo detalhado para aplicação correta do produto em diferentes tipos de cabelo.</p>
                <Link href="/materials?category=tecnicos">
                  <a className="btn btn-outline-primary">Acessar</a>
                </Link>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="material-card">
                <div className="material-icon">
                  <i className="bi bi-file-earmark-medical"></i>
                </div>
                <h5>Estudos de Eficácia</h5>
                <p>Resultados dos testes clínicos e estudos que comprovam a eficácia do NIVELA.</p>
                <Link href="/materials?category=tecnicos">
                  <a className="btn btn-outline-primary">Acessar</a>
                </Link>
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
        
        .product-container {
          padding: 0 20px 40px 20px;
        }
        
        .product-image-container {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .product-image {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .product-info {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .product-info h2 {
          color: #254C5A;
          margin-bottom: 10px;
          font-weight: 700;
        }
        
        .product-badge {
          display: inline-block;
          background-color: #9D4916;
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 20px;
        }
        
        .product-description {
          font-size: 1.1rem;
          color: #495057;
          margin-bottom: 30px;
          line-height: 1.6;
        }
        
        .product-highlights {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }
        
        .highlight-icon {
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
        
        .highlight-content h5 {
          margin: 0 0 5px 0;
          color: #0D181C;
          font-size: 1.1rem;
        }
        
        .highlight-content p {
          margin: 0;
          color: #495057;
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
        
        .benefit-card {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          height: 100%;
          transition: all 0.3s ease;
        }
        
        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .benefit-icon {
          font-size: 2.5rem;
          color: #9D4916;
          margin-bottom: 20px;
        }
        
        .benefit-card h4 {
          color: #254C5A;
          margin-bottom: 15px;
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        .benefit-card p {
          color: #495057;
          margin: 0;
        }
        
        .technical-info {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          height: 100%;
        }
        
        .technical-info h4 {
          color: #254C5A;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .technical-info p {
          color: #495057;
          margin-bottom: 15px;
        }
        
        .technical-info p:last-child {
          margin-bottom: 0;
        }
        
        .material-card {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .material-icon {
          font-size: 3rem;
          color: #254C5A;
          margin-bottom: 20px;
        }
        
        .material-card h5 {
          color: #0D181C;
          margin-bottom: 10px;
          font-weight: 600;
        }
        
        .material-card p {
          color: #495057;
          margin-bottom: 20px;
          flex: 1;
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
