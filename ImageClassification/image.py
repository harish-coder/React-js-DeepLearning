import sys
import os
import glob
import re
import numpy as np

from flask_cors import CORS
import pandas as pd
from flask_jsonpify import jsonpify

# Flask utils
from flask import Flask, redirect, url_for, request, render_template,jsonify
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer



# Keras
from keras.applications.imagenet_utils import preprocess_input, decode_predictions
from keras.models import load_model
from keras.preprocessing import image

# Define a flask app
app = Flask(__name__)

# Model saved with Keras model.save()
MODEL_PATH = 'model/images.h5'
# Load your trained model
model = load_model(MODEL_PATH)

CORS(app)



@app.route("/" , methods=['GET'])
def index():
    return "Image Classification";



def model_predict(img_path, model):
    img = image.load_img(img_path, target_size=(224, 224))

    # Preprocessing the image
    x = image.img_to_array(img)
    # x = np.true_divide(x, 255)
    x = np.expand_dims(x, axis=0)

    # Be careful how your trained model deals with the input
    # otherwise, it won't make correct prediction!
    x = preprocess_input(x, mode='caffe')

    preds = model.predict(x)
    return preds


@app.route('/predict', methods=['GET', 'POST'])
def upload():
	names = []
	scores = []

	f = request.files['file']
	print(f.filename)
	basepath = os.path.dirname(__file__)
	file_path = os.path.join(
		basepath, 'uploads', secure_filename(f.filename))
	f.save(file_path)
	# Make prediction
	preds = model_predict(file_path, model)
	# Process your result for human
	# pred_class = preds.argmax(axis=-1)            # Simple argmax
	pred_class = decode_predictions(preds, top=10)  # ImageNet Decode
	for preTuple in pred_class[0]:
		preList = list(preTuple)
		names.append(preList[1])
		scores.append(str(preList[2]))
	return jsonify({'names':names,
						   'scores':scores});



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
