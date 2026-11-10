
import React from "react";

export default function Sidebar({
  open,
  onClose,
  onNewChat,
  conversations = []
}) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "#0009",
            zIndex: 20
          }}
        />
      )}

      <aside style={{
        position: "fixed",
        top: 0,
        right: open ? 0 : "-290px",
        bottom: 0,
        width: "280px",
        padding: "20px",
        background: "#0c2419",
        borderLeft: "1px solid #244536",
        zIndex: 21,
        transition: "right .25s",
        display: "flex",
        flexDirection: "column"
      }}>
        <h2 style={{ color: "#39d98a" }}>
          🇸🇾 Syrian AI
        </h2>

        <button
          onClick={onNewChat}
          style={{
            padding: "13px",
            background: "#167b4b",
            color: "white",
            border: 0,
            borderRadius: "10px",
            margin: "20px 0",
            cursor: "pointer"
          }}
        >
          + محادثة جديدة
        </button>

        <h4 style={{ color: "#a9c5b5" }}>
          المحادثات السابقة
        </h4>

        <div style={{ overflowY: "auto" }}>
          {conversations.map((chat) => (
            <div key={chat.id} style={{
              padding: "12px",
              marginBottom: "8px",
              background: "#153528",
              borderRadius: "8px",
              color: "white"
            }}>
              {chat.title}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: "auto",
          color: "#a9c5b5",
          fontSize: "13px"
        }}>
          الذكاء الاصطناعي السوري
        </div>
      </aside>
    </>
  );
}

