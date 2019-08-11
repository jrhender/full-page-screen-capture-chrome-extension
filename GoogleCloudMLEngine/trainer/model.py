"""Defines a Keras model and input function for training."""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from keras.applications.inception_v3 import InceptionV3
from keras.preprocessing import image
from keras.applications.inception_v3 import preprocess_input, decode_predictions
from io import BytesIO
import numpy as np
import pandas as pd
import requests

model = InceptionV3(weights='imagenet')  #https://keras.io/applications/#inceptionv3

url = 'https://github.com/hayatoy/deep-learning-datasets/releases/download/v0.1/tl_opera_capitol.npz'
response = requests.get(url)
dataset = np.load(BytesIO(response.content))

X_dataset = dataset['features']
y_dataset = dataset['labels']

from keras.utils import np_utils
from sklearn.model_selection import train_test_split

X_dataset = preprocess_input(X_dataset)
y_dataset = np_utils.to_categorical(y_dataset)
X_train, X_test, y_train, y_test = train_test_split(
    X_dataset, y_dataset, test_size=0.2, random_state=42)