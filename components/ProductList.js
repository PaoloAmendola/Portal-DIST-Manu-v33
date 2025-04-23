import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Produtos Mais Vendidos</h5>
      </div>
      <div className="card-body">
        {products && products.length > 0 ? (
          <div className="product-list">
            {products.map((product, index) => (
              <div key={product.id} className="product-item">
                <div className="product-info">
                  <div className="product-image">
                    {product.image_path ? (
                      <img src={product.image_path} alt={product.name} />
                    ) : (
                      <div className="placeholder-image">
                        <i className="bi bi-box"></i>
                      </div>
                    )}
                  </div>
                  <div className="product-details">
                    <h6>{product.name}</h6>
                    <p className="price">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>
                <div className="product-sales">
                  <div className="progress">
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ width: `${Math.min(100, (product.sales_count / 100) * 100)}%` }}
                      aria-valuenow={product.sales_count} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="sales-count">{product.sales_count} vendas</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data-message">
            <i className="bi bi-box-seam"></i>
            <p>Nenhum produto encontrado.</p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .product-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .product-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .product-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .product-image {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          overflow: hidden;
          background-color: #f5f7fa;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .placeholder-image {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #A6B8C1;
          font-size: 1.5rem;
        }
        
        .product-details {
          flex: 1;
        }
        
        .product-details h6 {
          margin: 0;
          font-size: 0.95rem;
          color: #0D181C;
        }
        
        .product-details .price {
          margin: 0;
          font-size: 0.85rem;
          color: #9D4916;
          font-weight: 600;
        }
        
        .product-sales {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .progress {
          height: 6px;
          background-color: #f5f7fa;
        }
        
        .progress-bar {
          background-color: #254C5A;
        }
        
        .sales-count {
          font-size: 0.75rem;
          color: #A6B8C1;
          text-align: right;
        }
        
        .no-data-message {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 30px 0;
          color: #A6B8C1;
        }
        
        .no-data-message i {
          font-size: 2rem;
          margin-bottom: 10px;
        }
        
        .no-data-message p {
          font-size: 0.9rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default ProductList;
