import React, { useState } from "react";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return showWelcome ? (
    <Welcome onContinue={() => setShowWelcome(false)} />
  ) : (
    <Home />
  );
}
