import csv
import urllib2
import json

tosave = []

url = 'https://docs.google.com/spreadsheets/d/1NpuKZYUTTnsDbJHduesGEyzuRjhWXpmImU0xJl7ccxM/export?gid=748479703&format=csv'
response = urllib2.urlopen(url)
cr = csv.reader(response)

for row in cr:
    el = {}
    el["name"]=row[0]
    el["category"]=row[1]
    el["ref"]=row[2]
    ts = []
    for t in row[3:]:
        if(t!=""):
            ts.append(t)
    el["imports"]=ts
    tosave.append(el)


url = 'https://docs.google.com/spreadsheets/d/1NpuKZYUTTnsDbJHduesGEyzuRjhWXpmImU0xJl7ccxM/export?gid=1955871138&format=csv'
response = urllib2.urlopen(url)
cr = csv.reader(response)


for row in cr:
    el = {}
    el["name"]=row[0]
    el["category"]=row[1]
    el["ref"]=row[2]
    ts = []
    for t in row[3:]:
        if(t!=""):
            ts.append(t)
    el["imports"]=ts
    tosave.append(el)


url = 'https://docs.google.com/spreadsheets/d/1NpuKZYUTTnsDbJHduesGEyzuRjhWXpmImU0xJl7ccxM/export?gid=0&format=csv'
response = urllib2.urlopen(url)
cr = csv.reader(response)

for row in cr:
    el = {}
    el["name"]=row[0]
    el["category"]=row[1]
    el["ref"]=row[2]
    ts = []
    for t in row[3:]:
        if(t!=""):
            ts.append(t)
    el["imports"]=ts
    tosave.append(el)

with open('../js/ze_data.json', 'w') as fp:
    json.dump(tosave, fp)