import React, { useState } from "react";

export default function TranscriptionHistory({ history, onEdit, onDelete, onSelect }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  if (history.length === 0) return <div style={{ marginTop: 24, color: "#555" }}>Sin historial todavía.</div>;

  return (
    <div style={{ marginTop: 32 }}>
      <h3>Historial</h3>
      {history.map(item =>
        editingId === item.id ? (
          <div key={item.id} style={{ marginBottom: 10 }}>
            <textarea value={editText} onChange={e => setEditText(e.target.value)} style={{ width: "100%" }} />
            <button onClick={() => { onEdit(item.id, editText); setEditingId(null); }}>Guardar</button>
            <button onClick={() => setEditingId(null)} style={{ marginLeft: 8 }}>Cancelar</button>
          </div>
        ) : (
          <div key={item.id} style={{ marginBottom: 10, background: "#eef2fb", padding: 10, borderRadius: 8 }}>
            <span style={{ cursor: "pointer" }} onClick={() => onSelect(item.text)}>{item.text.slice(0, 120)}{item.text.length > 120 ? "..." : ""}</span>
            <div style={{ marginTop: 4 }}>
              <button onClick={() => { setEditingId(item.id); setEditText(item.text); }}>Editar</button>
              <button onClick={() => onDelete(item.id)} style={{ marginLeft: 8, color: "red" }}>Borrar</button>
              <button onClick={() => { navigator.clipboard.writeText(item.text) }} style={{ marginLeft: 8 }}>Copiar</button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
