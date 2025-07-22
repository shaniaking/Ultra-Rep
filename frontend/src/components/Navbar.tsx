import { NavLink } from "react-router-dom";
import "./NavBar.css";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/simulations", label: "Simulations" },
  { to: "/coaching", label: "Coaching" },
  { to: "/virtual-assistance", label: "Virtual Assistance" },
  { to: "/analytics-reporting", label: "Analytics & Reporting" },
  { to: "/team-roles", label: "Team & Roles" },
  { to: "/marketing-tools", label: "Marketing Tools" },
  { to: "/integrations", label: "Integrations" },
  { to: "/settings", label: "Settings" },
  { to: "/predictions", label: "Predictions" },
];

export default function NavBar() {
  return (
    <aside className="navbar">
      <nav>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
