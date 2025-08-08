import React from "react";
import Button from "./Button.tsx";

interface SimulationCardProps {
  title: string;
  score: number;
  date: string;
  onAddToPlan?: () => void;
  onViewReport?: () => void;
  className?: string;
}

export default function SimulationCard({
  title,
  score,
  date,
  onAddToPlan,
  onViewReport,
  className = "col-md-4",
}: SimulationCardProps) {
  return (
    <div className={className}>
      <div className="card mb-3 display-card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{score}/100</p>
          <p className="card-text">{date}</p>
          <div className="d-flex gap-2 mt-3">
            <Button variant="secondary" onClick={onAddToPlan}>
              Add to Plan
            </Button>
            <Button variant="primary" onClick={onViewReport}>
              View Full Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
