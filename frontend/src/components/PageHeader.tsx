import React from "react";

interface PageHeaderProps {
  title: string;
  onCancel: () => void;
  onStart: () => void;
  startButtonText?: string;
  startButtonVariant?: string;
}

export default function PageHeader({ 
  title, 
  onCancel, 
  onStart, 
  startButtonText = "Start Simulation",
  startButtonVariant = "btn-success"
}: PageHeaderProps) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>{title}</h2>
      <div>
        <button
          className="btn btn-outline-light me-2"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className={`btn ${startButtonVariant}`} 
          onClick={onStart}
        >
          {startButtonText}
        </button>
      </div>
    </div>
  );
}
