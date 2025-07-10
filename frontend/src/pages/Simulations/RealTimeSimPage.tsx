import React from "react";
import { useNavigate } from "react-router-dom";

export default function RealTimeSimulationPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Real Time Simulation</h2>
      <p>Placeholder text for the real-time simulation.</p>
      <button className="btn btn-warning" onClick={() => navigate("/simulations/report")}>
        Complete Simulation
      </button>
    </div>
  );
}
