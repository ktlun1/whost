from wshost import websocket
import threading
import json
import time


data = {"image": []}


def game():
    while True:
        for x in range(60, 0, -1):
            websocket.sendall(json.dumps({"type":"timer","timer":str(x)}).encode())
            time.sleep(1)
        data["image"] = []
        websocket.sendall(json.dumps({"type":"clear"}).encode())

def onmessage(self, message):
    image = json.loads(message.decode())
    if image["type"] == "line":
        data["image"].append(image)
        
        websocket.sendall(json.dumps(image).encode(), except_for=self)

def main(request):
    ws = websocket.Websocket(request, debug=True)
    ws.send(json.dumps({"type":"group","group":data["image"]}).encode())
    ws.onmessage = onmessage

    ws.run_forever()
    return False

threading.Thread(target=game).start()
