import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCurrentUser } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function About() {
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
      <Sidebar activePage="about" user={user} />
      
      <div id="content">
        <Navbar user={user} />
        
        <div className="page-header">
          <h1>Sobre Nós</h1>
          <p>Conheça a Bem Beauty Professional e nossa missão de transformar o mercado de cosméticos profissionais.</p>
        </div>
        
        <div className="about-container">
          <div className="row">
            <div className="col-md-6">
              <div className="about-image-container">
                <img src="https://via.placeholder.com/600x400" alt="Bem Beauty Professional" className="about-image" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="about-content">
                <h2>Bem Beauty Professional</h2>
                <p className="lead">
                  Somos uma empresa brasileira especializada no desenvolvimento de produtos capilares profissionais 
                  de alta performance, com foco em inovação e tecnologia.
                </p>
                <p>
                  Fundada com a missão de revolucionar o mercado de cosméticos profissionais, a Bem Beauty Professional 
                  investe continuamente em pesquisa e desenvolvimento para criar soluções que atendam às necessidades 
                  dos profissionais mais exigentes e seus clientes.
                </p>
                <p>
                  Nossa equipe é formada por especialistas em química cosmética, tricologia e desenvolvimento de produtos, 
                  trabalhando em conjunto para criar formulações inovadoras que combinam ciência avançada e ingredientes 
                  naturais de alta qualidade.
                </p>
              </div>
            </div>
          </div>
          
          <div className="row mt-5">
            <div className="col-12">
              <div className="section-title">
                <h3>Nossa Missão, Visão e Valores</h3>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="value-card">
                <div className="value-icon">
                  <i className="bi bi-bullseye"></i>
                </div>
                <h4>Missão</h4>
                <p>
                  Desenvolver e oferecer produtos capilares de alta performance que transformem a experiência 
                  dos profissionais e clientes, combinando tecnologia avançada, sustentabilidade e resultados excepcionais.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="value-card">
                <div className="value-icon">
                  <i className="bi bi-eye"></i>
                </div>
                <h4>Visão</h4>
                <p>
                  Ser reconhecida como referência em inovação no mercado de cosméticos profissionais, 
                  expandindo nossa presença nacional e internacional com produtos que estabelecem novos 
                  padrões de qualidade e eficácia.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="value-card">
                <div className="value-icon">
                  <i className="bi bi-heart"></i>
                </div>
                <h4>Valores</h4>
                <ul className="values-list">
                  <li>Inovação constante</li>
                  <li>Excelência em qualidade</li>
                  <li>Compromisso com resultados</li>
                  <li>Ética e transparência</li>
                  <li>Sustentabilidade</li>
                  <li>Valorização dos parceiros</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="row mt-5">
            <div className="col-12">
              <div className="section-title">
                <h3>Tecnologia ASTRO QUAT V3</h3>
              </div>
            </div>
            
            <div className="col-md-12">
              <div className="technology-section">
                <p className="lead">
                  Nossa tecnologia patenteada ASTRO QUAT V3 representa um marco na indústria de tratamentos capilares, 
                  combinando ciência avançada e inovação para oferecer resultados superiores.
                </p>
                
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="tech-feature">
                      <div className="tech-icon">
                        <i className="bi bi-lightbulb"></i>
                      </div>
                      <div className="tech-content">
                        <h5>Desenvolvimento Exclusivo</h5>
                        <p>
                          Desenvolvida após anos de pesquisa em nossos laboratórios, a tecnologia ASTRO QUAT V3 
                          utiliza um complexo quaternário de última geração que atua nas três camadas do fio capilar.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="tech-feature">
                      <div className="tech-icon">
                        <i className="bi bi-shield-check"></i>
                      </div>
                      <div className="tech-content">
                        <h5>Segurança Comprovada</h5>
                        <p>
                          Todos os componentes da tecnologia ASTRO QUAT V3 passaram por rigorosos testes de 
                          segurança e eficácia, garantindo resultados sem comprometer a saúde dos fios.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="tech-feature">
                      <div className="tech-icon">
                        <i className="bi bi-award"></i>
                      </div>
                      <div className="tech-content">
                        <h5>Reconhecimento Internacional</h5>
                        <p>
                          Nossa tecnologia foi reconhecida em feiras internacionais de cosméticos e recebeu 
                          prêmios de inovação por seu desempenho superior e abordagem sustentável.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="tech-feature">
                      <div className="tech-icon">
                        <i className="bi bi-graph-up"></i>
                      </div>
                      <div className="tech-content">
                        <h5>Resultados Comprovados</h5>
                        <p>
                          Estudos clínicos demonstram a eficácia superior da tecnologia ASTRO QUAT V3 em 
                          comparação com outros tratamentos disponíveis no mercado.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row mt-5">
            <div className="col-12">
              <div className="section-title">
                <h3>Programa de Distribuidores</h3>
              </div>
            </div>
            
            <div className="col-md-12">
              <div className="distributor-section">
                <p className="lead">
                  Nosso programa de distribuidores foi desenvolvido para criar parcerias sólidas e duradouras, 
                  oferecendo suporte completo para o sucesso de nossos parceiros comerciais.
                </p>
                
                <div className="row mt-4">
                  <div className="col-md-4">
                    <div className="distributor-feature">
                      <div className="distributor-icon">
                        <i className="bi bi-briefcase"></i>
                      </div>
                      <h5>Oportunidade de Negócio</h5>
                      <p>
                        Produtos exclusivos com alta margem de lucro e demanda crescente no mercado de beleza profissional.
                      </p>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="distributor-feature">
                      <div className="distributor-icon">
                        <i className="bi bi-tools"></i>
                      </div>
                      <h5>Suporte Completo</h5>
                      <p>
                        Treinamentos técnicos, materiais de marketing, suporte comercial e acompanhamento personalizado.
                      </p>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="distributor-feature">
                      <div className="distributor-icon">
                        <i className="bi bi-trophy"></i>
                      </div>
                      <h5>Programa de Reconhecimento</h5>
                      <p>
                        Benefícios exclusivos para distribuidores que atingem metas de vendas e desenvolvimento de mercado.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="distributor-cta mt-5">
                  <p>
                    Como distribuidor oficial da Bem Beauty Professional, você tem acesso a este portal exclusivo 
                    com todos os recursos e materiais necessários para impulsionar seu negócio.
                  </p>
                  <Link href="/materials">
                    <a className="btn btn-primary">Acessar Materiais</a>
                  </Link>
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
        
        .about-container {
          padding: 0 20px 40px 20px;
        }
        
        .about-image-container {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .about-image {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .about-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .about-content h2 {
          color: #254C5A;
          margin-bottom: 20px;
          font-weight: 700;
        }
        
        .about-content .lead {
          font-size: 1.2rem;
          font-weight: 500;
          color: #0D181C;
          margin-bottom: 20px;
        }
        
        .about-content p {
          color: #495057;
          margin-bottom: 15px;
          line-height: 1.6;
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
        
        .value-card {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          height: 100%;
          transition: all 0.3s ease;
        }
        
        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .value-icon {
          font-size: 2.5rem;
          color: #9D4916;
          margin-bottom: 20px;
        }
        
        .value-card h4 {
          color: #254C5A;
          margin-bottom: 15px;
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        .value-card p {
          color: #495057;
          margin: 0;
        }
        
        .values-list {
          color: #495057;
          padding-left: 20px;
          margin: 0;
        }
        
        .values-list li {
          margin-bottom: 8px;
        }
        
        .values-list li:last-child {
          margin-bottom: 0;
        }
        
        .technology-section {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        .technology-section .lead {
          font-size: 1.2rem;
          font-weight: 500;
          color: #0D181C;
          margin-bottom: 20px;
        }
        
        .tech-feature {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .tech-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #254C5A;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.8rem;
          flex-shrink: 0;
        }
        
        .tech-content h5 {
          margin: 0 0 10px 0;
          color: #0D181C;
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .tech-content p {
          margin: 0;
          color: #495057;
        }
        
        .distributor-section {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        .distributor-section .lead {
          font-size: 1.2rem;
          font-weight: 500;
          color: #0D181C;
          margin-bottom: 20px;
        }
        
        .distributor-feature {
          text-align: center;
          padding: 20px;
          height: 100%;
        }
        
        .distributor-icon {
          font-size: 2.5rem;
          color: #9D4916;
          margin-bottom: 20px;
        }
        
        .distributor-feature h5 {
          color: #254C5A;
          margin-bottom: 15px;
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .distributor-feature p {
          color: #495057;
          margin: 0;
        }
        
        .distributor-cta {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        
        .distributor-cta p {
          margin-bottom: 20px;
          color: #0D181C;
          font-size: 1.1rem;
        }
        
        .btn-primary {
          background-color: #254C5A;
          border-color: #254C5A;
        }
        
        .btn-primary:hover {
          background-color: #1a3a45;
          border-color: #1a3a45;
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
