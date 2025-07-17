import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  chatContainer: {
    background: "#0B1739",
    borderRadius: "12px",
    padding: "24px",
    maxHeight: "380px",
    overflowY: "auto",
    marginBottom: "24px",
  },
  messageRow: {
    display: "flex",
    marginBottom: "14px",
  },
  aiBubble: {
    background: "#081028",
    color: "#fff",
    borderRadius: "16px",
    padding: "12px 20px",
    maxWidth: "66%",
    marginLeft: "auto",
  },
  userBubble: {
    background: "#232E4D",
    color: "#fff",
    borderRadius: "16px",
    padding: "12px 20px",
    maxWidth: "66%",
    marginRight: "auto",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
  },
};

export default function RealTimeSimPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      sender: "AI",
      text: "Hello, who is this speaking?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "User", text: input }]);
    setInput("");
    // Trigger AI reply automatically here in a real system
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Real-Time Simulation</h2>
        <div>
          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/simulations/custom")}
          >
            Cancel Simulation
          </button>
          <button
            className="btn btn-warning"
            onClick={() => navigate("/simulations/report")}
          >
            Complete Simulation
          </button>
        </div>
      </div>

      {/* Chat container */}
      <div style={styles.chatContainer}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.messageRow,
              justifyContent: msg.sender === "AI" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={msg.sender === "AI" ? styles.aiBubble : styles.userBubble}
            >
              <div
                style={{
                  fontWeight: 500,
                  fontSize: "0.97rem",
                  letterSpacing: 0.1,
                }}
              >
                {msg.text}
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  marginTop: 4,
                  color: "#fff7",
                  textAlign: "right",
                }}
              >
                {msg.sender === "AI" ? "AI" : "You"}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div style={styles.inputRow}>
        <input
          type="text"
          className="form-control me-2"
          style={{
            borderRadius: "20px",
            background: "#232E4C",
            border: "none",
            color: "#fff",
            padding: "10px 15px",
          }}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
