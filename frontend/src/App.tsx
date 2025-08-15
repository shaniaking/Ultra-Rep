import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar.tsx";
import TopBar from "./components/TopBar.tsx";
import SimulationsPage from "./pages/Simulations/SimulationsPage.tsx";
import CustomScenarioPage from "./pages/Simulations/CustomScenarioPage.tsx";
import RealTimeSimPage from "./pages/Simulations/RealTimeSimPage.tsx";
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

const NAVBAR_WIDTH = 250;
const TOPBAR_HEIGHT = 70;

function AppWrapper() {
  const location = useLocation();

  // Hiding the sidebar
  const hideNavRoutes = ["/simulations/custom", "/simulations/real-time"];
  const shouldHideNav = hideNavRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  const simMode = location.pathname.startsWith("/simulations/real-time");

  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#00001e" }}>
      {!shouldHideNav && <NavBar />}
      <TopBar
        simMode={simMode}
        onCancel={() => navigate("/simulations/custom")}
        onComplete={() => navigate("/simulations/report")}
      />
      {/* Main content area */}
      <main
        style={{
          flex: 1,
          background: "#081028",
          position: "relative",
          transition: "margin-left 0.2s, padding-top 0.2s",
          marginLeft: !shouldHideNav ? NAVBAR_WIDTH : 0,
          padding: "2rem",
          paddingTop: TOPBAR_HEIGHT * 1.5,
        }}
      >
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/simulations" element={<SimulationsPage />} />
          <Route path="/simulations/custom" element={<CustomScenarioPage />} />
          <Route path="/simulations/real-time" element={<RealTimeSimPage />} />
          <Route
            path="/simulations/report"
            element={<SimulationReportPage />}
          />
          <Route path="/coaching" element={<CoachingPage />} />
          <Route
            path="/virtual-assistance"
            element={<VirtualAssistancePage />}
          />
          <Route
            path="/analytics-reporting"
            element={<AnalyticsReportingPage />}
          />
          <Route path="/team-roles" element={<TeamRolesPage />} />
          <Route path="/marketing-tools" element={<MarketingToolsPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/predictions" element={<PredictionPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
