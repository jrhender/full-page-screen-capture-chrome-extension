#taken from https://sefiks.com/2017/12/10/transfer-learning-in-keras-using-inception-v3/

from keras.applications.inception_v3 import InceptionV3
from keras.applications.inception_v3 import preprocess_input
from keras.applications.inception_v3 import decode_predictions

from keras.preprocessing import image
import numpy as np
import matplotlib.pyplot as plt

model = InceptionV3(weights='imagenet', include_top=True)

# print("model structure: ", model.summary())
# print("model weights: ", model.get_weights())

img_path = '/Users/Henderson/Downloads/bengals_browns_2018-11-25_isAwayTeamTD_2019-6-4T14-14-30-406.png'
 
img = image.load_img(img_path, target_size=(299, 299))
x = image.img_to_array(img)
x = np.expand_dims(x, axis = 0)
x = preprocess_input(x)
 
features = model.predict(x)
print(decode_predictions(features, top = 3))
 
plt.imshow(image.load_img(img_path))
plt.show()
