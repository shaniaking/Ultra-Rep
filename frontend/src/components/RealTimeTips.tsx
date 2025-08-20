import React from "react";

export default function RealTimeTips({ tips }) {
  return (
    <div
      style={{
        background: "#0B1739",
        borderRadius: 12,
        padding: "20px 24px",
        color: "#fff",
      }}
    >
      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
        Real-Time Tips
      </h3>
      {tips.map((tip, idx) => (
        <div
          key={idx}
          style={{
            background: "#0d1a3a",
            border: `1px solid ${
              tip.type === "success" ? "#3b82f6" : "#facc15"
            }`,
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: "bold" }}>{tip.title}</div>
          <div style={{ fontSize: 14, color: "#cfd4e0" }}>{tip.content}</div>
        </div>
      ))}
    </div>
  );
}
