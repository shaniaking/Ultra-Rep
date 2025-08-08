import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../components/Button.tsx";
import LiveMetrics from "../../components/LiveMetrics.tsx";
import AiAvatar from "../../components/assets/ai_avatar.svg";
import UserAvatar from "../../components/assets/user_avatar.svg";
import Clock from "../../components/assets/clock_icon.svg";

// Style constants
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  color: "#fff",
  fontFamily: "sans-serif",
  background: "transparent",
  borderRadius: "12px",
  border: "none",
};

const leftColumnStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  borderRadius: "12px",
  background: "#0B1739",
};

const headerStyle: React.CSSProperties = {
  background: "#FA6D43",
  padding: "16px 24px",
  fontSize: "18px",
  fontWeight: 600,
  borderRadius: "12px 12px 0 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const chatTranscriptWrapperStyle: React.CSSProperties = {
  display: "flex",
  flex: 1,
  overflow: "hidden",
};

const chatAreaStyle: React.CSSProperties = {
  flex: 2,
  display: "flex",
  flexDirection: "column",
  padding: "24px",
  gap: "12px",
  minWidth: 0,
};

const messageListStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  paddingRight: "12px",
};

const transcriptPanelStyle: React.CSSProperties = {
  width: "40%",
  background: "#0B1739",
  padding: "24px",
  borderLeft: "1px solid #1F2C4A",
  overflowY: "auto",
  borderRadius: "0 12px 12px 0",
};

const sidebarStyle: React.CSSProperties = {
  width: "420px",
  padding: "0 24px 24px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  background: "#081028",
};

const inputRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const inputStyle: React.CSSProperties = {
  borderRadius: "20px",
  background: "#232E4C",
  border: "none",
  color: "#fff",
  padding: "10px 15px",
  flex: 1,
};

const realTimeTipsStyle: React.CSSProperties = {
  background: "#0B1739",
  borderRadius: "12px",
  padding: "20px 24px",
  color: "#fff",
};

export default function RealTimeSimPage() {
  const location = useLocation();
  const scenario = location.state?.scenario || "Custom Scenario";
  const duration = location.state?.duration || 7;
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Mock data for messages and metrics
  const [messages, setMessages] = useState([
    {
      sender: "User",
      text: "Hello, this is Alex from Acme Solutions. Am I speaking with Sarah Johnson?",
      timestamp: 0,
    },
    {
      sender: "AI",
      text: "Yes, this is Sarah. What is this regarding?",
      timestamp: 3,
    },
  ]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [metrics] = useState({
    confidence: 80,
    tone: 70,
    objection: 65,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        sender: "User",
        text: input,
        timestamp: elapsedSeconds, // <- add this
      },
    ]);
    setInput("");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatElapsed = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div style={containerStyle}>
      {/* Left Section: Header + Chat + Transcript */}
      <div style={leftColumnStyle}>
        <div style={headerStyle}>
          <span>{scenario}</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              fontWeight: elapsedSeconds >= duration * 60 ? "bold" : "normal",
              color: elapsedSeconds >= duration * 60 ? "#FF3B3B" : undefined,
            }}
          >
            <img src={Clock} alt="Clock" style={{ width: 18, height: 18 }} />
            {formatElapsed(elapsedSeconds)} / {duration}:00
          </span>
        </div>

        <div style={chatTranscriptWrapperStyle}>
          {/* Chat */}
          <div style={chatAreaStyle}>
            <div style={messageListStyle}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "AI" ? "flex-end" : "flex-start",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection:
                        msg.sender === "AI" ? "row-reverse" : "row",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    {/* Profile Circle */}
                    <div
                      style={{
                        background: msg.sender === "AI" ? "#172343" : "#231F3A",
                        borderRadius: "50%",
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                      }}
                    >
                      <img
                        src={msg.sender === "AI" ? AiAvatar : UserAvatar}
                        alt={msg.sender === "AI" ? "AI Avatar" : "User Avatar"}
                      />
                    </div>
                    {/* Message Bubble */}
                    <div
                      style={{
                        background: msg.sender === "AI" ? "#081028" : "#232E4D",
                        borderRadius: "12px",
                        padding: "12px 16px",
                        fontSize: "15px",
                        lineHeight: "1.5",
                        flexGrow: 1,
                        maxWidth: "70%",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={inputRowStyle}>
              <input
                type="text"
                style={inputStyle}
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button variant="primary" onClick={handleSend}>
                Send
              </Button>
            </div>
          </div>

          {/* Transcript */}
          <div style={transcriptPanelStyle}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "12px",
              }}
            >
              Transcript
            </div>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  fontSize: "14px",
                  marginBottom: "12px",
                  color: "#cbd5e1",
                }}
              >
                <strong>{msg.sender === "AI" ? "Customer" : "You"}</strong> (
                {formatElapsed(msg.timestamp)}): {msg.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <LiveMetrics metrics={metrics} />
        <div style={realTimeTipsStyle}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
            Real-Time Tips
          </h3>
          <div
            style={{
              background: "#0d1a3a",
              border: "1px solid #3b82f6",
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <div style={{ fontWeight: "bold" }}>Good job!</div>
            <div style={{ fontSize: 14, color: "#cfd4e0" }}>
              Placeholder tips
            </div>
          </div>
          <div
            style={{
              background: "#0d1a3a",
              border: "1px solid #facc15",
              borderRadius: 8,
              padding: 12,
            }}
          >
            <div style={{ fontWeight: "bold" }}>Suggestion:</div>
            <div style={{ fontSize: 14, color: "#cfd4e0" }}>
              Placeholder tips
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
