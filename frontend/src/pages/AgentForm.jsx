import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAgentById, createAgent, updateAgent } from '../api/agentService';

const COMPTE_API = 'http://localhost:8080/api/comptes-bancaires';

function AgentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    matricule: '',
    cin: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    sexe: 'M',
    situationFamiliale: '',
    datePriseService: '',
    lieuAffectation: '',
    fonction: '',
    nbEnfants: 0,
    nomBanque: '',
    rib: '',
  });
  const [compteId, setCompteId] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      getAgentById(id)
        .then((res) => {
          setForm({
            matricule: res.data.matricule || '',
            cin: res.data.cin || '',
            nom: res.data.nom || '',
            prenom: res.data.prenom || '',
            dateNaissance: res.data.dateNaissance || '',
            sexe: res.data.sexe || 'M',
            situationFamiliale: res.data.situationFamiliale || '',
            datePriseService: res.data.datePriseService || '',
            lieuAffectation: res.data.lieuAffectation || '',
            fonction: res.data.fonction || '',
            nbEnfants: res.data.nbEnfants ?? 0,
            nomBanque: res.data.compteBancaire?.nomBanque || '',
            rib: res.data.compteBancaire?.rib || '',
          });
          if (res.data.compteBancaire) {
            setCompteId(res.data.compteBancaire.id);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError('Impossible de charger cet agent');
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveCompteBancaire = async (agentId) => {
    if (!form.nomBanque && !form.rib) return; // rien à enregistrer

    const payload = { nomBanque: form.nomBanque, rib: form.rib };
    const url = compteId ? `${COMPTE_API}/${compteId}` : `${COMPTE_API}/agent/${agentId}`;
    const method = compteId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      let agentId = id;
      if (isEdit) {
        await updateAgent(id, form);
      } else {
        const res = await createAgent(form);
        agentId = res.data.id;
      }
      await saveCompteBancaire(agentId);
      navigate('/agents');
    } catch (err) {
      setError("Erreur lors de l'enregistrement. Vérifiez les champs (matricule/CIN uniques).");
      setSaving(false);
    }
  };

  if (loading) return <div className="state-box">Chargement...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{isEdit ? "Modifier l'agent" : 'Nouvel agent'}</h1>
          <p>{isEdit ? 'Mettez à jour les informations' : 'Renseignez les informations du nouvel agent'}</p>
        </div>
      </div>

      {error && <div className="state-box error" style={{ margin: '0 0 20px' }}>{error}</div>}

      <form onSubmit={handleSubmit} className="table-card" style={{ padding: '28px' }}>
        <div className="form-grid">
          <div className="form-field">
            <label>Matricule</label>
            <input name="matricule" value={form.matricule} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>CIN</label>
            <input name="cin" value={form.cin} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Nom</label>
            <input name="nom" value={form.nom} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Prénom</label>
            <input name="prenom" value={form.prenom} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Date de naissance</label>
            <input type="date" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label>Sexe</label>
            <select name="sexe" value={form.sexe} onChange={handleChange}>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>
          <div className="form-field">
            <label>Situation familiale</label>
            <input name="situationFamiliale" value={form.situationFamiliale} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label>Date de prise de service</label>
            <input type="date" name="datePriseService" value={form.datePriseService} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label>Lieu d'affectation</label>
            <input name="lieuAffectation" value={form.lieuAffectation} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label>Fonction</label>
            <input name="fonction" value={form.fonction} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label>Nombre d'enfants</label>
            <input type="number" min="0" name="nbEnfants" value={form.nbEnfants} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label>Nom de la banque</label>
            <input name="nomBanque" value={form.nomBanque} onChange={handleChange} placeholder="Ex: Attijariwafa Bank" />
          </div>
          <div className="form-field">
            <label>RIB</label>
            <input name="rib" value={form.rib} onChange={handleChange} placeholder="Ex: 007 780 0001234567890 12" />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/agents')}>
            Annuler
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Enregistrement...' : isEdit ? 'Enregistrer les modifications' : "Créer l'agent"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AgentForm;