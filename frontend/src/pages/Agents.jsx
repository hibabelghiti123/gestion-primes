import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllAgents, deleteAgent } from '../api/agentService';

function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadAgents = () => {
    getAllAgents()
      .then((res) => {
        setAgents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur lors de la récupération des agents');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadAgents();
  }, []);

  const handleDelete = async (id, nom) => {
    if (!window.confirm(`Supprimer l'agent ${nom} ? Cette action est irréversible.`)) return;
    try {
      await deleteAgent(id);
      loadAgents();
    } catch (err) {
      alert("Impossible de supprimer cet agent (des données liées existent peut-être).");
    }
  };

  if (loading) return <div className="state-box">Chargement des agents...</div>;
  if (error) return <div className="state-box error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Agents</h1>
          <p>Liste des agents de l'administration</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span className="badge-count">{agents.length} agent{agents.length > 1 ? 's' : ''}</span>
          <Link to="/agents/new" className="btn-add">+ Ajouter un agent</Link>
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Fonction</th>
              <th>Banque</th>
              <th>RIB</th>
              <th>Lieu d'affectation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id}>
                <td onClick={() => navigate(`/agents/${agent.id}`)} style={{ cursor: 'pointer' }}>
                  <span className="pill blue">{agent.matricule}</span>
                </td>
                <td>{agent.nom}</td>
                <td>{agent.prenom}</td>
                <td>{agent.fonction}</td>
                <td>{agent.compteBancaire?.nomBanque || '—'}</td>
                <td>{agent.compteBancaire?.rib || '—'}</td>
                <td>{agent.lieuAffectation}</td>
                <td>
                  <div className="table-actions">
                    <button className="btn-secondary" onClick={() => navigate(`/agents/${agent.id}/edit`)}>
                      Modifier
                    </button>
                    <button className="btn-danger" onClick={() => handleDelete(agent.id, `${agent.prenom} ${agent.nom}`)}>
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Agents;