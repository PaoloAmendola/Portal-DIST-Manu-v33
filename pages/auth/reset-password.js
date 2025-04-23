import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { updatePassword } from '../../lib/supabase';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (e) => {
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
      const { data, error } = await updatePassword(password);
      
      if (error) throw error;
      
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      console.error('Error updating password:', error);
      setError(error.message || 'Erro ao atualizar senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <div className="reset-password-header">
          <h2>Bem Beauty Professional</h2>
          <h4>Redefinição de Senha</h4>
        </div>
        
        {success ? (
          <div className="success-message">
            <div className="alert alert-success">
              Senha atualizada com sucesso! Você será redirecionado para a página de login.
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdatePassword}>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Nova Senha</label>
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
              <label htmlFor="confirmPassword" className="form-label">Confirmar Nova Senha</label>
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
                {loading ? 'Atualizando...' : 'Atualizar Senha'}
              </button>
            </div>
          </form>
        )}
      </div>
      
      <style jsx>{`
        .reset-password-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f7fa;
        }
        
        .reset-password-card {
          width: 100%;
          max-width: 450px;
          padding: 2rem;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        .reset-password-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .reset-password-header h2 {
          color: #254C5A;
          margin-bottom: 0.5rem;
        }
        
        .reset-password-header h4 {
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
