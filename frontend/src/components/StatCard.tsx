import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  className?: string;
}

export default function StatCard({ title, value, className = "col-md-3" }: StatCardProps) {
  return (
    <div className={className}>
      <div className="card mb-3 display-card">
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p className="card-text">{value}</p>
        </div>
      </div>
    </div>
  );
}
