from numpy import load

data = load('/Users/Henderson/Downloads/tl_opera_capitol.npz')
lst = data.files
for item in lst:
    print(item)
    print(data[item])