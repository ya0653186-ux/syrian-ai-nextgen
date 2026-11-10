
import React from "react";
import { createRoot } from "react-dom/client";

function SyrianAI() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#071b13",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>🇸🇾 Syrian AI</h1>
      <h2>الذكاء الاصطناعي السوري</h2>
      <p>مرحباً بك في منصتنا الجديدة</p>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SyrianAI />
  </React.StrictMode>
);

