import React from "react";
import ProgressCard from "../../components/ProgressCard.tsx";

export default function SimulationReportPage() {
  return (
    <div>
      <h2>Simulation Report & Playback Transcript</h2>
      <div className="mt-3">
        <div className="d-flex justify-content-between">
          <ProgressCard 
            title="Overall Score" 
            score={87} 
            variant="success" 
          />
          <ProgressCard 
            title="Objection Handling" 
            score={95} 
            variant="info" 
          />
          <ProgressCard 
            title="Value Articulation" 
            score={80} 
            variant="warning" 
          />
        </div>
        <p>Transcript will appear here...</p>
      </div>
      <button className="btn btn-success mt-3">Add to Training Plan</button>
    </div>
  );
}
