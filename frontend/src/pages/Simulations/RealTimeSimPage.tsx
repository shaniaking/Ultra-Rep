import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LiveMetrics from "../../components/LiveMetrics.tsx";
import Clock from "../../components/assets/clock_icon.svg";
import ChatArea from "../../components/ChatArea.tsx";
import RealTimeTips from "../../components/RealTimeTips.tsx";

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
  minHeight: 0,
};

const transcriptPanelStyle: React.CSSProperties = {
  width: "38%",
  background: "#0B1739",
  padding: "24px",
  borderLeft: "1px solid #1F2C4A",
  overflowY: "auto",
  borderRadius: "0 12px 12px 0",
};

const sidebarStyle: React.CSSProperties = {
  width: "400px",
  padding: "0 24px 24px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  background: "#081028",
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
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);
  const elapsedSecondsRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [metrics] = useState({
    confidence: 80,
    tone: 70,
    objection: 65,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping, isUserTyping]);

  // Simulate AI responses with typing indicator
  const simulateAiResponse = () => {
    const aiResponses = [
      "That sounds interesting. What makes your solution different from others in the market?",
      "Let me think about that. Can you send me some more information via email?",
      "We're actually using Salesforce right now. I'm not really looking to switch CRM systems at this moment.",
      "I want to know more about Acme Solutions. What are the key features?",
    ];

    const randomResponse =
      aiResponses[Math.floor(Math.random() * aiResponses.length)];
    const typingDelay = Math.random() * 2000 + 1500; // 1.5-3.5 seconds for typing

    setIsAiTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: randomResponse,
          timestamp: elapsedSecondsRef.current, // Use ref to get current elapsed time
        },
      ]);
      setIsAiTyping(false);
    }, typingDelay);
  };

  const handleInputChange = (value: string) => {
    setInput(value);

    if (value.trim() && !isUserTyping) {
      setIsUserTyping(true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // If input is empty, hide typing indicator immediately
    if (!value.trim()) {
      setIsUserTyping(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setIsUserTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setMessages((prev) => [
      ...prev,
      {
        sender: "User",
        text: input,
        timestamp: elapsedSeconds,
      },
    ]);
    setInput("");

    // Trigger AI response after user sends message (with small delay)
    setTimeout(() => {
      simulateAiResponse();
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        const newValue = prev + 1;
        elapsedSecondsRef.current = newValue; // Keep ref in sync
        return newValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Cleanup typing timeout on component unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
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
        {/* Header */}
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
          {/* Chat Area */}
          <ChatArea
            messages={messages}
            input={input}
            onInputChange={handleInputChange}
            onSend={handleSend}
            isAiTyping={isAiTyping}
            isUserTyping={isUserTyping}
          />

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

            {isUserTyping && (
              <div
                style={{
                  fontSize: "14px",
                  marginBottom: "12px",
                  color: "#9ca3af",
                  fontStyle: "italic",
                }}
              >
                <strong>You</strong> are typing...
              </div>
            )}
            {isAiTyping && (
              <div
                style={{
                  fontSize: "14px",
                  marginBottom: "12px",
                  color: "#9ca3af",
                  fontStyle: "italic",
                }}
              >
                <strong>Customer</strong> is typing...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <LiveMetrics metrics={metrics} />
        <RealTimeTips
          tips={[
            {
              type: "success",
              title: "Good job!",
              content: "Placeholder tips",
            },
            {
              type: "suggestion",
              title: "Suggestion:",
              content: "Placeholder tips",
            },
          ]}
        />
      </div>
    </div>
  );
}
