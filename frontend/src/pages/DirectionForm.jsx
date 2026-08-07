import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDirectionById, createDirection, updateDirection } from '../api/directionService';

function DirectionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ nomDirection: '', ville: '' });
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      getDirectionById(id)
        .then((res) => {
          setForm({
            nomDirection: res.data.nomDirection || '',
            ville: res.data.ville || '',
          });
          setLoading(false);
        })
        .catch(() => {
          setError('Impossible de charger cette direction');
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (isEdit) {
        await updateDirection(id, form);
      } else {
        await createDirection(form);
      }
      navigate('/directions');
    } catch (err) {
      setError("Erreur lors de l'enregistrement.");
      setSaving(false);
    }
  };

  if (loading) return <div className="state-box">Chargement...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{isEdit ? 'Modifier la direction' : 'Nouvelle direction'}</h1>
          <p>{isEdit ? 'Mettez à jour les informations' : "Renseignez les informations de la direction"}</p>
        </div>
      </div>

      {error && <div className="state-box error" style={{ margin: '0 0 20px' }}>{error}</div>}

      <form onSubmit={handleSubmit} className="table-card" style={{ padding: '28px' }}>
        <div className="form-grid">
          <div className="form-field">
            <label>Nom de la direction</label>
            <input name="nomDirection" value={form.nomDirection} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Ville</label>
            <input name="ville" value={form.ville} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/directions')}>
            Annuler
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Enregistrement...' : isEdit ? 'Enregistrer' : 'Créer la direction'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DirectionForm;