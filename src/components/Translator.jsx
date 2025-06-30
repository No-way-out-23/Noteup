import React, { useState } from "react";

const idiomas = [
  "English", "Español", "Français", "Deutsch", "Português", "Italiano", "Japanese", "Korean"
];

export default function Translator({ text }) {
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const translate = async () => {
    setLoading(true); setError(""); setTranslated("");
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLanguage })
      });
      const data = await res.json();
      if (data.translatedText) setTranslated(data.translatedText);
      else setError(data.error || "Error en la traducción.");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: "12px 0" }}>
      <label>
        Traducir a:
        <select value={targetLanguage} onChange={e => setTargetLanguage(e.target.value)}>
          {idiomas.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </label>
      <button onClick={translate} disabled={loading} style={{ marginLeft: 12 }}>Traducir</button>
      {loading && <span> Traduciendo...</span>}
      {translated && <textarea style={{ width: "100%" }} value={translated} readOnly />}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
