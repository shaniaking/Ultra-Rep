from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

# Load the trained model
model = joblib.load('feedback_model.pkl')
r_squared = 0.37  # Hardcoded R² value from training

app = Flask(__name__)
app.url_map.strict_slashes = False  # make /predict and /predict/ both work
CORS(app, origins=["http://localhost:3000", "https://your-frontend.com"])

FEATURES = ['coaching_score', 'avg_closing', 'onboard_time', 'tasks_completed']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(silent=True) or {}
        # Normalize + validate numeric fields
        row = []
        for col in FEATURES:
            val = data.get(col, None)
            if val is None:
                return jsonify({"error": f"Missing field: '{col}'"}), 400
            try:
                row.append(float(val))
            except (TypeError, ValueError):
                return jsonify({"error": f"Invalid value for '{col}': {val} (must be numeric)"}), 400

        df = pd.DataFrame([row], columns=FEATURES)
        prediction = float(model.predict(df)[0])

        try:
            entry = {**data, 'predicted_feedback_score': round(prediction, 2)}
            pd.DataFrame([entry]).to_csv(
                'feedback_prediction.csv',
                mode='a',
                header=not os.path.exists('feedback_prediction.csv'),
                index=False
            )
        except Exception:
            pass  # don't fail the API on logging issues

        return jsonify({
            'predicted_feedback_score': round(prediction, 2),
            'r_squared': r_squared
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/', methods=['GET', 'POST'])
def form():
    result = ""

    if request.method == 'POST':
        try:
            coaching_score = float(request.form['coaching_score'])
            avg_closing = float(request.form['avg_closing'])
            onboard_time = float(request.form['onboard_time'])
            tasks_completed = float(request.form['tasks_completed'])

            df = pd.DataFrame([[coaching_score, avg_closing, onboard_time, tasks_completed]],
                              columns=FEATURES)
            prediction = float(model.predict(df)[0])
            result = f"<h3>Predicted Feedback Score: {round(prediction, 2)}</h3><p>R²: {r_squared}</p>"

        except Exception as e:
            result = f"<p style='color:red;'>Error: {str(e)}</p>"

    return f"""
        <h2>Feedback Score Prediction</h2>
        <form method="POST" action="/">
            <label>Coaching Score:</label><br>
            <input type="text" name="coaching_score" required><br><br>

            <label>Average Closing:</label><br>
            <input type="text" name="avg_closing" required><br><br>

            <label>Onboarding Time:</label><br>
            <input type="text" name="onboard_time" required><br><br>

            <label>Tasks Completed:</label><br>
            <input type="text" name="tasks_completed" required><br><br>

            <input type="submit" value="Predict">
        </form>
        <br>
        {result}
    """

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5002))
    app.run(host="0.0.0.0", port=port)
