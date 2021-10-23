from config import *
from datetime import datetime
from flask import Flask
import json, pythoncom, wmi

app = Flask(__name__)
data = []

def check():
    pythoncom.CoInitialize()
    w = wmi.WMI(namespace="root\OpenHardwareMonitor")
    temperature_infos = w.Sensor()
    data.clear()
    data.append({"Time": datetime.now()})
    for sensor in temperature_infos:
        if sensor.SensorType==u'Temperature':
            data.append({"Name": sensor.Name, "Value": sensor.Value})
    return json.dumps(data, default=str)

@app.route("/")
def home():
    return check()

if __name__ == "__main__":
    from waitress import serve
    serve(app, host=host, port=port)