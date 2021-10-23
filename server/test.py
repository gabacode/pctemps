from config import *
import requests
from time import sleep

url = 'http://'+host+':'+str(port)

def check():
    try:
        r = requests.get(url)
    except requests.exceptions.RequestException as e:
        raise SystemExit(e)
    return r.text

while True:
    print(check())
    sleep(1)