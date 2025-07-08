import React from "react";
import { useNavigate } from "react-router-dom";

export default function CreateSimulationPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Create Simulation</h2>
      <div className="row">
        {["Cold Call Introduction", "Handling Price Objections", "Follow-Up After Proposal", "Custom"].map((scenario) => (
          <div className="col-4" key={scenario}>
            <div className="card mb-3 display-card">
              <div className="card-body">
                <h5 className="card-title">{scenario}</h5>
                <p className="card-text">
                  {scenario === "Custom"
                    ? "Check in with a prospect who received your proposal last week but hasn't responded."
                    : `Practice your skills in the "${scenario}" scenario.`}
                </p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/simulations/custom")}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
