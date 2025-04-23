import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getCurrentUser, signOut, fetchUserMetrics, fetchTopProducts, fetchAnnouncements, fetchSalesData } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MetricCard from '../components/MetricCard';
import SalesChart from '../components/SalesChart';
import ProductList from '../components/ProductList';
import AnnouncementList from '../components/AnnouncementList';
import QuickAccess from '../components/QuickAccess';
import UpcomingEvent from '../components/UpcomingEvent';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [chartPeriod, setChartPeriod] = useState('month');
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { user, error } = await getCurrentUser();
        
        if (error || !user) {
          router.push('/login');
          return;
        }
        
        setUser(user);
        
        // Fetch dashboard data
        await fetchDashboardData(user.id);
      } catch (error) {
        console.error('Error checking user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, [router]);

  const fetchDashboardData = async (userId) => {
    try {
      // Fetch user metrics
      const { data: metricsData, error: metricsError } = await fetchUserMetrics(userId);
      if (!metricsError) {
        setMetrics(metricsData);
      }
      
      // Fetch top products
      const { data: productsData, error: productsError } = await fetchTopProducts(4);
      if (!productsError) {
        setTopProducts(productsData || []);
      }
      
      // Fetch announcements
      const { data: announcementsData, error: announcementsError } = await fetchAnnouncements(3);
      if (!announcementsError) {
        setAnnouncements(announcementsData || []);
      }
      
      // Fetch sales data
      const { data: salesData, error: salesError } = await fetchSalesData(userId, chartPeriod);
      if (!salesError) {
        setSalesData(salesData || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleChartPeriodChange = async (period) => {
    setChartPeriod(period);
    try {
      const { data, error } = await fetchSalesData(user.id, period);
      if (!error) {
        setSalesData(data || []);
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div className="loading-container">Carregando...</div>;
  }

  return (
    <div className="wrapper">
      <Sidebar activePage="dashboard" user={user} />
      
      <div id="content">
        <Navbar user={user} onLogout={handleLogout} />
        
        <div className="dashboard-welcome">
          <h1>Olá, {user?.user_metadata?.full_name || 'Distribuidor'}!</h1>
          <p>Bem-vindo ao seu portal exclusivo de distribuidor. Aqui está o que está acontecendo hoje.</p>
        </div>
        
        <div className="dashboard-widgets">
          <div className="row">
            <div className="col-md-3">
              <MetricCard 
                title="Vendas do Mês" 
                value={`R$ ${metrics?.monthly_sales?.toLocaleString('pt-BR') || '0'}`}
                change={15.3}
                changeType="positive"
              />
            </div>
            <div className="col-md-3">
              <MetricCard 
                title="Novos Clientes" 
                value={metrics?.new_customers || '0'}
                change={8.7}
                changeType="positive"
              />
            </div>
            <div className="col-md-3">
              <MetricCard 
                title="Taxa de Conversão" 
                value={`${metrics?.conversion_rate || '0'}%`}
                change={3.2}
                changeType="positive"
              />
            </div>
            <div className="col-md-3">
              <MetricCard 
                title="Pedidos Pendentes" 
                value={metrics?.pending_orders || '0'}
                change={0}
                changeType="neutral"
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Desempenho de Vendas</h5>
                  <div className="btn-group">
                    <button 
                      type="button" 
                      className={`btn btn-sm btn-outline-primary ${chartPeriod === 'month' ? 'active' : ''}`}
                      onClick={() => handleChartPeriodChange('month')}
                    >
                      Mês
                    </button>
                    <button 
                      type="button" 
                      className={`btn btn-sm btn-outline-primary ${chartPeriod === 'quarter' ? 'active' : ''}`}
                      onClick={() => handleChartPeriodChange('quarter')}
                    >
                      Trimestre
                    </button>
                    <button 
                      type="button" 
                      className={`btn btn-sm btn-outline-primary ${chartPeriod === 'year' ? 'active' : ''}`}
                      onClick={() => handleChartPeriodChange('year')}
                    >
                      Ano
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <SalesChart data={salesData} period={chartPeriod} />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <ProductList products={topProducts} />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <AnnouncementList announcements={announcements} />
            </div>
            <div className="col-md-6">
              <QuickAccess />
              
              <div className="card mt-4">
                <div className="card-header">
                  <h5 className="mb-0">Próximo Evento</h5>
                </div>
                <div className="card-body">
                  <UpcomingEvent 
                    title="Convenção Anual de Distribuidores 2025"
                    date="2025-05-15"
                    location="Centro de Convenções, São Paulo"
                    time="09:00 - 18:00"
                  />
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
        
        .dashboard-welcome {
          padding: 0 20px 20px 20px;
        }
        
        .dashboard-welcome h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #0D181C;
          margin-bottom: 5px;
        }
        
        .dashboard-welcome p {
          color: #A6B8C1;
          font-size: 1.1rem;
        }
        
        .dashboard-widgets {
          padding: 0 20px;
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
