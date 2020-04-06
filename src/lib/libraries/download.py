import json
import urllib.request
from pathlib import Path

def down(folder):
    f = open('%s.json' %folder,encoding="utf-8")
    user_dic = json.load(f)
    index = 1
    for i in user_dic:
        #print(i['md5'])
        file_path = "%s/%s" %(folder, i['md5'])
        my_file = Path(file_path)
        if not my_file.exists():
            url = 'http://cdn.assets.scratch.mit.edu/internalapi/asset/%s/get/' %(i['md5'])
            print("%s/%s %s" %(index, len(user_dic), file_path))
            urllib.request.urlretrieve(url, file_path)
        index += 1


        # urllib.urlretrieve(url, "demo.zip")
    print("%s finish" %folder)

down("costumes")
down("sounds")
down("backdrops")
# 
# f = open('costumes.json',encoding="utf-8")
# user_dic = json.load(f)
# index = 1
# for i in user_dic:
#     #print(i['md5'])
#     file_path = "costumes/%s" %(i['md5'])
#     my_file = Path(file_path)
#     if not my_file.exists():
#         url = 'http://cdn.assets.scratch.mit.edu/internalapi/asset/%s/get/' %(i['md5'])
#         print("%s/%s %s" %(index, len(user_dic), file_path))
#         urllib.request.urlretrieve(url, file_path)
#     index += 1
# 
# 
#     # urllib.urlretrieve(url, "demo.zip")
# print("costumes finish")
# 
# 
# f = open('sounds.json',encoding="utf-8")
# user_dic = json.load(f)
# index = 1
# for i in user_dic:
#     #print(i['md5'])
#     file_path = "sounds/%s" %(i['md5'])
#     my_file = Path(file_path)
#     if not my_file.exists():
#         url = 'http://cdn.assets.scratch.mit.edu/internalapi/asset/%s/get/' %(i['md5'])
#         print("%s/%s %s" %(index, len(user_dic), file_path))
#         urllib.request.urlretrieve(url, file_path)
#     index += 1
# 
#     # urllib.urlretrieve(url, "demo.zip")
# print("sounds finish")
# 

