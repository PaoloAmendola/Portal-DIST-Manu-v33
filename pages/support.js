import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCurrentUser } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Support() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('tickets');
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
      <Sidebar activePage="support" user={user} />
      
      <div id="content">
        <Navbar user={user} />
        
        <div className="page-header">
          <h1>Suporte Técnico</h1>
          <p>Obtenha ajuda e suporte para todas as suas dúvidas sobre o produto NIVELA.</p>
        </div>
        
        <div className="support-container">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'tickets' ? 'active' : ''}`}
                onClick={() => setActiveTab('tickets')}
              >
                Meus Chamados
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'new' ? 'active' : ''}`}
                onClick={() => setActiveTab('new')}
              >
                Novo Chamado
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'faq' ? 'active' : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                Perguntas Frequentes
              </button>
            </li>
          </ul>
          
          {activeTab === 'tickets' && (
            <div className="tickets-section">
              <div className="tickets-header">
                <h4>Meus Chamados</h4>
                <button className="btn btn-primary" onClick={() => setActiveTab('new')}>
                  <i className="bi bi-plus-circle"></i> Novo Chamado
                </button>
              </div>
              
              <div className="tickets-list">
                <div className="ticket-item">
                  <div className="ticket-status open">Aberto</div>
                  <div className="ticket-content">
                    <h5 className="ticket-title">Dúvida sobre aplicação em cabelos crespos</h5>
                    <p className="ticket-description">
                      Preciso de orientações específicas para aplicação do NIVELA em cabelos crespos tipo 4C.
                    </p>
                    <div className="ticket-meta">
                      <span className="ticket-id">Chamado #1234</span>
                      <span className="ticket-date">Aberto em: 18/04/2025</span>
                    </div>
                  </div>
                  <div className="ticket-actions">
                    <button className="btn btn-sm btn-outline-primary">Ver Detalhes</button>
                  </div>
                </div>
                
                <div className="ticket-item">
                  <div className="ticket-status in-progress">Em Andamento</div>
                  <div className="ticket-content">
                    <h5 className="ticket-title">Problema com resultado em cliente</h5>
                    <p className="ticket-description">
                      Cliente relatou frizz após 2 semanas da aplicação do NIVELA. Preciso de orientação técnica.
                    </p>
                    <div className="ticket-meta">
                      <span className="ticket-id">Chamado #1189</span>
                      <span className="ticket-date">Aberto em: 10/04/2025</span>
                    </div>
                  </div>
                  <div className="ticket-actions">
                    <button className="btn btn-sm btn-outline-primary">Ver Detalhes</button>
                  </div>
                </div>
                
                <div className="ticket-item">
                  <div className="ticket-status closed">Resolvido</div>
                  <div className="ticket-content">
                    <h5 className="ticket-title">Solicitação de material técnico</h5>
                    <p className="ticket-description">
                      Preciso do guia técnico atualizado do NIVELA para treinamento da minha equipe.
                    </p>
                    <div className="ticket-meta">
                      <span className="ticket-id">Chamado #1023</span>
                      <span className="ticket-date">Aberto em: 25/03/2025</span>
                      <span className="ticket-resolution">Resolvido em: 26/03/2025</span>
                    </div>
                  </div>
                  <div className="ticket-actions">
                    <button className="btn btn-sm btn-outline-secondary">Ver Detalhes</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'new' && (
            <div className="new-ticket-section">
              <h4 className="mb-4">Abrir Novo Chamado</h4>
              
              <form className="ticket-form">
                <div className="mb-3">
                  <label htmlFor="ticketSubject" className="form-label">Assunto</label>
                  <input type="text" className="form-control" id="ticketSubject" placeholder="Digite um título para seu chamado" />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="ticketCategory" className="form-label">Categoria</label>
                  <select className="form-select" id="ticketCategory">
                    <option value="">Selecione uma categoria</option>
                    <option value="technical">Dúvida Técnica</option>
                    <option value="application">Aplicação do Produto</option>
                    <option value="results">Resultados e Efeitos</option>
                    <option value="materials">Materiais e Documentação</option>
                    <option value="other">Outros</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="ticketPriority" className="form-label">Prioridade</label>
                  <select className="form-select" id="ticketPriority">
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="ticketDescription" className="form-label">Descrição</label>
                  <textarea 
                    className="form-control" 
                    id="ticketDescription" 
                    rows="5"
                    placeholder="Descreva detalhadamente sua dúvida ou problema"
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="ticketAttachment" className="form-label">Anexos (opcional)</label>
                  <input type="file" className="form-control" id="ticketAttachment" multiple />
                  <div className="form-text">Você pode anexar imagens ou documentos relevantes (máx. 5MB por arquivo)</div>
                </div>
                
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-outline-secondary me-2" onClick={() => setActiveTab('tickets')}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Enviar Chamado
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'faq' && (
            <div className="faq-section">
              <h4 className="mb-4">Perguntas Frequentes</h4>
              
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button 
                      className="accordion-button" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#collapseOne" 
                      aria-expanded="true" 
                      aria-controls="collapseOne"
                    >
                      Qual é a diferença entre o NIVELA e outros produtos alisantes?
                    </button>
                  </h2>
                  <div 
                    id="collapseOne" 
                    className="accordion-collapse collapse show" 
                    aria-labelledby="headingOne" 
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        O NIVELA não é um alisante, mas um retexturizador capilar que utiliza a tecnologia patenteada 
                        ASTRO QUAT V3. Diferente dos alisantes tradicionais, o NIVELA não quebra as ligações de dissulfeto 
                        do cabelo, mas reorganiza as fibras capilares de forma inteligente, preservando a integridade e a 
                        saúde dos fios.
                      </p>
                      <p>
                        Além disso, o NIVELA é 100% livre de formol e outros componentes nocivos, oferecendo uma alternativa 
                        segura e eficaz para redução de volume e eliminação do frizz.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#collapseTwo" 
                      aria-expanded="false" 
                      aria-controls="collapseTwo"
                    >
                      Quanto tempo dura o efeito do NIVELA?
                    </button>
                  </h2>
                  <div 
                    id="collapseTwo" 
                    className="accordion-collapse collapse" 
                    aria-labelledby="headingTwo" 
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Os resultados do NIVELA duram em média de 3 a 4 meses, dependendo de alguns fatores como:
                      </p>
                      <ul>
                        <li>Tipo e porosidade do cabelo</li>
                        <li>Frequência de lavagem</li>
                        <li>Produtos utilizados na manutenção</li>
                        <li>Exposição a cloro, água do mar e sol</li>
                      </ul>
                      <p>
                        Para prolongar os resultados, recomendamos o uso da linha de manutenção NIVELA Home Care, 
                        especialmente desenvolvida para potencializar e estender os efeitos do tratamento.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#collapseThree" 
                      aria-expanded="false" 
                      aria-controls="collapseThree"
                    >
                      O NIVELA pode ser aplicado em cabelos com química?
                    </button>
                  </h2>
                  <div 
                    id="collapseThree" 
                    className="accordion-collapse collapse" 
                    aria-labelledby="headingThree" 
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Sim, o NIVELA pode ser aplicado em cabelos com química prévia, como coloração, luzes, mechas, 
                        relaxamento ou alisamento. No entanto, é importante observar algumas recomendações:
                      </p>
                      <ul>
                        <li>Em cabelos descoloridos ou com luzes, recomenda-se realizar um teste de mecha antes da aplicação completa</li>
                        <li>Para cabelos muito danificados, é aconselhável realizar tratamentos de reconstrução antes da aplicação do NIVELA</li>
                        <li>Deve-se respeitar o intervalo mínimo de 15 dias entre processos químicos e a aplicação do NIVELA</li>
                      </ul>
                      <p>
                        Para casos específicos, recomendamos consultar nosso suporte técnico para orientações personalizadas.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#collapseFour" 
                      aria-expanded="false" 
                      aria-controls="collapseFour"
                    >
                      Qual o rendimento do produto NIVELA?
                    </button>
                  </h2>
                  <div 
                    id="collapseFour" 
                    className="accordion-collapse collapse" 
                    aria-labelledby="headingFour" 
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        O rendimento do NIVELA varia de acordo com o comprimento, densidade e porosidade do cabelo:
                      </p>
                      <ul>
                        <li>Cabelos curtos: 30-40g (aproximadamente 6-8 aplicações por embalagem de 250g)</li>
                        <li>Cabelos médios: 40-60g (aproximadamente 4-6 aplicações por embalagem de 250g)</li>
                        <li>Cabelos longos: 60-80g (aproximadamente 3-4 aplicações por embalagem de 250g)</li>
                        <li>Cabelos extra longos ou muito volumosos: 80-100g (aproximadamente 2-3 aplicações por embalagem de 250g)</li>
                      </ul>
                      <p>
                        A textura em gel do NIVELA facilita a aplicação e distribuição uniforme do produto, 
                        otimizando seu rendimento.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#collapseFive" 
                      aria-expanded="false" 
                      aria-controls="collapseFive"
                    >
                      Como devo armazenar o produto NIVELA?
                    </button>
                  </h2>
                  <div 
                    id="collapseFive" 
                    className="accordion-collapse collapse" 
                    aria-labelledby="headingFive" 
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Para garantir a eficácia e durabilidade do NIVELA, siga estas recomendações de armazenamento:
                      </p>
                      <ul>
                        <li>Mantenha o produto em local fresco e seco, protegido da luz solar direta</li>
                        <li>A temperatura ideal de armazenamento é entre 5°C e 25°C</li>
                        <li>Mantenha a embalagem sempre bem fechada após o uso</li>
                        <li>Não armazene o produto em banheiros ou áreas com alta umidade</li>
                        <li>Mantenha fora do alcance de crianças</li>
                      </ul>
                      <p>
                        Quando armazenado corretamente, o NIVELA tem validade de 24 meses fechado e 12 meses após aberto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="contact-channels mt-5">
                <h5>Outros Canais de Atendimento</h5>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <div className="contact-card">
                      <div className="contact-icon">
                        <i className="bi bi-whatsapp"></i>
                      </div>
                      <h6>WhatsApp</h6>
                      <p>(11) 99999-9999</p>
                      <p className="contact-hours">Segunda a Sexta, 9h às 18h</p>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="contact-card">
                      <div className="contact-icon">
                        <i className="bi bi-envelope"></i>
                      </div>
                      <h6>E-mail</h6>
                      <p>suporte@bembeauty.com.br</p>
                      <p className="contact-hours">Resposta em até 24h úteis</p>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="contact-card">
                      <div className="contact-icon">
                        <i className="bi bi-telephone"></i>
                      </div>
                      <h6>Telefone</h6>
                      <p>(11) 3333-3333</p>
                      <p className="contact-hours">Segunda a Sexta, 9h às 18h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
        
        .support-container {
          padding: 0 20px 40px 20px;
        }
        
        .nav-tabs {
          border-bottom: 1px solid #dee2e6;
        }
        
        .nav-tabs .nav-link {
          color: #495057;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 0.5rem 1rem;
          margin-right: 1rem;
          font-weight: 500;
        }
        
        .nav-tabs .nav-link:hover {
          border-color: transparent;
          color: #254C5A;
        }
        
        .nav-tabs .nav-link.active {
          color: #254C5A;
          background-color: transparent;
          border-bottom: 2px solid #254C5A;
        }
        
        .tickets-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .tickets-header h4 {
          margin: 0;
          color: #0D181C;
        }
        
        .tickets-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .ticket-item {
          background-color: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }
        
        .ticket-status {
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
          white-space: nowrap;
        }
        
        .ticket-status.open {
          background-color: #0d6efd;
        }
        
        .ticket-status.in-progress {
          background-color: #fd7e14;
        }
        
        .ticket-status.closed {
          background-color: #198754;
        }
        
        .ticket-content {
          flex: 1;
        }
        
        .ticket-title {
          margin: 0 0 10px 0;
          color: #0D181C;
          font-size: 1.1rem;
        }
        
        .ticket-description {
          color: #495057;
          margin-bottom: 10px;
          font-size: 0.95rem;
        }
        
        .ticket-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          font-size: 0.85rem;
          color: #A6B8C1;
        }
        
        .ticket-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .new-ticket-section {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        .new-ticket-section h4 {
          color: #0D181C;
        }
        
        .ticket-form label {
          color: #0D181C;
          font-weight: 500;
        }
        
        .form-control, .form-select {
          border-color: #ced4da;
          padding: 0.5rem 0.75rem;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #254C5A;
          box-shadow: 0 0 0 0.25rem rgba(37, 76, 90, 0.25);
        }
        
        .form-text {
          color: #A6B8C1;
          font-size: 0.85rem;
          margin-top: 5px;
        }
        
        .faq-section h4 {
          color: #0D181C;
        }
        
        .accordion-item {
          border-color: #e9ecef;
          margin-bottom: 10px;
        }
        
        .accordion-button {
          padding: 1rem 1.25rem;
          font-weight: 600;
          color: #0D181C;
        }
        
        .accordion-button:not(.collapsed) {
          color: #254C5A;
          background-color: rgba(37, 76, 90, 0.05);
        }
        
        .accordion-button:focus {
          border-color: #254C5A;
          box-shadow: 0 0 0 0.25rem rgba(37, 76, 90, 0.25);
        }
        
        .accordion-body {
          padding: 1rem 1.25rem;
          color: #495057;
        }
        
        .accordion-body p {
          margin-bottom: 15px;
        }
        
        .accordion-body p:last-child {
          margin-bottom: 0;
        }
        
        .accordion-body ul {
          padding-left: 20px;
          margin-bottom: 15px;
        }
        
        .accordion-body li {
          margin-bottom: 5px;
        }
        
        .contact-channels h5 {
          color: #0D181C;
          margin-bottom: 15px;
        }
        
        .contact-card {
          background-color: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          text-align: center;
          height: 100%;
        }
        
        .contact-icon {
          font-size: 2rem;
          color: #254C5A;
          margin-bottom: 15px;
        }
        
        .contact-card h6 {
          color: #0D181C;
          margin-bottom: 10px;
          font-weight: 600;
        }
        
        .contact-card p {
          margin: 0 0 5px 0;
          color: #495057;
        }
        
        .contact-hours {
          font-size: 0.85rem;
          color: #A6B8C1;
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
