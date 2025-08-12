# app.py
from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
app.url_map.strict_slashes = False  # /predict and /predict/ both work
CORS(app, origins=["http://localhost:3000", "https://your-frontend.com"])

# ---- Load model ----
MODEL_PATH = os.getenv("MODEL_PATH", "outreach_model.pkl")
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    # Fail fast with a helpful message in logs
    raise RuntimeError(f"Failed to load model from {MODEL_PATH}: {e}")

# ---- Exact feature order expected by the model ----
FEATURE_ORDER = [
    "followups",
    "response_time",
    "type_DM",
    "type_Email",
    "type_LinkedIn",
    "followups_type_email",
    "followups_type_linkedin",
    "followups_type_dm",
]

# -------------------------
# JSON API: POST /predict
# -------------------------
@app.route("/predict", methods=["POST"])
def predict_api():
    data = request.get_json(silent=True) or {}

    # Path A: client sent the full engineered feature set
    if all(k in data for k in FEATURE_ORDER):
        try:
            row = [data[k] for k in FEATURE_ORDER]
        except KeyError as e:
            return jsonify({"error": f"Missing feature: {e.args[0]}"}), 400

    # Path B: simple inputs -> build features here
    else:
        try:
            followups = int(data.get("followups"))
            response_time = float(data.get("response_time"))
        except (TypeError, ValueError):
            return jsonify({
                "error": "Missing or invalid numeric fields: 'followups' (int), 'response_time' (float)"
            }), 400

        t_raw = (data.get("type") or "").strip().lower()
        if t_raw in ("dm", "direct", "directmessage"):
            t = "dm"
        elif t_raw in ("email", "e-mail"):
            t = "email"
        elif t_raw in ("linkedin", "li"):
            t = "linkedin"
        elif t_raw in ("call", "phone", "phonecall"):
            t = "call"
        else:
            return jsonify({
                "error": "Invalid or missing 'type' (use one of: Call, LinkedIn, Email, DM)"
            }), 400

        type_DM = 1 if t == "dm" else 0
        type_Email = 1 if t == "email" else 0
        type_LinkedIn = 1 if t == "linkedin" else 0

        row = [
            followups,
            response_time,
            type_DM,
            type_Email,
            type_LinkedIn,
            followups * type_Email,
            followups * type_LinkedIn,
            followups * type_DM,
        ]

    df = pd.DataFrame([row], columns=FEATURE_ORDER)
    try:
        proba = float(model.predict_proba(df)[0, 1])  # probability of reply (class 1)
    except Exception as e:
        return jsonify({"error": f"Model inference failed: {str(e)}"}), 500

    return jsonify({"reply_likelihood": proba})

# -------------------------
# HTML form at /
# -------------------------
@app.route("/", methods=["GET", "POST"])
def predict_form():
    result = None
    error = None

    if request.method == "POST":
        try:
            followups = int(request.form.get("followups", 0))
            response_time = float(request.form.get("response_time", 0))
            outreach_type = (request.form.get("type", "Call") or "Call").strip()

            # Build JSON payload for /predict to keep logic in one place
            payload = {
                "followups": followups,
                "response_time": response_time,
                "type": outreach_type,
            }
            # Do inference inline to avoid making an HTTP request to our own server
            t = outreach_type.lower()
            type_DM = 1 if t == "dm" else 0
            type_Email = 1 if t == "email" else 0
            type_LinkedIn = 1 if t == "linkedin" else 0

            row = [
                followups,
                response_time,
                type_DM,
                type_Email,
                type_LinkedIn,
                followups * type_Email,
                followups * type_LinkedIn,
                followups * type_DM,
            ]
            df = pd.DataFrame([row], columns=FEATURE_ORDER)
            proba = float(model.predict_proba(df)[0, 1])
            result = f"Estimated Likelihood of Reply: {round(proba * 100, 2)}%"

        except Exception as e:
            error = f"Error: {str(e)}"

    return render_template_string("""
        <h2>Reply Likelihood Predictor</h2>
        <form method="post">
            <label>Followups (0–5):</label><br>
            <input type="number" name="followups" min="0" max="5" required><br><br>

            <label>Response Time (0–48 hours):</label><br>
            <input type="number" name="response_time" step="0.1" min="0" max="48" required><br><br>

            <label>Outreach Type:</label><br>
            <select name="type">
                <option value="Call">Call</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Email">Email</option>
                <option value="DM">DM</option>
            </select><br><br>

            <input type="submit" value="Predict">
        </form>
        {% if result %}
            <h3>{{ result }}</h3>
        {% endif %}
        {% if error %}
            <p style="color:red;">{{ error }}</p>
        {% endif %}
    """, result=result, error=error)

# Health ping
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

# For local dev or Render
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)
