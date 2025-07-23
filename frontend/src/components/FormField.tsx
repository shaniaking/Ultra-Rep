import React from "react";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormField({ label, children, className = "mb-3" }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="mb-1">{label}</label>
      {children}
    </div>
  );
}
