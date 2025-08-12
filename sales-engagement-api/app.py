# app.py — Sales Engagement (Conversion) API
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
app.url_map.strict_slashes = False  # make /predict and /predict/ both work
CORS(app, origins=["http://localhost:3000", "https://your-frontend.com"])

# Load model once at startup
MODEL_PATH = os.getenv("MODEL_PATH", "sales_model.pkl")
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    raise RuntimeError(f"Failed to load model from {MODEL_PATH}: {e}")

FEATURES = ["call_time", "sentiment_score", "script_score"]

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(silent=True) or {}
        # Validate + coerce numeric fields
        row = []
        for col in FEATURES:
            if col not in data:
                return jsonify({"error": f"Missing field: '{col}'"}), 400
            try:
                row.append(float(data[col]))
            except (TypeError, ValueError):
                return jsonify({"error": f"Invalid value for '{col}': {data[col]} (must be numeric)"}), 400

        df = pd.DataFrame([row], columns=FEATURES)
        y = int(model.predict(df)[0])

        # Optional: include proba if the model supports it
        proba = None
        try:
            proba = float(model.predict_proba(df)[0, 1])
        except Exception:
            pass

        payload = {
            "prediction": y,
            "message": "Likely to Convert" if y == 1 else "Unlikely to Convert",
        }
        if proba is not None:
            payload["probability"] = proba

        return jsonify(payload)

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/", methods=["GET", "POST"])
def home():
    prediction_result = ""

    if request.method == "POST":
        try:
            script_score = float(request.form["script_score"])
            call_time = float(request.form["call_time"])
            sentiment_score = float(request.form["sentiment_score"])

            df = pd.DataFrame([[call_time, sentiment_score, script_score]], columns=FEATURES)
            y = int(model.predict(df)[0])
            message = "Likely to Convert" if y == 1 else "Unlikely to Convert"
            prediction_result = f"<h3>Prediction: {message} (value: {y})</h3>"

        except Exception as e:
            prediction_result = f"<p style='color:red;'>Error: {str(e)}</p>"

    return f"""
        <h1>Sales Engagement Prediction API is now running.</h1>
        <form method="post">
            <label>Script Score (0.0 - 1.0):</label><br>
            <input type="text" name="script_score" required><br><br>

            <label>Call Time (minutes):</label><br>
            <input type="text" name="call_time" required><br><br>

            <label>Sentiment Score (-1.0 to 1.0):</label><br>
            <input type="text" name="sentiment_score" required><br><br>

            <input type="submit" value="Predict">
        </form>
        <br>
        {prediction_result}
    """

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
