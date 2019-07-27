#Setup of Python Client
Used the article [here](https://cloud.google.com/storage/docs/reference/libraries)
As per the article, the credentials are given to the python environment for the current shell session by using `export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"`

#Usage
Run python to generate csv, manually upload to Google Cloud

#Dependencies
installed, using pip:
- google-cloud-storage
- google-cloud-automl
Note: installed them into a virtual environment which can be activated by running "source env/bin/activate"

#Converting Google AutoML models to TensorflowJs
Good documentation can be found at the tfjs-converter [readme](https://github.com/tensorflow/tfjs-converter)
##Comand used
sudo env/bin/tensorflowjs_converter --input_format=tf_saved_model --output_format=tfjs_graph_model ./models/AutoML_models ./models/Tensorflowjs_models

Note: converting from AutoML Vision Edge to tensorflowjs support is documented here: https://github.com/tensorflow/tfjs/issues/1513