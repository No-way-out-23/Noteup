import React, { useRef, useState } from "react";

export default function AudioRecorder({ onTranscribe }) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState("");
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new window.MediaRecorder(stream);
      audioChunks.current = [];
      mediaRecorder.current.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      mediaRecorder.current.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
      };
      mediaRecorder.current.start();
      setRecording(true);
    } catch (err) {
      setError("No se pudo acceder al micrófono.");
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  // Envía el audio grabado al backend
  const sendToAPI = async () => {
    setError("");
    if (!audioUrl) return;

    try {
      const audioBlob = await fetch(audioUrl).then(r => r.blob());
      const formData = new FormData();
      formData.append("audio", audioBlob, "grabacion.webm");

      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.text || data.transcript) {
        onTranscribe(data.text || data.transcript);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("No se pudo transcribir el audio.");
      }
    } catch (err) {
      setError("Error al enviar el audio: " + err.message);
    }
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording} style={{ marginBottom: 8 }}>
        {recording ? "Detener grabación" : "Grabar audio"}
      </button>
      {audioUrl && (
        <>
          <audio controls src={audioUrl} style={{ display: "block", marginBottom: 8 }} />
          <button onClick={sendToAPI}>Transcribir</button>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
