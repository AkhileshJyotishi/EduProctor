from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
nltk.download('stopwords')
from Backend.QuestionGeneration.predict_mcq import QGen
app = Flask(__name__)

CORS(app) 

@app.route('/mcq_generation', methods=['POST'])
def submit_data():
    data = request.json
    print(data)
    qe=QGen()
    payload={"input_text":data}
    res=qe.predict_mcq(payload)
    return res

if __name__ == '__main__':
    app.run(debug=True)