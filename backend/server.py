# Import flask
from zipfile import ZipFile
from flask import Flask, request, redirect, render_template, send_file # . .venv/bin/activate to activate virtual environment before running
from flask_cors import CORS
import datetime

import os
from werkzeug.utils import secure_filename
 
x = datetime.datetime.now()
 
UPLOAD_FOLDER = './photos'
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}

# Initializing flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins":"*"}})

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Home
@app.route('/')
def index():
    return "<h1>Homepage</h1>"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        return redirect(request.url)

    file = request.files['file']

    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    else:
        return "File type not supported."

    return "Uploaded an image."

@app.route('/image', methods=['GET'])
def get_image():
    image_name = request.args.get('img') # Default: value None
    if image_name is None:
        return
    
    stored_images = os.listdir("./photos")
    if image_name in stored_images:
        return send_file(f"./photos/{image_name}", mimetype='image/png')
    
    return

@app.route('/images', methods=['GET'])
def get_images():
    image_names = request.args.get('imgs')
    if image_names is None:
        return
    
    stored_images = os.listdir('./photos')
    image_urls = image_names.split(',') # split urls by comma, assuming ?imgs=url1,url2,url3 etc.

    image_paths = []

    # check if each image url is stored (under photos folder), then 
    for url in image_urls:
        if url in stored_images:
            image_paths.append(url)

    # create a zip file
    zip_filename = "./zip_files/images.zip"
    
    with ZipFile(zip_filename, 'w') as zip_file:
        for image_path in image_paths:
            zip_file.write('./photos/'+image_path, os.path.basename(image_path))

    return send_file(zip_filename, as_attachment=True)
            

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