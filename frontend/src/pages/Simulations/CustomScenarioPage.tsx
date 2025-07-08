import React from "react";
import { useNavigate } from "react-router-dom";

export default function CustomScenarioBuilderPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Custom Scenario Builder</h2>
      <p>Build your custom scenario for the simulation.</p>
      <button className="btn btn-success" onClick={() => navigate("/simulations/real-time")}>
        Start Simulation
      </button>
    </div>
  );
}
