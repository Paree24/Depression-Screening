import json
import flask
from flask_cors import CORS, cross_origin
import pickle
import numpy as np
import pandas as pd
from pymongo import MongoClient
from bson import json_util 
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
from sentry_sdk import capture_exception


sentry_sdk.init(
    dsn="https://89a7204bf6eb4860843afe8b5188ecaf@o372533.ingest.sentry.io/5196045",
    integrations=[FlaskIntegration()]
)

app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/screen',methods = ['POST'])
@cross_origin()
def screen():
    try:
        req_data = flask.request.get_json()
        print(type(req_data))
        print(req_data)
        test=pd.DataFrame(req_data)
        record=test.to_dict()
        record={k:v[0] for k,v in record.items()}
        print(record)
        f=open('targetencodemodel.sav','rb')
        t=pickle.load(f)
        f.close()
        print("Model Loaded")
        print(t)
        print('\n')
        test=t.transform(test)
        print('done')
        file=open('randomforest.sav','rb')
        model = pickle.load(file)
        level = model.predict(test)
        print(int(level))
        record['predicted_level']=str(level)
        client = MongoClient('localhost', 27017)
        db = client.fyproj
        collection = db.ques
        print("connection_created")
        collection.insert_one(record)
        client.close()
        print("Inserted")
        return str(level)
    except Exception as e:
        capture_exception(e)
        flask.abort(400)

@app.route('/data',methods = ['GET'])
@cross_origin()
def get_data():
    try:
        client = MongoClient('localhost', 27017)
        db = client.fyproj
        collection = db.ques
        print("connection_created")
        cursor=collection.find()
        df =  pd.DataFrame(list(cursor))
        df.to_csv('downloaded.csv')
        print("Saved to downloaded.csv")
        client.close()
        return "Saved"
    except Exception as e:
        capture_exception(e)
        flask.abort(400)
@app.route('/')
def home():
    return "Flask Server is running"
app.run(host = "127.0.0.1", port = 55355)