from flask import Flask, request, jsonify
from flask_cors import CORS
import requests, os, time

simulate_app = Flask(__name__)
CORS(simulate_app, origins=["http://localhost:3000", "https://your-frontend.com"])

CONVERSION_API_URL = "https://sales-engagement-api.onrender.com/predict"
REPLY_API_URL      = os.getenv("REPLY_API_URL",      "https://reply-likelihood-api.onrender.com/predict")
FEEDBACK_API_URL   = os.getenv("FEEDBACK_API_URL",   "https://feedback-score-api.onrender.com/predict")

def try_post(url, payload, timeout=60):
    """post once, if 404 and no trailing slash, try with slash once"""
    r = requests.post(url, json=payload, timeout=timeout)
    if r.status_code == 404 and not url.endswith("/"):
        r = requests.post(url + "/", json=payload, timeout=timeout)
    return r

def forward(url, payload):
    try:
        r = try_post(url, payload, timeout=60)
    except requests.exceptions.ReadTimeout:
        # wake the service then retry once
        try:
            base = url.rsplit("/", 1)[0]
            requests.get(base, timeout=10)
            time.sleep(2)
        except Exception:
            pass
        r = try_post(url, payload, timeout=60)

    # try to return JSON, otherwise surface the body so you can see the issue
    try:
        data = r.json()
        return jsonify(data), r.status_code
    except ValueError:
        return jsonify({
            "error": "Sub-API did not return JSON",
            "status": r.status_code,
            "url": url,
            "text": r.text[:500]
        }), 502

@simulate_app.route("/simulate", methods=["POST"])
def simulate():
    data = request.get_json(silent=True) or {}
    sim_type = data.get("simulation_type")
    input_data = data.get("input_data")
    if not sim_type or not input_data:
        return jsonify({"error": "Missing simulation_type or input_data"}), 400

    if sim_type == "conversion":
        return forward(CONVERSION_API_URL, input_data)
    elif sim_type == "reply":
        return forward(REPLY_API_URL, input_data)
    elif sim_type == "feedback":
        return forward(FEEDBACK_API_URL, input_data)
    else:
        return jsonify({"error": "Invalid simulation_type"}), 400

# simple health ping
@simulate_app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "simulate router alive"})

if __name__ == "__main__":
    simulate_app.run(port=5050, debug=True)
