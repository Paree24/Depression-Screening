screen --version
screen -S work -d -m bash -c 'python -m http.server'
screen -S work -d -m bash -c 'python dashboard.py'
python app.py
