import Navbar from './components/Navbar';
import Agents from './pages/Agents';
import Directions from './pages/Directions';
import Evaluations from './pages/Evaluations';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AgentDetail from './pages/AgentDetail';
import Primes from './pages/Primes';
import AgentForm from './pages/AgentForm';
import DirectionForm from './pages/DirectionForm';
import EvaluationForm from './pages/EvaluationForm';
import PrimeForm from './pages/PrimeForm';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function Home() {
  return (
    <div className="hero">
      <span className="hero-eyebrow">Administration · RH</span>
      <h1>Gestion des primes,<br />simplifiée et transparente.</h1>
      <p>
        Suivez les agents, leurs évaluations et le calcul automatique
        des primes de rendement en un seul endroit.
      </p>

      <div className="card-grid">
        <Link to="/agents" className="nav-card agents">
          <div className="icon">👤</div>
          <h3>Agents</h3>
          <p>Consultez et gérez la liste des agents de l'administration.</p>
        </Link>

        <Link to="/directions" className="nav-card directions">
          <div className="icon">🏛️</div>
          <h3>Directions</h3>
          <p>Organisez les directions et leurs départements.</p>
        </Link>

        <Link to="/evaluations" className="nav-card evaluations">
          <div className="icon">📊</div>
          <h3>Évaluations</h3>
          <p>Suivez les évaluations et leur impact sur les primes.</p>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/agents" element={<PrivateRoute><Agents /></PrivateRoute>} />
        <Route path="/agents/new" element={<PrivateRoute><AgentForm /></PrivateRoute>} />
        <Route path="/agents/:id/edit" element={<PrivateRoute><AgentForm /></PrivateRoute>} />
        <Route path="/agents/:id" element={<PrivateRoute><AgentDetail /></PrivateRoute>} />
        <Route path="/directions" element={<PrivateRoute><Directions /></PrivateRoute>} />
        <Route path="/directions/new" element={<PrivateRoute><DirectionForm /></PrivateRoute>} />
        <Route path="/directions/:id/edit" element={<PrivateRoute><DirectionForm /></PrivateRoute>} />
        <Route path="/evaluations" element={<PrivateRoute><Evaluations /></PrivateRoute>} />
        <Route path="/evaluations/new" element={<PrivateRoute><EvaluationForm /></PrivateRoute>} />
        <Route path="/primes" element={<PrivateRoute><Primes /></PrivateRoute>} />
        <Route path="/primes/new" element={<PrivateRoute><PrimeForm /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;