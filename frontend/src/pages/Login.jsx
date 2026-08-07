import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(email, motDePasse);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', res.data.email);
      localStorage.setItem('role', res.data.role);
      navigate('/');
    } catch (err) {
      setError('Email ou mot de passe incorrect');
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <form onSubmit={handleSubmit} className="table-card" style={{ padding: 32, width: 360 }}>
        <h2 style={{ marginBottom: 4 }}>Connexion</h2>
        <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 24 }}>
          Accédez à Gestion des Primes
        </p>

        {error && <div className="state-box error" style={{ marginBottom: 16 }}>{error}</div>}

        <div className="form-field" style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-field" style={{ marginBottom: 24 }}>
          <label>Mot de passe</label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}

export default Login;