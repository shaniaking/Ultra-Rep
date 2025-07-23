import React from "react";
import FormField from "./FormField.tsx";
import TagInput from "./TagInput.tsx";
import RangeSlider from "./RangeSlider.tsx";

interface SimulationSettingsProps {
  persona: string;
  onPersonaChange: (persona: string) => void;
  callTone: string;
  onCallToneChange: (tone: string) => void;
  objections: string[];
  onObjectionsChange: (objections: string[]) => void;
  duration: number;
  onDurationChange: (duration: number) => void;
}

const CALL_TONE_OPTIONS = ["Professional", "Friendly", "Assertive", "Casual"];

const OBJECTION_SUGGESTIONS = [
  "Price concerns",
  "Timing",
  "Competitors",
  "Trust/Authority",
  "ROI doubt",
];

export default function SimulationSettings({
  persona,
  onPersonaChange,
  callTone,
  onCallToneChange,
  objections,
  onObjectionsChange,
  duration,
  onDurationChange,
}: SimulationSettingsProps) {
  return (
    <div
      style={{
        width: 340,
        background: "#101a3c",
        padding: 24,
        color: "#fff",
        minHeight: "100vh",
        paddingTop: "32px",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        right: 0,
        top: 70,
        bottom: 0,
      }}
    >
      <h5 className="mb-4">Simulation Settings</h5>

      <FormField label="Customer Persona">
        <textarea
          className="form-control"
          style={{
            background: "#172343",
            color: "#fff",
            border: "1px solid #2E3956",
            fontSize: 14,
            padding: "10px 12px",
          }}
          rows={3}
          value={persona}
          onChange={(e) => onPersonaChange(e.target.value)}
          placeholder="Describe your ideal customer"
        />
      </FormField>

      <FormField label="Call Tone">
        <select
          className="form-select"
          style={{
            background: "#172343",
            color: "#fff",
            fontSize: 14,
            border: "1px solid #2E3956",
          }}
          value={callTone}
          onChange={(e) => onCallToneChange(e.target.value)}
        >
          {CALL_TONE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </FormField>

      <TagInput
        label="Common Objections"
        tags={objections}
        onTagsChange={onObjectionsChange}
        suggestions={OBJECTION_SUGGESTIONS}
        placeholder="Type and press Enter..."
      />

      <RangeSlider
        label="Estimated Duration"
        value={duration}
        min={3}
        max={15}
        unit="mins"
        onChange={onDurationChange}
      />
    </div>
  );
}
