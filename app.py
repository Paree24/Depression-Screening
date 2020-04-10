import flask
from flask_cors import CORS, cross_origin
import pickle
import numpy as np
import pandas as pd
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
        return str(level)
    except Exception as e:
        capture_exception(e)
        flask.abort(400)

app.run(host = "0.0.0.0", port = 55355)