import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvaluations } from '../api/evaluationService';

function Evaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllEvaluations()
      .then((res) => {
        setEvaluations(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors de la récupération des évaluations');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="state-box">Chargement des évaluations...</div>;
  if (error) return <div className="state-box error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Évaluations</h1>
          <p>Notes attribuées par les agents supérieurs</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span className="badge-count">{evaluations.length} évaluation{evaluations.length > 1 ? 's' : ''}</span>
          <Link to="/evaluations/new" className="btn-add">+ Nouvelle évaluation</Link>
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Note</th>
              <th>Commentaire</th>
              <th>Évaluateur</th>
              <th>Évalué</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((e) => (
              <tr key={e.id}>
                <td>{e.dateEvaluation}</td>
                <td><span className="pill blue">{e.note}/250</span></td>
                <td>{e.commentaire}</td>
                <td>{e.evaluateur?.nom ? `${e.evaluateur.prenom} ${e.evaluateur.nom}` : `#${e.evaluateur?.id}`}</td>
                <td>{e.evalue?.nom ? `${e.evalue.prenom} ${e.evalue.nom}` : `#${e.evalue?.id}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Evaluations;