from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
nltk.download('stopwords')
from predictingmcq import QGen

app = Flask(__name__)

CORS(app) 

@app.route('/mcq_generation', methods=['POST'])
def submit_data():
    json_data = request.get_json()

    # Check if "data" field is present in JSON
    if 'data' in json_data:
        data = json_data['data']
        print("Received data:", data)
    qe=QGen()
    payload={"input_text":data}
    res=qe.predict_mcq(payload)
    return res

if __name__ == '__main__':
    app.run(debug=True)