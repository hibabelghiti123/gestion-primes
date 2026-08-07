import { useState, useEffect } from "react";

const API_BASE = "http://localhost:8080/api/comptes-bancaires"; // adapte le port/host si besoin

const COLORS = {
  navy: "#111A3C",
  gold: "#D9A73B",
  goldLight: "#F3D89A",
  gray: "#F4F5F8",
  textGray: "#6B7280",
  border: "#E5E7EB",
};

export default function CompteBancaireForm({ agentId }) {
  const [compte, setCompte] = useState({ nomBanque: "", rib: "" });
  const [compteId, setCompteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCompte();
  }, [agentId]);

  const fetchCompte = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/agent/${agentId}`);
      if (res.ok) {
        const data = await res.json();
        setCompte({ nomBanque: data.nomBanque || "", rib: data.rib || "" });
        setCompteId(data.id);
      } else {
        setCompte({ nomBanque: "", rib: "" });
        setCompteId(null);
      }
    } catch (err) {
      console.error("Erreur chargement compte bancaire:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCompte({ ...compte, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const url = compteId
        ? `${API_BASE}/${compteId}`
        : `${API_BASE}/agent/${agentId}`;
      const method = compteId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compte),
      });

      if (res.ok) {
        const data = await res.json();
        setCompteId(data.id);
        setMessage("success");
      } else {
        setMessage("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 24, color: COLORS.textGray, fontFamily: "sans-serif" }}>
        Chargement du compte bancaire...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 24,
        maxWidth: 420,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        fontFamily: "sans-serif",
      }}
    >
      <h3 style={{ color: COLORS.navy, marginBottom: 4, fontSize: 18 }}>
        Compte bancaire
      </h3>
      <p style={{ color: COLORS.textGray, fontSize: 13, marginBottom: 20 }}>
        Informations bancaires de l'agent
      </p>

      <label style={{ display: "block", marginBottom: 16 }}>
        <span
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: COLORS.textGray,
            textTransform: "uppercase",
            letterSpacing: 0.4,
            marginBottom: 6,
          }}
        >
          Nom de la banque
        </span>
        <input
          type="text"
          name="nomBanque"
          value={compte.nomBanque}
          onChange={handleChange}
          placeholder="Ex: Attijariwafa Bank"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: `1px solid ${COLORS.border}`,
            fontSize: 14,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 20 }}>
        <span
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: COLORS.textGray,
            textTransform: "uppercase",
            letterSpacing: 0.4,
            marginBottom: 6,
          }}
        >
          RIB
        </span>
        <input
          type="text"
          name="rib"
          value={compte.rib}
          onChange={handleChange}
          placeholder="Ex: 007 780 0001234567890 12"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: `1px solid ${COLORS.border}`,
            fontSize: 14,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </label>

      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          background: COLORS.gold,
          color: COLORS.navy,
          border: "none",
          borderRadius: 8,
          padding: "10px 20px",
          fontWeight: 600,
          fontSize: 14,
          cursor: saving ? "not-allowed" : "pointer",
          opacity: saving ? 0.7 : 1,
        }}
      >
        {saving ? "Enregistrement..." : "Enregistrer"}
      </button>

      {message === "success" && (
        <p style={{ color: "#15803D", fontSize: 13, marginTop: 12 }}>
          Compte bancaire enregistré avec succès.
        </p>
      )}
      {message === "error" && (
        <p style={{ color: "#B91C1C", fontSize: 13, marginTop: 12 }}>
          Erreur lors de l'enregistrement.
        </p>
      )}
    </div>
  );
}