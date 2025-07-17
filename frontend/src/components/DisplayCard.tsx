import React from "react";

interface DisplayCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function DisplayCard({ 
  title, 
  children, 
  className = "", 
  onClick, 
  style = {} 
}: DisplayCardProps) {
  return (
    <div 
      className={`card mb-3 display-card ${className}`}
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
        ...style
      }}
    >
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <div className="card-text">{children}</div>
      </div>
    </div>
  );
}
