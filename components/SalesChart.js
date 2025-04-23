import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const SalesChart = ({ data, period }) => {
  // Format data for chart
  const chartData = {
    labels: data?.map(item => {
      const date = new Date(item.date);
      if (period === 'month') {
        return date.toLocaleDateString('pt-BR', { day: '2-digit' });
      } else if (period === 'quarter') {
        return date.toLocaleDateString('pt-BR', { month: 'short', day: '2-digit' });
      } else {
        return date.toLocaleDateString('pt-BR', { month: 'short' });
      }
    }) || [],
    datasets: [
      {
        label: 'Vendas 2025',
        data: data?.map(item => item.amount) || [],
        backgroundColor: 'rgba(37, 76, 90, 0.1)', // AZUL PROFUNDO with opacity
        borderColor: '#254C5A', // AZUL PROFUNDO
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#254C5A',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: '#0D181C', // PRETO
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': R$ ' + context.raw.toLocaleString('pt-BR');
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return 'R$ ' + value.toLocaleString('pt-BR');
          }
        }
      }
    }
  };

  return (
    <div className="sales-chart-container">
      {data && data.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="no-data-message">
          <i className="bi bi-bar-chart"></i>
          <p>Sem dados de vendas disponíveis para o período selecionado.</p>
        </div>
      )}
      
      <style jsx>{`
        .sales-chart-container {
          height: 300px;
          position: relative;
        }
        
        .no-data-message {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: #A6B8C1;
        }
        
        .no-data-message i {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .no-data-message p {
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default SalesChart;
