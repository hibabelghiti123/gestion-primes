import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <span className="brand">Gestion des Primes</span>
      <Link to="/">Accueil</Link>
      <Link to="/agents">Agents</Link>
      <Link to="/directions">Directions</Link>
      <Link to="/evaluations">Évaluations</Link>
      <Link to="/primes">Primes</Link>
    </nav>
  );
}

export default Navbar;