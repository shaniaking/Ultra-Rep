import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DropResult } from "@hello-pangea/dnd";
import DraggableComponentsList from "../../components/DraggableComponentsList.tsx";
import FlowChart from "../../components/FlowChart.tsx";
import SimulationSettings from "../../components/SimulationSettings.tsx";

export default function CustomScenarioPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const scenario = location.state?.scenario || "Custom Scenario";

  const [components, setComponents] = useState([
    "Customer Persona",
    "Objection",
    "Discovery Question",
    "Closing Opportunity",
    "ROI Discussion",
  ]);

  const [persona, setPersona] = useState("");
  const [callTone, setCallTone] = useState("Professional");
  const [objections, setObjections] = useState<string[]>([]);
  const [duration, setDuration] = useState(7);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newItems = Array.from(components);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setComponents(newItems);
  };

  const handleCancel = () => {
    navigate("/simulations");
  };

  const handleStart = () => {
    navigate("/simulations/real-time", { state: { scenario, duration } });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 36,
          paddingLeft: 280,
          paddingRight: 340,
        }}
      >
        <DraggableComponentsList
          components={components}
          onDragEnd={handleDragEnd}
          scenario={scenario}
          onCancel={handleCancel}
          onStart={handleStart}
        />

        <FlowChart components={components} />

        <SimulationSettings
          persona={persona}
          onPersonaChange={setPersona}
          callTone={callTone}
          onCallToneChange={setCallTone}
          objections={objections}
          onObjectionsChange={setObjections}
          duration={duration}
          onDurationChange={setDuration}
        />
      </div>
    </div>
  );
}
