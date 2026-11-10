
import React, { useState } from "react";

export default function MessageInput({
  onSend,
  disabled = false
}) {
  const [text, setText] = useState("");

  function submit() {
    const value = text.trim();

    if (!value || disabled) return;

    onSend(value);
    setText("");
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "flex-end",
      gap: "10px",
      padding: "12px",
      background: "#153528",
      border: "1px solid #285640",
      borderRadius: "16px",
      width: "100%"
    }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder="اكتب رسالتك إلى Syrian AI..."
        rows={1}
        disabled={disabled}
        style={{
          flex: 1,
          minWidth: 0,
          resize: "none",
          background: "transparent",
          border: "none",
          outline: "none",
          color: "white",
          padding: "10px",
          fontSize: "16px",
          direction: "rtl"
        }}
      />

      <button
        onClick={submit}
        disabled={disabled || !text.trim()}
        style={{
          background: "#20a66a",
          color: "white",
          border: "none",
          borderRadius: "10px",
          padding: "12px 18px",
          opacity: disabled || !text.trim() ? 0.5 : 1
        }}
      >
        إرسال
      </button>
    </div>
  );
}

