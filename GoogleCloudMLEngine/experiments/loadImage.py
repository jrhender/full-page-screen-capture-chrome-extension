#taken from https://machinelearningmastery.com/how-to-load-convert-and-save-images-with-the-keras-api/

# example of loading an image with the Keras API
from keras.preprocessing.image import load_img
# load the image
img = load_img('/Users/Henderson/Downloads/bengals_browns_2018-11-25_isAwayTeamTD_2019-6-4T14-14-30-406.png')
# report details about the image
print(type(img))
print(img.format)
print(img.mode)
print(img.size)
# show the image
img.show()