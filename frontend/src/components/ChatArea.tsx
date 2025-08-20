import React, { useRef, useEffect } from "react";
import Button from "./Button.tsx";
import TypingIndicator from "./TypingIndicator.tsx";
import AiAvatar from "./assets/ai_avatar.svg";
import UserAvatar from "./assets/user_avatar.svg";

export default function ChatArea({
  messages,
  input,
  onInputChange,
  onSend,
  isAiTyping,
  isUserTyping,
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping, isUserTyping]);

  return (
    <div
      style={{
        flex: 2,
        display: "flex",
        flexDirection: "column",
        padding: 24,
        gap: 12,
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      {/* Message list */}
      <div
        style={{ flex: 1, overflowY: "auto", paddingRight: 12, minHeight: 0 }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.sender === "AI" ? "flex-end" : "flex-start",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: msg.sender === "AI" ? "row-reverse" : "row",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  background: msg.sender === "AI" ? "#172343" : "#231F3A",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={msg.sender === "AI" ? AiAvatar : UserAvatar}
                  alt={msg.sender === "AI" ? "AI Avatar" : "User Avatar"}
                />
              </div>
              {/* Bubble */}
              <div
                style={{
                  background: msg.sender === "AI" ? "#081028" : "#232E4D",
                  borderRadius: 12,
                  padding: "12px 16px",
                  fontSize: 15,
                  lineHeight: 1.5,
                  maxWidth: "70%",
                }}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicators */}
        <TypingIndicator isVisible={isUserTyping} sender="User" />
        <TypingIndicator isVisible={isAiTyping} sender="AI" />

        <div ref={messagesEndRef} />
      </div>

      {/* Input row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <input
          type="text"
          style={{
            borderRadius: 20,
            background: "#232E4C",
            border: "none",
            color: "#fff",
            padding: "10px 15px",
            flex: 1,
            fontSize: 14,
          }}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <Button variant="primary" onClick={onSend}>
          Send
        </Button>
      </div>
    </div>
  );
}
