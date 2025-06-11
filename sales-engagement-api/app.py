from flask import Flask, request, jsonify
import pandas as pd
import joblib

# load model
model = joblib.load('sales_model.pkl')

# flask app
app = Flask(__name__)

@app.route('/')
def home():
    return "Sales Engagement Prediction API is now running."

# make the prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # column order 
        columns = ['script_score', 'call_time', 'sentiment_score']
        df = pd.DataFrame([[data[col] for col in columns]], columns=columns)

        # disable feature names checking 
        prediction = model.predict(df.to_numpy())[0]

        return jsonify({
            'prediction': int(prediction),
            'message': "Likely to Convert" if prediction == 1 else "Unlikely to Convert"
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
# hardcoded prediciton
@app.route('/', methods=['GET'])
def demo_prediction():
    # example hardcoded input values
    demo_input = {
        "script_score": 0.7,
        "call_time": 4.2,
        "sentiment_score": 0.3
    }

    columns = ['script_score', 'call_time', 'sentiment_score']
    df = pd.DataFrame([[demo_input[col] for col in columns]], columns=columns)
    prediction = model.predict(df.to_numpy())[0]

    message = "Likely to Convert" if prediction == 1 else "Unlikely to Convert"
    return f"<h2>Prediction: {message} (value: {prediction})</h2>"
    
if __name__ == '__main__':
    app.run(debug=True)
