# Imports the Google Cloud client library
from google.cloud import storage

import csv

# Instantiates a client
storage_client = storage.Client()

bucket_name = "sportseventdetection-vcm"
bucket = storage_client.get_bucket(bucket_name)

blobs = bucket.list_blobs()

with open('sports_images.csv', mode='w') as sports_images_file:
    sports_images_file = csv.writer(sports_images_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

    for blob in blobs:
        image_name = blob.name
        if image_name.endswith('png'):
            print(blob.name)
            if 'notTD' in image_name:
                label = 'notTouchdown'
            else:
                label = 'touchdown'
            sports_images_file.writerow(['gs://' + bucket_name + '/' + blob.name, label])
