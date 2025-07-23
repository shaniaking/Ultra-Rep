import React from "react";

interface ScenarioCardProps {
  scenario: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ScenarioCard({ 
  scenario, 
  description, 
  isSelected, 
  onClick 
}: ScenarioCardProps) {
  return (
    <div
      className="card mb-3 display-card"
      onClick={onClick}
      style={{ 
        cursor: "pointer", 
        border: isSelected ? "1px solid #fa6d43" : "1px solid #0B1739",
        backgroundColor: isSelected ? "rgba(250, 109, 67, 0.1)" : ""
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{scenario}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}
