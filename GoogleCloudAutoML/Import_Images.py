# Code taken from this link: https://cloud.google.com/vision/automl/docs/create-datasets
# TODO(developer): Uncomment and set the following variables
project_id = 'sportseventdetection'
compute_region = 'us-central1' #Can this work in any other regions? Would that change performance?
dataset_id = 'touchdown_set_1'
path = 'gs://sporteventdetection-football/sports_images.csv'

from google.cloud import automl_v1beta1 as automl

client = automl.AutoMlClient()

# Get the full path of the dataset.
dataset_full_id = client.dataset_path(
    project_id, compute_region, dataset_id
)

# Get the multiple Google Cloud Storage URIs.
input_uris = path.split(",")
input_config = {"gcs_source": {"input_uris": input_uris}}

# Import data from the input URI.
response = client.import_data(dataset_full_id, input_config)

print("Processing import...")
# synchronous check of operation status.
print("Data imported. {}".format(response.result()))