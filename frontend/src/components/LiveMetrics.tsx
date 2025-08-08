import React from "react";

export default function LiveMetrics({
  metrics,
}: {
  metrics: { confidence: number; tone: number; objection: number };
}) {
  const bars = [
    {
      label: "Confidence",
      color: "#00ff7f",
      value: metrics.confidence,
      description: "Excellent",
    },
    {
      label: "Tone",
      color: "#4169e1",
      value: metrics.tone,
      description: "Professional",
    },
    {
      label: "Objection Handling",
      color: "#ff7f50",
      value: metrics.objection,
      description: "Very Good",
    },
  ];

  return (
    <div
      style={{
        background: "#0B1739",
        borderRadius: 12,
        padding: "20px 24px",
        color: "#fff",
        width: "100%",
        fontFamily: "sans-serif",
        overflowY: "auto",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
        Live Metrics
      </div>
      {bars.map((bar, idx) => (
        <div key={idx} style={{ marginBottom: 18 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            <span>{bar.label}</span>
            <span style={{ fontSize: 13, color: "#cfd4e0" }}>
              {bar.description}
            </span>
          </div>
          <div
            style={{
              background: "#1e253b",
              borderRadius: 8,
              height: 8,
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${bar.value}%`,
                background: bar.color,
                borderRadius: 8,
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 4,
              fontSize: 12,
              fontWeight: 500,
              color: "#cfd4e0",
              textAlign: "right",
            }}
          >
            {bar.value}%
          </div>
        </div>
      ))}
    </div>
  );
}
