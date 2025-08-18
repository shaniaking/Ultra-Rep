import React from "react";
import { useLocation } from "react-router-dom";
import ProgressCard from "../../components/ProgressCard.tsx";
import Button from "../../components/Button.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/Tabs.tsx";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
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

const secondContainerStyle: React.CSSProperties = {
  display: "flex",
  width: "100%",
  flexDirection: "row",
}

const simulationTabsStyle: React.CSSProperties = {
  display: "flex",
  width: "33%",
  flexDirection: "column",
}

const coachingRecommendationStyle: React.CSSProperties = {
  display: "flex",
  width: "66%%",
  marginLeft: "16px",
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
        <div style={performanceHighlightsContainerStyle}>
          Performance Highlights
          <div className="strengths">
            <div className="card mb-3 display-card">
              <div className="card-body">
                <h5 className="card-title">Strengths</h5>
                <p className="card-text"> mins</p>
              </div>
            </div>
          </div>
          <div className="areas-for-improvement">
            <div className="card mb-3 display-card">
              <div className="card-body">
                <h5 className="card-title">Areas for Improvement</h5>
                <p className="card-text"> mins</p>
              </div>
            </div>
          </div>
          </div>
        <div style={keyMomentsContainerStyle}>
          Key Moments
          <div className="strengths">
            <div className="card mb-3 display-card">
              <div className="card-body">
                <h5 className="card-title">Strengths</h5>
                <p className="card-text"> mins</p>
              </div>
            </div>
          </div>
          <div className="areas-for-improvement">
            <div className="card mb-3 display-card">
              <div className="card-body">
                <h5 className="card-title">Areas for Improvement</h5>
                <p className="card-text"> mins</p>
              </div>
            </div>
          </div>
          <div className="areas-for-improvement">
            <div className="card mb-3 display-card">
              <div className="card-body">
                <h5 className="card-title">Areas for Improvement</h5>
                <p className="card-text"> mins</p>
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
          <div className="card display-card">
              <div className="card-body">
                <h5 className="card-title">Coaching Recommendations</h5>
                <p className="card-text"> mins</p>
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
