import React from "react";
import { useLocation } from "react-router-dom";
import ProgressCard from "../../components/ProgressCard.tsx";
import Button from "../../components/Button.tsx";

export default function SimulationReportPage() {
  const location = useLocation();
  const scenario = location.state?.scenario || "Custom Scenario";

  return (
    <div>
      <h2>Simulation Report & Playback Transcript</h2>
      <h4 className="text-muted mb-3">{scenario}</h4>
      <div className="mt-3">
        <div className="d-flex justify-content-between">
          <ProgressCard title="Overall Score" score={87} variant="success" />
          <ProgressCard title="Objection Handling" score={95} variant="info" />
          <ProgressCard
            title="Value Articulation"
            score={80}
            variant="warning"
          />
        </div>
        <p>Transcript will appear here...</p>
      </div>
      <Button variant="primary" className="mt-3">
        Add to Training Plan
      </Button>
    </div>
  );
}
