import React from "react";

const VerticalConnector = ({ isLast }: { isLast: boolean }) => (
  !isLast ? (
    <div style={{
      height: 40,
      width: 2,
      background: "repeating-linear-gradient(to bottom, #666 0, #666 4px, transparent 4px, transparent 8px)",
      margin: "12px auto",
    }} />
  ) : null
);

interface FlowChartProps {
  components: string[];
}

export default function FlowChart({ components }: FlowChartProps) {
  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      minHeight: 260,
      paddingTop: 40
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0
      }}>
        {components.map((comp, idx) => (
          <React.Fragment key={comp}>
            <div style={{
              background: "#0B1739",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 25,
              fontSize: 16,
              fontWeight: 500,
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              minWidth: 180,
              textAlign: "center",
              border: "2px solid #1a2951"
            }}>
              {comp}
            </div>
            <VerticalConnector isLast={idx === components.length - 1} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
