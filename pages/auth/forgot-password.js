import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { resetPassword } from '../../lib/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await resetPassword(email);
      
      if (error) throw error;
      
      setSuccess(true);
    } catch (error) {
      console.error('Error resetting password:', error);
      setError(error.message || 'Erro ao enviar email de recuperação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <h2>Bem Beauty Professional</h2>
          <h4>Recuperação de Senha</h4>
        </div>
        
        {success ? (
          <div className="success-message">
            <div className="alert alert-success">
              Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.
            </div>
            <div className="d-grid gap-2 mt-4">
              <Link href="/login" className="btn btn-primary">
                Voltar para Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetPassword}>
            {error && <div className="alert alert-danger">{error}</div>}
            
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
            
            <div className="d-grid gap-2">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Email de Recuperação'}
              </button>
            </div>
            
            <div className="mt-3 text-center">
              <Link href="/login" className="text-decoration-none">
                Voltar para Login
              </Link>
            </div>
          </form>
        )}
      </div>
      
      <style jsx>{`
        .forgot-password-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f7fa;
        }
        
        .forgot-password-card {
          width: 100%;
          max-width: 450px;
          padding: 2rem;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        .forgot-password-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .forgot-password-header h2 {
          color: #254C5A;
          margin-bottom: 0.5rem;
        }
        
        .forgot-password-header h4 {
          color: #9D4916;
          font-weight: 500;
        }
        
        .success-message {
          text-align: center;
        }
      `}</style>
    </div>
  );
}
