
import React, { useEffect, useRef } from "react";

export default function ChatWindow({ messages = [], loading = false }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  return (
    <section style={{
      flex: 1,
      width: "100%",
      maxWidth: "850px",
      margin: "0 auto",
      padding: "20px",
      overflowY: "auto"
    }}>
      {messages.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "50px 10px"
        }}>
          <h1 style={{ color: "#39d98a" }}>
            🇸🇾 Syrian AI
          </h1>
          <h2>كيف يمكنني مساعدتك اليوم؟</h2>
          <p style={{ color: "#a9c5b5" }}>
            اسألني عن أي شيء تريد معرفته.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          style={{
            display: "flex",
            justifyContent:
              msg.role === "user" ? "flex-start" : "flex-end",
            marginBottom: "18px"
          }}
        >
          <div style={{
            maxWidth: "85%",
            padding: "15px",
            borderRadius: "14px",
            background:
              msg.role === "user" ? "#174b35" : "#153528",
            color: "white",
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            lineHeight: 1.8
          }}>
            <small style={{
              color: "#39d98a",
              display: "block",
              marginBottom: "6px"
            }}>
              {msg.role === "user" ? "أنت" : "Syrian AI"}
            </small>
            {msg.content}
          </div>
        </div>
      ))}

      {loading && (
        <p style={{ color: "#39d98a" }}>
          Syrian AI يفكر...
        </p>
      )}

      <div ref={bottomRef} />
    </section>
  );
}

