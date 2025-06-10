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
    
if __name__ == '__main__':
    app.run(debug=True)
