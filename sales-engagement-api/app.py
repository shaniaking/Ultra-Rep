from flask import Flask, request, jsonify
import pandas as pd
import joblib

model = joblib.load('sales_model.pkl')
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # column order 
        columns = ['script_score', 'call_time', 'sentiment_score']
        df = pd.DataFrame([[data[col] for col in columns]], columns=columns)

        prediction = model.predict(df.to_numpy())[0]

        return jsonify({
            'prediction': int(prediction),
            'message': "Likely to Convert" if prediction == 1 else "Unlikely to Convert"
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/', methods=['GET', 'POST'])
def home():
    prediction_result = ""

    if request.method == 'POST':
        try:
            script_score = float(request.form['script_score'])
            call_time = float(request.form['call_time'])
            sentiment_score = float(request.form['sentiment_score'])

            columns = ['script_score', 'call_time', 'sentiment_score']
            df = pd.DataFrame([[script_score, call_time, sentiment_score]], columns=columns)
            prediction = model.predict(df.to_numpy())[0]
            message = "Likely to Convert" if prediction == 1 else "Unlikely to Convert"
            prediction_result = f"<h3>Prediction: {message} (value: {prediction})</h3>"

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
#for Render
import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000)) 
    app.run(host="0.0.0.0", port=port)
