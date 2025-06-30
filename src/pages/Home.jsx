import AudioRecorder from "../components/AudioRecorder";
import Translator from "../components/Translator";
import Summarizer from "../components/Summarizer";
import TranscriptionHistory from "../components/TranscriptionHistory";
import { useState } from "react";

export default function Home() {
  const [transcription, setTranscription] = useState("");
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("noteup_history") || "[]");
  });

  // Guarda en historial y localStorage
  const saveToHistory = (text) => {
    const newHistory = [{ id: Date.now(), text }, ...history];
    setHistory(newHistory);
    localStorage.setItem("noteup_history", JSON.stringify(newHistory));
  };

  const updateHistory = (id, newText) => {
    const newHistory = history.map(item =>
      item.id === id ? { ...item, text: newText } : item
    );
    setHistory(newHistory);
    localStorage.setItem("noteup_history", JSON.stringify(newHistory));
  };

  const deleteFromHistory = (id) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem("noteup_history", JSON.stringify(newHistory));
  };

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: 16 }}>
      <h2>Transcripción</h2>
      <AudioRecorder
        onTranscribe={text => {
          setTranscription(text);
          saveToHistory(text);
        }}
      />

      {transcription && (
        <>
          <h3>Texto Transcrito</h3>
          <textarea
            style={{ width: "100%", minHeight: 80, marginBottom: 10 }}
            value={transcription}
            onChange={e => setTranscription(e.target.value)}
          />

          <Translator text={transcription} />
          <Summarizer text={transcription} />
        </>
      )}

      <TranscriptionHistory
        history={history}
        onEdit={updateHistory}
        onDelete={deleteFromHistory}
        onSelect={setTranscription}
      />
    </div>
  );
}
