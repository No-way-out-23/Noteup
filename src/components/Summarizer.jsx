import React, { useState } from "react";

export default function Summarizer({ text }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const summarize = async () => {
    setLoading(true); setError(""); setSummary("");
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      if (data.summary) setSummary(data.summary);
      else setError(data.error || "Error al resumir.");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: "12px 0" }}>
      <button onClick={summarize} disabled={loading}>Resumir</button>
      {loading && <span> Resumiendo...</span>}
      {summary && <textarea style={{ width: "100%" }} value={summary} readOnly />}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
