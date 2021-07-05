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
        // server recieved action
        if (actions.indexOf(message.toLowerCase()) > -1) {
            for (var j = 0; j < CLIENTS[url].length; j++) {
                CLIENTS[url][j].send(message.toLowerCase())
            }
            // server recieved something to say
        } else if (message.indexOf("speaking") > -1) {
            // send the message to tts to the websocket with prefix speaking
            for (var j = 0; j < CLIENTS[url].length; j++) {
                console.log("sendig to tts " + message)
                CLIENTS[url][j].send(message)
            }
        } else if (message.indexOf("heard") > -1) {
            // send the message to sentiment module with prefix heard
            for (var j = 0; j < CLIENTS[url].length; j++) {
                console.log("sendig to sentiment module " + message)
                CLIENTS[url][j].send(message)
            }
        }
    })
});