 # https://cloud.google.com/storage/docs/deleting-objects#storage-delete-object-python

 # Imports the Google Cloud client library
from google.cloud import storage

bucket_name = 'sportseventdetection-vcm'

#Get all the images in the bucket
storage_client = storage.Client()
source_bucket = storage_client.get_bucket(bucket_name)
blobs = source_bucket.list_blobs()

for blob in blobs:
    blob.delete()

print('deleting blobs complete!')