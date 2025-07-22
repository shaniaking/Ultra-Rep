from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os

# Load the trained model
model = joblib.load('feedback_model.pkl')
r_squared = 0.37  # Hardcoded R² value from training

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Expected input columns
        columns = ['coaching_score', 'avg_closing', 'onboard_time', 'tasks_completed']
        df = pd.DataFrame([[data.get(col, 0) for col in columns]], columns=columns)

        prediction = model.predict(df)[0]

        # Save prediction log
        full_entry = data.copy()
        full_entry['predicted_feedback_score'] = round(float(prediction), 2)
        pd.DataFrame([full_entry]).to_csv('feedback_prediction.csv', mode='a', header=not os.path.exists('feedback_prediction.csv'), index=False)

        return jsonify({
            'predicted_feedback_score': round(float(prediction), 2),
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
                              columns=['coaching_score', 'avg_closing', 'onboard_time', 'tasks_completed'])
            prediction = model.predict(df)[0]
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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5002))
    app.run(host="0.0.0.0", port=port)
