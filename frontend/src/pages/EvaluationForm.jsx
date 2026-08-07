import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAgents } from '../api/agentService';
import { createEvaluation } from '../api/evaluationService';

function EvaluationForm() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({
    dateEvaluation: new Date().toISOString().split('T')[0],
    note: '',
    commentaire: '',
    evaluateurId: '',
    evalueId: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAllAgents()
      .then((res) => {
        setAgents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Impossible de charger la liste des agents');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.evaluateurId === form.evalueId) {
      setError("L'évaluateur et l'agent évalué doivent être différents.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await createEvaluation({
        dateEvaluation: form.dateEvaluation,
        note: parseFloat(form.note),
        commentaire: form.commentaire,
        evaluateur: { id: parseInt(form.evaluateurId) },
        evalue: { id: parseInt(form.evalueId) },
      });
      navigate('/evaluations');
    } catch (err) {
      setError("Erreur lors de l'enregistrement de l'évaluation.");
      setSaving(false);
    }
  };

  if (loading) return <div className="state-box">Chargement...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Nouvelle évaluation</h1>
          <p>Un agent supérieur évalue un agent</p>
        </div>
      </div>

      {error && <div className="state-box error" style={{ margin: '0 0 20px' }}>{error}</div>}

      <form onSubmit={handleSubmit} className="table-card" style={{ padding: '28px' }}>
        <div className="form-grid">
          <div className="form-field">
            <label>Évaluateur (agent supérieur)</label>
            <select name="evaluateurId" value={form.evaluateurId} onChange={handleChange} required>
              <option value="">-- Sélectionner --</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.prenom} {a.nom} — {a.fonction}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label>Agent évalué</label>
            <select name="evalueId" value={form.evalueId} onChange={handleChange} required>
              <option value="">-- Sélectionner --</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.prenom} {a.nom} — {a.fonction}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label>Date de l'évaluation</label>
            <input type="date" name="dateEvaluation" value={form.dateEvaluation} onChange={handleChange} required />
          </div>

          <div className="form-field">
            <label>Note (sur 250)</label>
            <input type="number" min="0" max="250" step="0.1" name="note" value={form.note} onChange={handleChange} required />
          </div>

          <div className="form-field" style={{ gridColumn: '1 / -1' }}>
            <label>Commentaire</label>
            <input name="commentaire" value={form.commentaire} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/evaluations')}>
            Annuler
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Enregistrement...' : "Créer l'évaluation"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EvaluationForm;         