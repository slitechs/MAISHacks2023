# Import flask
from flask import Flask # . .venv/bin/activate to activate virtual environment before running
import datetime
 
x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)


# Route for seeing a data
@app.route('/')
def index():
    return "<h1>Homepage</h1>"


# Route for seeing a data
@app.route('/data')
def get_time():
 
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek",
        "Age":"22",
        "Date":x,
        "programming":"python"
        }
 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)