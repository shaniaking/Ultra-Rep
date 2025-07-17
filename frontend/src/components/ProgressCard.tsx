import React from "react";

interface ProgressCardProps {
  title: string;
  score: number;
  variant?: "success" | "info" | "warning" | "danger";
  className?: string;
}

export default function ProgressCard({ 
  title, 
  score, 
  variant = "success",
  className = "flex-fill mx-2" 
}: ProgressCardProps) {
  const getVariantClass = () => {
    switch (variant) {
      case "info": return "bg-info";
      case "warning": return "bg-warning";
      case "danger": return "bg-danger";
      default: return "bg-success";
    }
  };

  return (
    <div className={`card text-center display-card ${className}`}>
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <div className="mb-2"><strong>{score}%</strong></div>
        <div className="progress">
          <div
            className={`progress-bar ${getVariantClass()}`}
            role="progressbar"
            style={{ width: `${score}%` }}
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
      </div>
    </div>
  );
}
