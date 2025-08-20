import React from "react";
import { useLocation } from "react-router-dom";
import ProgressCard from "../../components/ProgressCard.tsx";
import Button from "../../components/Button.tsx";
import { Badge } from "../../components/Badge.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/Tabs.tsx";
import Question from "../../components/assets/question.png"; 
import Graph from "../../components/assets/graph.png"; 
import Message from "../../components/assets/messaging.png"; 

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "500px",
  paddingTop: "1vw",
  paddingBottom: "1vw",
  fontSize: "24px",
  fontWeight: "bold",
}

const performanceHighlightsContainerStyle: React.CSSProperties = {
  display: "flex",
  width: "33%",
  flexDirection: "column",
}

const keyMomentsContainerStyle: React.CSSProperties = {
  display: "flex",
  width: "66%",
  marginLeft: "16px",
  flexDirection: "column",
}

const stretchCardStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
};

const secondContainerStyle: React.CSSProperties = {
  display: "flex",
  width: "100%",
  flexDirection: "row",
}

const simulationTabsStyle: React.CSSProperties = {
  display: "flex",
  flex: 1.75,
  flexDirection: "column",
}

const coachingRecommendationStyle: React.CSSProperties = {
  display: "flex",
  flex: 1.25,
}

const cardLink: React.CSSProperties = {
  color: "#2030DF",
  textDecoration: "none",
  marginTop: "8px",
  cursor: "pointer",
}

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
      <div style={containerStyle}>
        <div style={performanceHighlightsContainerStyle} className="">
          <div className="mb-3">Performance Highlights</div>
          <div className="strengths" style={stretchCardStyle}>
            <div className="card mb-3 display-card" style={{ flex: 1 }}>
              <div className="card-body">
                <h5 className="card-title">Strengths</h5>
                <p className="card-text">• Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <p className="card-text">• Vivamus lacinia odio vitae vestibulum vestibulum</p>
                <p className="card-text">• Cras ultricies ligula sed magna dictum porta</p>
                <p className="card-text">• Cras ultricies ligula sed magna dictum porta</p>
              </div>
            </div>
          </div>
          <div className="areas-for-improvement" style={stretchCardStyle}>
            <div className="card mb-3 display-card" style={{ flex: 1 }}>
              <div className="card-body">
                <h5 className="card-title">Areas for Improvement</h5>
                <p className="card-text">• Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <p className="card-text">• Vivamus lacinia odio vitae vestibulum vestibulum</p>
                <p className="card-text">• Cras ultricies ligula sed magna dictum porta</p>
                <p className="card-text">• Cras ultricies ligula sed magna dictum porta</p>
              </div>
            </div>
          </div>
          </div>
        <div style={keyMomentsContainerStyle}>
          <div className="mb-3">Key Moments</div>
          <div className="strengths" style={stretchCardStyle}>
            <div className="card mb-3 display-card" style={{ flex: 1}}>
              <div className="card-body" style={{ display: "flex", flexDirection: "row" }}>
                <Badge variant="time" />
                <div style={{ display: "flex", flexDirection: "column", marginLeft: "16px" }}>
                  <h5 className="card-title">Areas for Improvement</h5>
                  <p className="card-text">"Tempus fugit celeriter, memoria tenax manet, amici veri adiuvant, amor vincit omnia perpetuo."</p>
                  <Badge variant="strongRapport" />
                </div>
              </div>
            </div>
          </div>
          <div className="areas-for-improvement" style={stretchCardStyle}>
            <div className="card mb-3 display-card" style={{ flex: 1 }}>
              <div className="card-body" style={{ display: "flex", flexDirection: "row" }}>
                <Badge variant="time" />
                <div style={{ display: "flex", flexDirection: "column", marginLeft: "16px"  }}>
                  <h5 className="card-title">Areas for Improvement</h5>
                  <p className="card-text">"Vita brevis est, ars longa, occasio praeceps, experimentum periculosum, iudicium difficile semper manet."</p>
                  <Badge variant="missedObjection" />
                </div>
              </div>
            </div>
          </div>
          <div className="areas-for-improvement" style={stretchCardStyle}>
            <div className="card mb-3 display-card" style={{ flex: 1 }}>
              <div className="card-body" style={{ display: "flex", flexDirection: "row" }}>
                <Badge variant="time" />
                <div style={{ display: "flex", flexDirection: "column", marginLeft: "16px"  }}>
                  <h5 className="card-title">Areas for Improvement</h5>
                  <p className="card-text">"Scientia potentia est, sed sapientia vera ducit, virtus crescet, fortuna variabilis semper latet."</p>
                  <Badge variant="tooFast" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={secondContainerStyle}>
        <div style={simulationTabsStyle}>
            <Tabs defaultValue="simulationPlayback">
              <TabsList>
                <TabsTrigger value="simulationPlayback">Simulation Playback</TabsTrigger>
                <TabsTrigger value="objectionHandling">Objection Handling</TabsTrigger>
                <TabsTrigger value="feedbackAnalysis">Feedback & Analysis</TabsTrigger>
              </TabsList>
              <TabsContent value="simulationPlayback">Hello</TabsContent>
              <TabsContent value="objectionHandling">Chao.</TabsContent>
              <TabsContent value="feedbackAnalysis">goodybye.</TabsContent>
            </Tabs>
            <Tabs defaultValue="transcript">
              <TabsList>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="transcript">Transcript will go here...</TabsContent>
              <TabsContent value="reviews">Reviews will go here...</TabsContent>
            </Tabs>
        </div>
        <div style={coachingRecommendationStyle}>
          <div className="card display-card" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "20px" }}>Coaching Recommendations</h5>
                <div style={{ display: "flex", flexDirection: "row", marginBottom: "16px", marginTop: "16px" }}>
                  <img src={ Question } alt="Question Mark" style={{ width: "48px", height: "48px" }} />
                  <div style = {{ display: "flex", flexDirection: "column", marginLeft: "16px" }}>
                    <p className="card-title">Improve Discovery Questioning</p>
                    <div className="card-text">Practice asking more open-ended questions to understand the customer's current situation before presenting solutions. Try the SPIN questioning technique (Situation, Problem, Implication, Need-payoff).</div>
                    <a href="#" style={ cardLink }>
                      View Training Resource
                    </a>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginBottom: "16px", marginTop: "16px" }}>
                  <img src={ Graph } alt="Graph" style={{ width: "48px", height: "48px" }} />
                  <div style = {{ display: "flex", flexDirection: "column", marginLeft: "16px" }}>
                    <p className="card-title">Quanity Value Propositions</p>
                    <div className="card-text">When discussing benefits, include specific metrics and ROI figures that are relevant to the customer's industry. This makes your value proposition more compelling and easier to justify.</div>
                    <a href="#" style={ cardLink }>
                      View Training Resource
                    </a>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "16px" }}>
                  <img src={ Message } alt="Question Mark" style={{ width: "48px", height: "48px" }} />
                  <div style = {{ display: "flex", flexDirection: "column", marginLeft: "16px" }}>
                    <p className="card-title">Adjust Speaking Pace</p>
                    <div className="card-text">Try to slow down slightly during technical explanations to ensure clarity. Practice pausing after key points to allow the information to sink in and give the customer time to respond.</div>
                    <a href="#" style={ cardLink }>
                      View Training Resource
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "20px" }}>Book 1:1 Coaching</h5>
                <p className="card-text">Coach Jessica</p>
                <p className="card-text">Peer Review</p>
                <p className="card-text">Practice Plan</p>
              </div>
            </div>
        </div>
      </div>
      <Button variant="primary" className="">
        Add to Training Plan
      </Button>
      </div>
    </div>
  );
}