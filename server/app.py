from config import *
from datetime import datetime
from flask import Flask, jsonify
from flask_cors import CORS
import pythoncom, wmi

app = Flask(__name__)
CORS(app)
data = []

def check():
    pythoncom.CoInitialize()
    w = wmi.WMI(namespace="root\OpenHardwareMonitor")
    temperature_infos = w.Sensor()
    data.clear()
    data.append({'Name': "Time", 'Value': datetime.now()})
    for sensor in temperature_infos:
        if sensor.SensorType==u'Temperature':
            data.append({'Name': sensor.Name, 'Value': sensor.Value})
    data.sort(key=lambda x: x['Name'])
    return jsonify(data)

@app.route("/")
def home():
    return check()

if __name__ == "__main__":
    from waitress import serve
    serve(app, host=host, port=port)