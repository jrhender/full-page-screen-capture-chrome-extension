 #https://cloud.google.com/storage/docs/renaming-copying-moving-objects#storage-copy-object-python

 # Imports the Google Cloud client library
from google.cloud import storage

bucket_name = 'sportseventdetection-football'
new_bucket_name = 'sportseventdetection-vcm'

#Get all the images in football bucket
storage_client = storage.Client()
source_bucket = storage_client.get_bucket(bucket_name)
destination_bucket = storage_client.get_bucket(new_bucket_name)
blobs = source_bucket.list_blobs()

for blob in blobs:
    if blob.name.endswith('png'):
        #Copy each blob from one bucket to another
        new_blob = source_bucket.copy_blob(
            blob, destination_bucket, blob.name)

# print('Blob {} in bucket {} copied to blob {} in bucket {}.'.format(
#     source_blob.name, source_bucket.name, new_blob.name,
#     destination_bucket.name))
print('copying blobs complete!')