import React from "react";

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
  className = "col-md-4" 
}: SimulationCardProps) {
  return (
    <div className={className}>
      <div className="card mb-3 display-card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{score}/100</p>
          <p className="card-text">{date}</p>
          <div className="d-flex gap-2 mt-3">
            <button 
              className="btn btn-outline-light" 
              onClick={onAddToPlan}
            >
              Add to Plan
            </button>
            <button 
              className="btn btn-outline-primary" 
              onClick={onViewReport}
            >
              View Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
