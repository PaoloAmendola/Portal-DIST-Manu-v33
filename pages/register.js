import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signUp } from '../lib/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp(email, password, {
        full_name: fullName,
        company_name: companyName
      });
      
      if (error) throw error;
      
      // Show success message and redirect to login
      alert('Registro realizado com sucesso! Verifique seu email para confirmar sua conta.');
      router.push('/login');
    } catch (error) {
      console.error('Error registering:', error);
      setError(error.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Bem Beauty Professional</h2>
          <h4>Cadastro de Distribuidor</h4>
        </div>
        
        <form onSubmit={handleRegister}>
          {error && <div className="alert alert-danger">{error}</div>}
          
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Nome Completo</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="companyName" className="form-label">Nome da Empresa</label>
            <input
              type="text"
              className="form-control"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Senha</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          
          <div className="d-grid gap-2">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
          
          <div className="mt-3 text-center">
            <p>Já possui uma conta? <Link href="/login" className="text-decoration-none">Faça login</Link></p>
          </div>
        </form>
      </div>
      
      <style jsx>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f7fa;
        }
        
        .register-card {
          width: 100%;
          max-width: 500px;
          padding: 2rem;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        .register-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .register-header h2 {
          color: #254C5A;
          margin-bottom: 0.5rem;
        }
        
        .register-header h4 {
          color: #9D4916;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
