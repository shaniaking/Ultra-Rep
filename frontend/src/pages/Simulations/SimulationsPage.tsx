import React from "react";
import { useNavigate } from "react-router-dom";

export default function SimulationsPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Simulations</h2>
      <button className="btn btn-primary" onClick={() => navigate("/simulations/create")}>
        Start New Simulation
      </button>
    </div>
  );
}
