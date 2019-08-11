from keras.models import load_model
from keras.applications.mobilenet import preprocess_input

from keras.preprocessing import image
import numpy as np
import matplotlib.pyplot as plt

from os import listdir
from os.path import isfile, join

model = load_model('model1.h5')

# print("model structure: ", model.summary())
# print("model weights: ", model.get_weights())

mypath = "/Users/Henderson/Documents/projects/FullPageScreenCapture/full-page-screen-capture-chrome-extension/GoogleCloudMLEngine/images/sportseventdetection-football/Test"
for f in listdir(mypath):
    print(join(mypath, f))
    img_path = join(mypath, f)
    
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis = 0)
    x = preprocess_input(x)
    
    features = model.predict(x)
    print(features)
