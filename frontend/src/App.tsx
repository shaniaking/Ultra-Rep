import React, { useState } from "react";
import "./styles.css";

type PredictionResult = {
  prediction: string;
  message: string;
};

export default function App() {
  const [form, setForm] = useState({
    script_score: "",
    call_time: "",
    sentiment_score: "",
  });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  // Checking for valid input
  const validateInput = () => {
    const s = parseFloat(form.script_score);
    const t = parseFloat(form.call_time);
    const se = parseFloat(form.sentiment_score);
    return (
      !isNaN(s) && s >= 0 && s <= 1 &&
      !isNaN(t) && t >= 0 &&
      !isNaN(se) && se >= -1 && se <= 1
    );
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    
    if (!validateInput()) {
      setError("Invalid input values.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          script_score: form.script_score,
          call_time: form.call_time,
          sentiment_score: form.sentiment_score
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Something went wrong with the prediction.");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Sales Engagement Prediction API</h1>
      <form onSubmit={handleFormSubmit} className="form">
        <div className="form-group">
          <label htmlFor="script_score" className="label">
            Script Score (0.0 - 1.0)
          </label>
          <input
            type="number"
            id="script_score"
            name="script_score"
            value={form.script_score}
            onChange={handleChange}
            step="0.01"
            min="0"
            max="1"
            className="input"
            placeholder="e.g., 0.85"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="call_time" className="label">
            Call Time (minutes)
          </label>
          <input
            type="number"
            id="call_time"
            name="call_time"
            value={form.call_time}
            onChange={handleChange}
            step="0.1"
            min="0"
            className="input"
            placeholder="e.g., 5"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sentiment_score" className="label">
            Sentiment Score (-1.0 to 1.0)
          </label>
          <input
            type="number"
            id="sentiment_score"
            name="sentiment_score"
            value={form.sentiment_score}
            onChange={handleChange}
            step="0.01"
            min="-1"
            max="1"
            className="input"
            placeholder="e.g., 0.5"
            required
          />
        </div>

        <button
        type="submit"
        disabled={loading}
        className={`button ${loading ? "button-disabled" : ""}`}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {error && (
        <p className="error">{error}</p>
      )}

      {result && (
        <div
          className={`result-message ${
            Number(result.prediction) === 1 ? "result-good" : "result-bad"
          }`}
        >
          {result.message} (value: {result.prediction})
        </div>
      )}
    </div>
  );
}
