from keras.models import load_model
from keras.applications.mobilenet import preprocess_input
from keras.preprocessing.image import ImageDataGenerator

import pandas as pd
import numpy as np

#Just have train_generator to get labels
train_datagen=ImageDataGenerator(preprocessing_function=preprocess_input) #included in our dependencies
train_generator=train_datagen.flow_from_directory('./../images/sportseventdetection-football/train/',
                                                 target_size=(224,224),
                                                 color_mode='rgb',
                                                 batch_size=8,
                                                 class_mode='categorical',
                                                 shuffle=True)


model = load_model('model3.h5')

test_datagen=ImageDataGenerator(preprocessing_function=preprocess_input) #included in our dependencies
test_generator = test_datagen.flow_from_directory(
    directory='./../images/sportseventdetection-football/test/',
    target_size=(224, 224),
    color_mode="rgb",
    batch_size=1,
    class_mode=None,
    shuffle=False,
    seed=42
)

STEP_SIZE_TEST=test_generator.n//test_generator.batch_size
test_generator.reset()
pred=model.predict_generator(test_generator,
    steps=STEP_SIZE_TEST,
    verbose=1)

predicted_class_indices=np.argmax(pred,axis=1)
labels = (train_generator.class_indices)
labels = dict((v,k) for k,v in labels.items())
predictions = [labels[k] for k in predicted_class_indices]
filenames=test_generator.filenames
results=pd.DataFrame({"Filename":filenames,
                      "Predictions":predictions})
print(results.to_string())
results.to_csv("results.csv",index=False)