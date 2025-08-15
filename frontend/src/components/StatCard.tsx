import React from "react";
import { MoveUp, MoveDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  isIncrease?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export default function StatCard({
  title,
  value,
  change,
  isIncrease = true,
  icon,
  className = "col-md-3",
}: StatCardProps) {
  return (
    <div className={className}>
      <div
        className="flex items-center justify-between rounded-lg"
        style={{
          backgroundColor: "#0A1736",
          color: "white",
          borderRadius: "12px",
          minHeight: "120px",
          width: "100%",
          padding: "0.75rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            backgroundColor: "#172343",
            width: "65px",
            height: "65px",
            display: "flex",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {icon}
        </div>

        {/* Title and Value */}
        <div style={{ minWidth: 0, flex: 1, marginLeft: "0.75rem" }}>
          <p
            className="text-xs text-gray-400"
            style={{ margin: 0, marginBottom: "0.25rem", fontSize: "14px" }}
          >
            {title}
          </p>
          <h2
            className="text-lg font-semibold"
            style={{ margin: 0, lineHeight: "1.2", fontSize: "1.5rem" }}
          >
            {value}
          </h2>
        </div>

        {/* Change indicator */}
        {change !== undefined && (
          <div
            className="flex items-center text-xs font-medium"
            style={{
              color: isIncrease ? "#4ade80" : "#f87171",
              flexShrink: 0,
            }}
          >
            {change}%{" "}
            {isIncrease ? <MoveUp size={12} /> : <MoveDown size={12} />}
          </div>
        )}
      </div>
    </div>
  );
}
