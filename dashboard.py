import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd
import plotly.graph_objects as go
import numpy as np
from pymongo import MongoClient
from bson import json_util 
import json

app = dash.Dash(__name__)
application = app.server
client = MongoClient('localhost', 27017)
db = client.fyproj
collection = db.ques
print("connection_created")
cursor=collection.find()
data=pd.DataFrame(list(cursor))
# del data['Unnamed: 0']
del data['_id']
cols=[]
for i in data.columns:
    cols.append({'label':i,'value':i})
print(len(cols))

app.layout = html.Div([
    html.Div([
        html.Div(
            [
                html.Img(
                    src="https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg",
                    className='two columns',
                    style={
                        'height': '5%',
                        'width': '5%',
                        'float': 'left',
                        'position': 'relative',
                        'margin-top': 10,
                        'margin-right':50,
                    },
                ),
                html.H2(children='Admin Dashboard',
                        className='ten columns',style={'color':'#333333'})
            ],id='title', className="row"
        ),]),
    html.Div([
        html.Div([html.H4("Questionnaire Statistics")],className='twelve columns'),
        html.Div([dcc.Dropdown(
                    id='dropdown',
                    options=cols,
                    value='interferes_with_work')],className='twelve columns'),
        html.Div(
            [
            html.Div([
                dcc.Graph(id='v_line')
                ], className= 'six columns'
                ),

            html.Div(
                [ dcc.Graph(id='bar')
                ], className="six columns"
            )
            ], className="row"
        ),
    ], className='ten columns offset-by-one')
])

@app.callback(dash.dependencies.Output('v_line','figure'),
              [dash.dependencies.Input('dropdown','value')])
def  update_graph(selector):
    df=data[selector].value_counts()
    print(type(df))
    pie=go.Pie(labels=df.index,values=df)
    figure={
            'data': [pie],
            'layout':go.Layout(title="Pie Chart")
            }
    return figure

@app.callback(dash.dependencies.Output('bar','figure'),
              [dash.dependencies.Input('dropdown','value')])
def  update_graph_2(selector):
    df=data[selector].value_counts()
    print(type(df))
    plot=go.Bar(x=df.index,y=df)
    figure={
            'data': [plot],
            'layout':go.Layout(title="Bar Chart")
            }
    return figure

if __name__ == '__main__':
    application.run(debug=False)
