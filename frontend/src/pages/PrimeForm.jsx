import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAgents } from '../api/agentService';
import { createPrimeRendement } from '../api/primeService';

function PrimeForm() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({
    annee: new Date().getFullYear(),
    salaireBrutMensuel: '',
    nbMoisTravail: 12,
    nbMoisService: '',
    agentId: '',
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
    setSaving(true);
    setError(null);
    try {
      await createPrimeRendement({
        annee: parseInt(form.annee),
        salaireBrutMensuel: parseFloat(form.salaireBrutMensuel),
        nbMoisTravail: parseInt(form.nbMoisTravail),
        nbMoisService: parseInt(form.nbMoisService),
        coefficientGlobalApplique: 0,
        agent: { id: parseInt(form.agentId) },
      });
      navigate('/primes');
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
          <h1>Nouvelle prime de rendement</h1>
          <p>Créez un enregistrement de prime pour un agent</p>
        </div>
      </div>

      {error && <div className="state-box error" style={{ margin: '0 0 20px' }}>{error}</div>}

      <form onSubmit={handleSubmit} className="table-card" style={{ padding: '28px' }}>
        <div className="form-grid">
          <div className="form-field">
            <label>Agent</label>
            <select name="agentId" value={form.agentId} onChange={handleChange} required>
              <option value="">-- Sélectionner --</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.prenom} {a.nom} — {a.fonction}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label>Année</label>
            <input type="number" name="annee" value={form.annee} onChange={handleChange} required />
          </div>

          <div className="form-field">
            <label>Salaire brut mensuel</label>
            <input type="number" step="0.01" name="salaireBrutMensuel" value={form.salaireBrutMensuel} onChange={handleChange} required />
          </div>

          <div className="form-field">
            <label>Nombre de mois travaillés</label>
            <input type="number" min="0" max="12" name="nbMoisTravail" value={form.nbMoisTravail} onChange={handleChange} required />
          </div>

          <div className="form-field">
            <label>Nombre de mois de service</label>
            <input type="number" min="0" name="nbMoisService" value={form.nbMoisService} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/primes')}>
            Annuler
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Enregistrement...' : 'Créer la prime'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PrimeForm;