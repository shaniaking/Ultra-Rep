from flask import Flask, request, jsonify, render_template_string
import pandas as pd
import joblib
import os

# Load the trained model
model = joblib.load('outreach_model.pkl')
app = Flask(__name__)

# Exact feature order expected by the model
FEATURE_ORDER = [
    'followups',
    'response_time',
    'type_DM',
    'type_Email',
    'type_LinkedIn',
    'followups_type_email',
    'followups_type_linkedin',
    'followups_type_dm'
]

@app.route('/', methods=['GET', 'POST'])
def predict_form():
    result = None
    if request.method == 'POST':
        try:
            followups = int(request.form.get('followups', 0))
            response_time = float(request.form.get('response_time', 0))
            outreach_type = request.form.get('type', 'Call').capitalize()

            # One-hot encode and generate interaction features
            type_DM = 1 if outreach_type == 'DM' else 0
            type_Email = 1 if outreach_type == 'Email' else 0
            type_LinkedIn = 1 if outreach_type == 'LinkedIn' else 0

            input_dict = {
                'followups': followups,
                'response_time': response_time,
                'type_DM': type_DM,
                'type_Email': type_Email,
                'type_LinkedIn': type_LinkedIn,
                'followups_type_email': followups * type_Email,
                'followups_type_linkedin': followups * type_LinkedIn,
                'followups_type_dm': followups * type_DM
            }

            # Ensure correct feature order
            df = pd.DataFrame([[input_dict[feature] for feature in FEATURE_ORDER]], columns=FEATURE_ORDER)

            # Get predicted probability (of reply = class 1)
            proba = model.predict_proba(df)[0][1]
            result = f"Estimated Likelihood of Reply: {round(proba * 100, 2)}%"

            # Save to CSV log
            input_dict['reply_probability'] = round(proba, 4)
            pd.DataFrame([input_dict]).to_csv('Outreach.csv', mode='a', header=not os.path.exists('Outreach.csv'), index=False)

        except Exception as e:
            result = f"Error: {str(e)}"

    return render_template_string("""
        <h2>Reply Likelihood Predictor</h2>
        <form method="post">
            <label>Followups (0–5):</label><br>
            <input type="number" name="followups" required><br><br>

            <label>Response Time (0–48 hours):</label><br>
            <input type="number" name="response_time" step="0.1" required><br><br>

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
    """, result=result)

# For local dev or Render
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)
