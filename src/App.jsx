
import React, { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import MessageInput from "./components/MessageInput.jsx";
import { sendMessage } from "./services/chatService.js";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSend(text) {
    if (loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text
    };

    const history = messages.map((msg) => ({
      role: msg.role,
      content: msg.content
    }));

    setMessages((previous) => [...previous, userMessage]);
    setLoading(true);
    setError("");

    try {
      const reply = await sendMessage(text, history);

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: reply
        }
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function newChat() {
    setMessages([]);
    setError("");
    setSidebarOpen(false);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#071b13",
      color: "white",
      direction: "rtl",
      display: "flex",
      flexDirection: "column"
    }}>
      <header style={{
        padding: "15px 20px",
        borderBottom: "1px solid #244536",
        display: "flex",
        alignItems: "center",
        gap: "15px"
      }}>
        <button onClick={() => setSidebarOpen(true)}>
          ☰
        </button>

        <h2 style={{ color: "#39d98a", margin: 0 }}>
          🇸🇾 Syrian AI
        </h2>

        <span>الذكاء الاصطناعي السوري</span>
      </header>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={newChat}
        conversations={conversations}
      />

      <ChatWindow
        messages={messages}
        loading={loading}
      />

      {error && (
        <p style={{
          color: "#ff8b8b",
          textAlign: "center",
          padding: "10px"
        }}>
          {error}
        </p>
      )}

      <footer style={{
        width: "100%",
        maxWidth: "850px",
        margin: "0 auto",
        padding: "15px"
      }}>
        <MessageInput
          onSend={handleSend}
          disabled={loading}
        />
      </footer>
    </div>
  );
}
