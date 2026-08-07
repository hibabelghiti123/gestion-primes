import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllDirections, deleteDirection } from '../api/directionService';

function Directions() {
  const [directions, setDirections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadDirections = () => {
    getAllDirections()
      .then((res) => {
        setDirections(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors de la récupération des directions');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadDirections();
  }, []);

  const handleDelete = async (id, nom) => {
    if (!window.confirm(`Supprimer la direction "${nom}" ?`)) return;
    try {
      await deleteDirection(id);
      loadDirections();
    } catch (err) {
      alert('Impossible de supprimer cette direction (des agents y sont peut-être rattachés).');
    }
  };

  if (loading) return <div className="state-box">Chargement des directions...</div>;
  if (error) return <div className="state-box error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Directions</h1>
          <p>Organisation des directions et de leurs villes</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span className="badge-count">{directions.length} direction{directions.length > 1 ? 's' : ''}</span>
          <Link to="/directions/new" className="btn-add">+ Ajouter une direction</Link>
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nom de la direction</th>
              <th>Ville</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {directions.map((d) => (
              <tr key={d.id}>
                <td>{d.nomDirection}</td>
                <td><span className="pill green">{d.ville}</span></td>
                <td>
                  <div className="table-actions">
                    <button className="btn-secondary" onClick={() => navigate(`/directions/${d.id}/edit`)}>
                      Modifier
                    </button>
                    <button className="btn-danger" onClick={() => handleDelete(d.id, d.nomDirection)}>
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

export default Directions;