import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAgentById } from "../api/agentService";
import CompteBancaireForm from "./CompteBancaireForm";

function AgentDetail() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAgentById(id)
      .then((response) => setAgent(response.data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="text-danger">Erreur : {error}</p>;
  if (!agent) return <p>Chargement...</p>;

  return (
    <div className="container mt-4">
      <Link to="/agents">&larr; Retour à la liste</Link>
      <h2 className="mt-3">{agent.prenom} {agent.nom}</h2>
      <table className="table table-bordered mt-3">
        <tbody>
          <tr><th>Matricule</th><td>{agent.matricule}</td></tr>
          <tr><th>CIN</th><td>{agent.cin}</td></tr>
          <tr><th>Date de naissance</th><td>{agent.dateNaissance}</td></tr>
          <tr><th>Sexe</th><td>{agent.sexe}</td></tr>
          <tr><th>Situation familiale</th><td>{agent.situationFamiliale}</td></tr>
          <tr><th>Date de prise de service</th><td>{agent.datePriseService}</td></tr>
          <tr><th>Lieu d'affectation</th><td>{agent.lieuAffectation}</td></tr>
          <tr><th>Fonction</th><td>{agent.fonction}</td></tr>
          <tr><th>Nombre d'enfants</th><td>{agent.nbEnfants}</td></tr>
        </tbody>
      </table>

      <div className="mt-4">
        <CompteBancaireForm agentId={agent.id} />
      </div>
    </div>
  );
}

export default AgentDetail;