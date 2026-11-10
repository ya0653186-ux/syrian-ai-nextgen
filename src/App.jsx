

import React, { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function sendMessage() {
    if (!message.trim()) return;

    setMessages([...messages, {
      text: message,
      id: Date.now()
    }]);

    setMessage("");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#071b13",
      color: "white",
      fontFamily: "Arial, sans-serif",
      direction: "rtl"
    }}>
      <header style={{
        padding: "18px",
        borderBottom: "1px solid #244536",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ color: "#39d98a" }}>
          🇸🇾 Syrian AI
        </h2>
        <span>الذكاء الاصطناعي السوري</span>
      </header>

      <main style={{
        maxWidth: "850px",
        margin: "auto",
        padding: "25px"
      }}>
        <section style={{
          textAlign: "center",
          marginTop: "50px"
        }}>
          <h1 style={{ fontSize: "32px" }}>
            أهلاً بك في الذكاء الاصطناعي السوري
          </h1>
          <p style={{ color: "#a9c5b5" }}>
            مساعدك الذكي للمعرفة والإبداع والتعلم
          </p>
        </section>

        <section style={{
          marginTop: "40px",
          minHeight: "250px"
        }}>
          {messages.map((item) => (
            <div key={item.id} style={{
              background: "#153528",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "12px"
            }}>
              {item.text}
            </div>
          ))}
        </section>

        <div style={{
          display: "flex",
          gap: "10px",
          background: "#153528",
          padding: "12px",
          borderRadius: "16px"
        }}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="اكتب رسالتك هنا..."
            style={{
              flex: 1,
              minWidth: 0,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "16px"
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              background: "#20a66a",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            إرسال
          </button>
        </div>

        <p style={{
          textAlign: "center",
          color: "#8ba99a",
          fontSize: "12px",
          marginTop: "15px"
        }}>
          Syrian AI - منصة الذكاء الاصطناعي السوري
        </p>
      </main>
    </div>
  );
}
