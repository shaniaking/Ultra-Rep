import React, { useState } from "react";

const mockCoaches = [
  // Mock data
  { id: 1, name: "Emma Rodriguez", time: 45, specialty: "Objection Handling" },
  { id: 2, name: "Micheal Chen", time: 60, specialty: "Pitch Feedback" },
];

export default function CoachingPage() {
  const [section, setSection] = useState<"booked" | "recommended">("booked");

  return (
    <div>
      <h2>Coaching</h2>
      <div className="mb-3">
        <button
          className={`btn btn-outline-primary me-2 ${section === "booked" ? "active" : ""}`}
          onClick={() => setSection("booked")}
        >
          Booked Sessions
        </button>
        <button
          className={`btn btn-outline-secondary ${section === "recommended" ? "active" : ""}`}
          onClick={() => setSection("recommended")}
        >
          Recommended Coaches
        </button>
      </div>
      <div>
        {section === "booked" ? (
          <div className="row">
            {mockCoaches.map((coach) => (
              <div className="col-4" key={coach.id}>
                <div className="card mb-3 display-card">
                  <div className="card-body">
                    <h5 className="card-title">{coach.name}</h5>
                    <p className="card-text">{coach.time} mins</p>
                    <p className="card-text">{coach.specialty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            <div className="col-4">
              <div className="card mb-3 display-card">
                <div className="card-body">
                  <h5 className="card-title">James Anderson</h5>
                  <p className="card-text">Next available: July 9, 2025</p>
                  <p className="card-text">Objection Handling, Closing Techniques</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
