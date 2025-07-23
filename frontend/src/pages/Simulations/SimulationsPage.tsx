import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal.tsx";
import StatCard from "../../components/StatCard.tsx";
import SimulationCard from "../../components/SimulationCard.tsx";
import ScenarioCard from "../../components/ScenarioCard.tsx";

const mockSimulations = [
  {
    id: 1,
    title: "Healthcare Solution Pitch",
    score: 85,
    date: "May 10, 2025",
  },
  {
    id: 2,
    title: "Enterprise SaaS Sales Call",
    score: 78,
    date: "June 15, 2025",
  },
  {
    id: 3,
    title: "Manufacturing Solution Demo",
    score: 91,
    date: "July 20, 2025",
  },
];

export default function SimulationsPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState("");

  const scenarios = [
    "Cold Call Introduction",
    "Handling Price Objections",
    "Follow-Up After Proposal",
    "Custom",
  ];

  const handleNext = () => {
    if (!selectedScenario) return;
    setShowModal(false);
    navigate("/simulations/custom", { state: { scenario: selectedScenario } });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedScenario("");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Simulations</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Start Simulation
        </button>
      </div>

      <div className="mb-4">
        <div className="row">
          <StatCard title="Total Simulations" value={mockSimulations.length} />
          <StatCard title="Average Score" value="84.7" />
          <StatCard title="Completion Rate" value="91.6%" />
          <StatCard title="Improvement Rate" value="17.3%" />
        </div>
      </div>

      <div className="row">
        {mockSimulations.map((sim) => (
          <SimulationCard
            key={sim.id}
            title={sim.title}
            score={sim.score}
            date={sim.date}
            onAddToPlan={() => console.log(`Add ${sim.title} to plan`)}
            onViewReport={() => console.log(`View report for ${sim.title}`)}
          />
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Start Simulation"
      >
        <div>
          <div className="row">
            {scenarios.map((scenario) => (
              <div className="col-md-6" key={scenario}>
                <ScenarioCard
                  scenario={scenario}
                  description={
                    scenario === "Custom"
                      ? "Build your own simulation from scratch."
                      : `Practice the "${scenario}" scenario.`
                  }
                  isSelected={selectedScenario === scenario}
                  onClick={() => setSelectedScenario(scenario)}
                />
              </div>
            ))}
          </div>
          <div
            className="d-flex justify-content-end gap-2"
            style={{ marginTop: "1.5rem" }}
          >
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!selectedScenario}
            >
              Next
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
