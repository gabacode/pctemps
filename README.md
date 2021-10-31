# pctemps

HTTP server built with Flask to monitor your PC's temperatures.

![preview](https://user-images.githubusercontent.com/38985346/139605334-e00fa7cd-9125-41a4-b404-8ebc89c84a45.png)

## Requirements (Windows):  
- [OpenHardwareMonitor](https://openhardwaremonitor.org/)
- [Python3](https://www.python.org/downloads/), pip, and the modules referred inside the [requirements.txt](https://github.com/gabacode/pctemps/blob/main/server/Windows/requirements.txt) file.

## Requirements (Linux Debian/Ubuntu):
- [lm-sensors](https://packages.debian.org/sid/lm-sensors)
- [Python3](https://www.python.org/downloads/), pip, and the modules referred inside the [requirements.txt](https://github.com/gabacode/pctemps/blob/main/server/Linux/requirements.txt) file.

## Instructions
- Install the requirements with `pip install -r requirements.txt`
- Run the server and visit http://localhost:6969 or your local IP address to get the API response.

## Notes
The server spins on port 6969 by default, but you can change it inside the scripts.  
Open the firewall port in order to share the web server with other IP addresses on your LAN.
