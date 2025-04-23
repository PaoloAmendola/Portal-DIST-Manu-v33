import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCurrentUser, fetchProducts, createOrder } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Operations() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('products');
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
        
        // Fetch products
        await fetchProductData();
      } catch (error) {
        console.error('Error checking user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, [router]);

  const fetchProductData = async () => {
    try {
      const { data, error } = await fetchProducts();
      if (!error) {
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity } 
        : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    try {
      setLoading(true);
      
      const orderData = {
        user_id: user.id,
        total_amount: calculateTotal(),
        status: 'pendente',
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price
        }))
      };
      
      const { data, error } = await createOrder(orderData);
      
      if (error) throw error;
      
      alert('Pedido realizado com sucesso!');
      setCart([]);
      setActiveTab('products');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erro ao realizar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container">Carregando...</div>;
  }

  return (
    <div className="wrapper">
      <Sidebar activePage="operations" user={user} />
      
      <div id="content">
        <Navbar user={user} />
        
        <div className="page-header">
          <h1>Operações</h1>
          <p>Gerencie seus pedidos, estoque e operações comerciais.</p>
        </div>
        
        <div className="operations-container">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                Produtos
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'cart' ? 'active' : ''}`}
                onClick={() => setActiveTab('cart')}
              >
                Carrinho <span className="badge bg-accent ms-2">{cart.length}</span>
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Meus Pedidos
              </button>
            </li>
          </ul>
          
          {activeTab === 'products' && (
            <div className="products-section">
              <div className="row">
                {products.map(product => (
                  <div key={product.id} className="col-md-4 mb-4">
                    <div className="product-card">
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
                        <h5>{product.name}</h5>
                        <p className="product-description">{product.description}</p>
                        <div className="product-price">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="product-stock">
                          {product.stock_quantity > 0 ? (
                            <span className="text-success">Em estoque: {product.stock_quantity}</span>
                          ) : (
                            <span className="text-danger">Fora de estoque</span>
                          )}
                        </div>
                        <button 
                          className="btn btn-primary mt-3"
                          onClick={() => addToCart(product)}
                          disabled={product.stock_quantity <= 0}
                        >
                          <i className="bi bi-cart-plus"></i> Adicionar ao Carrinho
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'cart' && (
            <div className="cart-section">
              {cart.length > 0 ? (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-image">
                          {item.image_path ? (
                            <img src={item.image_path} alt={item.name} />
                          ) : (
                            <div className="placeholder-image">
                              <i className="bi bi-box"></i>
                            </div>
                          )}
                        </div>
                        <div className="cart-item-details">
                          <h5>{item.name}</h5>
                          <p className="item-price">
                            R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="cart-item-quantity">
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                        <div className="cart-item-subtotal">
                          R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="cart-item-remove">
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="cart-summary">
                    <div className="cart-total">
                      <span>Total:</span>
                      <span>R$ {calculateTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <button 
                      className="btn btn-primary btn-lg"
                      onClick={handleCheckout}
                    >
                      Finalizar Pedido
                    </button>
                  </div>
                </>
              ) : (
                <div className="empty-cart">
                  <i className="bi bi-cart"></i>
                  <p>Seu carrinho está vazio.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveTab('products')}
                  >
                    Ver Produtos
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="orders-section">
              <div className="alert alert-info">
                <i className="bi bi-info-circle"></i> A seção de pedidos será implementada em breve.
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
        
        .operations-container {
          padding: 0 20px;
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
        
        .badge.bg-accent {
          background-color: #9D4916;
        }
        
        .product-card {
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .product-image {
          height: 200px;
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
          font-size: 3rem;
        }
        
        .product-details {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .product-details h5 {
          margin: 0 0 10px 0;
          color: #0D181C;
        }
        
        .product-description {
          color: #495057;
          font-size: 0.9rem;
          margin-bottom: 15px;
          flex: 1;
        }
        
        .product-price {
          font-size: 1.2rem;
          font-weight: 700;
          color: #254C5A;
          margin-bottom: 5px;
        }
        
        .product-stock {
          font-size: 0.85rem;
          margin-bottom: 15px;
        }
        
        .cart-items {
          margin-bottom: 30px;
        }
        
        .cart-item {
          display: flex;
          align-items: center;
          background-color: white;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 15px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .cart-item-image {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          background-color: #f5f7fa;
          margin-right: 20px;
        }
        
        .cart-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .cart-item-details {
          flex: 1;
        }
        
        .cart-item-details h5 {
          margin: 0 0 5px 0;
          font-size: 1rem;
        }
        
        .item-price {
          color: #9D4916;
          font-weight: 600;
          margin: 0;
        }
        
        .cart-item-quantity {
          display: flex;
          align-items: center;
          margin: 0 20px;
        }
        
        .cart-item-quantity .quantity {
          width: 40px;
          text-align: center;
          font-weight: 600;
        }
        
        .cart-item-subtotal {
          font-weight: 700;
          color: #254C5A;
          margin-right: 20px;
          min-width: 100px;
          text-align: right;
        }
        
        .cart-summary {
          background-color: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .cart-total {
          font-size: 1.2rem;
          font-weight: 700;
        }
        
        .cart-total span:last-child {
          color: #254C5A;
          margin-left: 10px;
        }
        
        .empty-cart {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0;
          color: #A6B8C1;
        }
        
        .empty-cart i {
          font-size: 4rem;
          margin-bottom: 20px;
        }
        
        .empty-cart p {
          font-size: 1.2rem;
          margin-bottom: 20px;
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
