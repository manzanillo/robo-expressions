const WebSocket = require("ws")

const http = require("http")
//TODO: Security
//const fs = require('fs');
//const https = require('https');

/*const server = https.createServer({
  cert: fs.readFileSync('/path/to/cert.pem'),
  key: fs.readFileSync('/path/to/key.pem')
})*/

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

let CLIENTS = []

const server = http.createServer()

const wss = new WebSocket.Server({ port: 8080 })

wss.on("connection", function connection(ws, request, client) {
  CLIENTS[request.url] = ws
  CLIENTS.push(ws)

  console.log(request.url)
  ws.on("message", function incoming(message) {
    console.log("received: %s", message)
    //ws.send(action)
    if (actions.indexOf(message.toLowerCase()) > -1) {
      for (var j = 0; j < CLIENTS.length; j++) {
        CLIENTS[j].send(message.toLowerCase())
      }
    }
  })
})

//server.listen(8080)
