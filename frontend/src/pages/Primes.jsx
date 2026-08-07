import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPrimesRendement, calculerPrimeFinale } from '../api/primeService';
import { getAllAgents } from '../api/agentService';

function Primes() {
  const [primes, setPrimes] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultats, setResultats] = useState({});

  const loadData = () => {
    Promise.all([getAllPrimesRendement(), getAllAgents()])
      .then(([primesRes, agentsRes]) => {
        setPrimes(primesRes.data);
        setAgents(agentsRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors de la récupération des données');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const getAgentInfo = (prime) => {
    const agentId = prime.agent?.id;
    const agent = agents.find((a) => a.id === agentId);
    return agent ? `${agent.prenom} ${agent.nom}` : `#${agentId ?? '?'}`;
  };

  const handleCalculer = async (primeId, agentId) => {
    try {
      const res = await calculerPrimeFinale(primeId, agentId);
      setResultats((prev) => ({ ...prev, [primeId]: res.data }));
    } catch (err) {
      alert("Erreur lors du calcul (l'agent a-t-il bien reçu une évaluation ?)");
    }
  };

  if (loading) return <div className="state-box">Chargement des primes...</div>;
  if (error) return <div className="state-box error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Primes de rendement</h1>
          <p>Calcul automatique basé sur les évaluations</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span className="badge-count">{primes.length} prime{primes.length > 1 ? 's' : ''}</span>
          <Link to="/primes/new" className="btn-add">+ Nouvelle prime</Link>
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Année</th>
              <th>Salaire brut mensuel</th>
              <th>Mois service</th>
              <th>Prime finale</th>
            </tr>
          </thead>
          <tbody>
            {primes.map((p) => (
              <tr key={p.id}>
                <td>{getAgentInfo(p)}</td>
                <td>{p.annee}</td>
                <td>{p.salaireBrutMensuel} DH</td>
                <td>{p.nbMoisService}</td>
                <td>
                  {resultats[p.id] !== undefined ? (
                    <span className="pill green">{resultats[p.id].toFixed(2)} DH</span>
                  ) : (
                    <button className="btn-secondary" onClick={() => handleCalculer(p.id, p.agent?.id)}>
                      Calculer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Primes;