import logo from "../../public/logo.png";

export default function Welcome({ onContinue }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#003569", color: "#fff" }}>
      <img src={logo} alt="NoteUp Logo" style={{ width: 140, marginBottom: 24 }} />
      <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>NoteUp</h1>
      <p style={{ fontSize: 18, marginTop: 12, marginBottom: 32, maxWidth: 350, textAlign: "center" }}>
        Transcribe, traduce y resume tus audios al instante.<br />
        <span style={{ fontWeight: 600, fontStyle: "italic" }}>"{/** aquí el slogan de tu PDF */}El aliado ideal para tu productividad universitaria."</span>
      </p>
      <button onClick={onContinue} style={{ fontSize: 18, padding: "12px 32px", borderRadius: 32, background: "#fff", color: "#003569", fontWeight: 700, border: "none" }}>
        Empezar
      </button>
    </div>
  );
}
