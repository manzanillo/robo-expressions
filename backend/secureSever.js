const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const config = require('../.vscode/settings.json')

const server = https.createServer({
    cert: fs.readFileSync(config["liveServer.settings.https"].cert),
    key: fs.readFileSync(config["liveServer.settings.https"].key),
    passphrase: config["liveServer.settings.https"].passphrase
});

const actions = [
    "smiling",
    "checkright",
    "checkleft",
    "giggling",
    "dubitative",
    "sad",
    "reallysad",
    "bored",
    "dubitative",
    "chock",
    "suspicious",
    "satisfied",
    "pong",
    "killthehumans",
    "hal9000"
]

let CLIENTS = {}

const wss = new WebSocket.Server({ server: server, port: 8080 });

wss.on('connection', function connection(ws, request) {
    // remove query params
    let url = request.url.split("?")[0]

    // users need to specify a custom room
    if (url.length < 2) {
        ws.close()
    }

    if (CLIENTS[url] && CLIENTS[url].length > 0) {
        CLIENTS[url].push(ws)
    }
    else {
        CLIENTS[url] = [ws]
    }
    console.log(url)
    ws.on("message", function incoming(message) {
        console.log("received: %s", message)
        if (actions.indexOf(message.toLowerCase()) > -1) {
            for (var j = 0; j < CLIENTS[url].length; j++) {
                CLIENTS[url][j].send(message.toLowerCase())
            }
        } else {
            // send to the websocket something to say
            for (var j = 0; j < CLIENTS[url].length; j++) {
                console.log("sendig " + message.split([":"])[1])
                CLIENTS[url][j].send(message.split([":"])[1])
            }
        }
    })
});