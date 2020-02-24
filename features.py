import pandas as pd
from category_encoders import TargetEncoder

def genderclean(x):
    x=x.strip()
    x=x.lower()
    if "female" in x:
        return 0
    if "male" in x:
        return 1
    else:
        return 2
    return x

def depressionencode(x):
    if x=='No':
        return 0
    if x=='Yes':
        return 2
    else:
        return 1

def getCorr(data):
    print(data.corr()['Depression'])
    return data.corr()['Depression']

def TargetEncode(data):
    data_to_encode=data.select_dtypes(include=['object'])
    print(data_to_encode.columns)
    for col in data_to_encode.columns:
        data[col]=TargetEncoder().fit_transform(X=data[col],y=data['Depression'])
    return data

def get_top_corr(corr,num):
    pass

data=pd.read_csv("cleaned.csv")

if data.columns[0]=='Unnamed: 0':
    data=data.iloc[:,1:]
print(data.head())

types=data.dtypes
print(types)

data['gender ']=data['gender '].apply(genderclean)
print(data['gender '].unique())

data['Depression']=data['Depression'].apply(depressionencode)
print(data['Depression'].unique())

print(data.head())

data=TargetEncode(data)
corr=getCorr(data)