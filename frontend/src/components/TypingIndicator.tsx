import React from "react";
import AiAvatar from "./assets/ai_avatar.svg";
import UserAvatar from "./assets/user_avatar.svg";

interface TypingIndicatorProps {
  isVisible?: boolean;
  sender?: "AI" | "User";
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  isVisible = true,
  sender = "AI",
}) => {
  if (!isVisible) return null;

  const isAI = sender === "AI";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isAI ? "flex-end" : "flex-start",
        marginBottom: "14px",
        opacity: 0.8,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isAI ? "row-reverse" : "row",
          alignItems: "flex-start",
          gap: "8px",
        }}
      >
        <div
          style={{
            background: isAI ? "#172343" : "#231F3A",
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
            src={isAI ? AiAvatar : UserAvatar}
            alt={isAI ? "AI Avatar" : "User Avatar"}
          />
        </div>

        {/* Typing bubble */}
        <div
          style={{
            background: isAI ? "#081028" : "#232E4D",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "15px",
            lineHeight: "1.5",
            minWidth: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <span style={{ color: "#9ca3af", fontSize: "14px" }}>
              {isAI ? "Customer is typing" : "You are typing"}
            </span>
            <div style={{ display: "flex", gap: "2px", marginLeft: "6px" }}>
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "#9ca3af",
                  animation: "typing-dot 1.5s infinite",
                  animationDelay: "0s",
                }}
              />
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "#9ca3af",
                  animation: "typing-dot 1.5s infinite",
                  animationDelay: "0.3s",
                }}
              />
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "#9ca3af",
                  animation: "typing-dot 1.5s infinite",
                  animationDelay: "0.6s",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes typing-dot {
            0%, 60%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            30% {
              opacity: 1;
              transform: scale(1.2);
            }
          }
        `}
      </style>
    </div>
  );
};

export default TypingIndicator;
