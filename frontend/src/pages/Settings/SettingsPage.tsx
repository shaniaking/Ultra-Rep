import React, { useState } from "react";
import AccountSettings from "./AccountSettings.tsx";
import BillingAndPlans from "./BillingPlans.tsx";
import AICustomization from "./AICustomization.tsx";
import Notifications from "./Notifications.tsx";
import SecurityPrivacy from "./SecurityPrivacy.tsx";
import AdminControlCenter from "./AdminControlCenter.tsx";
import BrandingWhiteLabel from "./BrandingWhiteLabel.tsx";

const sections = [
  { key: "account", label: "Account Settings", component: <AccountSettings /> },
  { key: "billing", label: "Billing and Plans", component: <BillingAndPlans /> },
  { key: "ai", label: "AI Customization", component: <AICustomization /> },
  { key: "notifications", label: "Notifications", component: <Notifications /> },
  { key: "security", label: "Security & Privacy", component: <SecurityPrivacy /> },
  { key: "admin", label: "Admin Control Center", component: <AdminControlCenter /> },
  { key: "branding", label: "Branding & white label", component: <BrandingWhiteLabel /> },
];

export default function SettingsPage() {
  const [current, setCurrent] = useState("account");

  const section = sections.find(s => s.key === current);

  return (
    <div>
      <h2>Settings</h2>
      <div className="mb-3">
        {sections.map((s) => (
          <button
            key={s.key}
            className={`btn btn-outline-primary me-2 ${current === s.key ? "active" : ""}`}
            onClick={() => setCurrent(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div>
        {section?.component}
      </div>
    </div>
  );
}
