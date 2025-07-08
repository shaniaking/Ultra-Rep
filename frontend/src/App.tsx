import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar.tsx";
import SimulationsPage from "./pages/Simulations/SimulationsPage.tsx";
import CreateSimulationPage from "./pages/Simulations/CreateSimPage.tsx";
import CustomScenarioBuilderPage from "./pages/Simulations/CustomScenarioPage.tsx";
import RealTimeSimulationPage from "./pages/Simulations/RealTimeSimPage.tsx";
import SimulationReportPage from "./pages/Simulations/SimReportPage.tsx";
import CoachingPage from "./pages/Coaching/CoachingPage.tsx";
import VirtualAssistancePage from "./pages/VirtualAssistance/VirtualAssistancePage.tsx";
import AnalyticsReportingPage from "./pages/AnalyticsReporting/AnalyticsReportingPage.tsx";
import TeamRolesPage from "./pages/TeamRoles/TeamRolesPage.tsx";
import IntegrationsPage from "./pages/Intergrations/IntegrationsPage.tsx";
import MarketingToolsPage from "./pages/MarketingTools/MarketingToolsPage.tsx";
import SettingsPage from "./pages/Settings/SettingsPage.tsx";
import PredictionPage from "./pages/PredictionPage.tsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.tsx";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <NavBar />
        <main style={{
          flex: 1,
          marginLeft: 250,
          padding: "2rem",
          minHeight: "100vh",
          background: "#00001e",
        }}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/simulations" element={<SimulationsPage />} />
            <Route path="/simulations/create" element={<CreateSimulationPage />} />
            <Route path="/simulations/custom" element={<CustomScenarioBuilderPage />} />
            <Route path="/simulations/real-time" element={<RealTimeSimulationPage />} />
            <Route path="/simulations/report" element={<SimulationReportPage />} />
            <Route path="/coaching" element={<CoachingPage />} />
            <Route path="/virtual-assistance" element={<VirtualAssistancePage />} />
            <Route path="/analytics-reporting" element={<AnalyticsReportingPage />} />
            <Route path="/team-roles" element={<TeamRolesPage />} />
            <Route path="/marketing-tools" element={<MarketingToolsPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/predictions" element={<PredictionPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;