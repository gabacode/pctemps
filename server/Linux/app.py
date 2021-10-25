from datetime import datetime
from flask import Flask, jsonify
from flask_cors import CORS
import sensors

app = Flask(__name__)
CORS(app)
data = []

def check():
    sensors.init()
    data.clear()
    for chip in sensors.iter_detected_chips():
        for feature in chip:
            if(feature.label == 'SYSTIN'):
                data.append({'Name': "SYSTIN", 'Value': feature.get_value()})
            if(feature.label == 'CPUTIN'):
                data.append({'Name': "CPUTIN", 'Value': feature.get_value()})
            if(feature.label == 'PECI Agent 0 Calibration'):
                data.append({'Name': "PECI Agent 0 Calibration", 'Value': feature.get_value()})
            if(feature.label == 'fan1'):
                data.append({'Name': "fan1", 'Value': feature.get_value()})
            if(feature.label == 'fan2'):
                data.append({'Name': "fan2", 'Value': feature.get_value()})
    data.sort(key=lambda x: x['Name'])
    data.append({'Name': "Time", 'Value': datetime.now()})
    sensors.cleanup()
    return jsonify(data)

@ app.route("/")
def home():
    return check()

if __name__ == "__main__":
    from waitress import serve
    serve(app, port=6969)
