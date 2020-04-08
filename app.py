import flask
from flask_cors import CORS, cross_origin
import pickle
import numpy as np
import pandas as pd

app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/screen',methods = ['POST'])
@cross_origin()
def screen():
    req_data = flask.request.get_json()
    print(type(req_data))
    print(req_data)
    test=pd.DataFrame(req_data)
    # df=pd.read_csv('notencoded.csv')
    # if df.columns[0]=='Unnamed: 0':
    #     df=df.iloc[:,1:]
    #Read Model from file
    f=open('targetencodemodel.sav','rb')
    t=pickle.load(f)
    f.close()
    print("Model Loaded")
    print(t)
    print('\n')
    # cols=list(df.columns)
    # cols.remove('Depression')
    # print(cols)
    test=t.transform(test)
    print('done')
    # df.to_csv('apienc.csv')
    file=open('randomforest.sav','rb')
    model = pickle.load(file)
    level = model.predict(test)
    print(int(level))
    return str(level)


app.run(host = "0.0.0.0", port = 55355)