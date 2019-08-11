from os import listdir
from os.path import isfile, join

mypath = "/Users/Henderson/Documents/projects/FullPageScreenCapture/full-page-screen-capture-chrome-extension/GoogleCloudMLEngine/images/sportseventdetection-football/Test"
for f in listdir(mypath):
    print(join(mypath, f))