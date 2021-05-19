const WebSocket = require('ws')

const http = require('http')
//TODO: Security
//const fs = require('fs');
//const https = require('https');

/*const server = https.createServer({
  cert: fs.readFileSync('/path/to/cert.pem'),
  key: fs.readFileSync('/path/to/key.pem')
})*/

const actions = [
  'smiling',
  'checkright',
  'checkleft',
  'giggling',
  'dubitative',
  'sad',
  'reallysad',
  'bored',
  'dubitative',
  'chock',
  'suspicious',
  'satisfied',
  'pong',
  'killthehumans',
  'hal9000',
  'recorder',
]

let CLIENTS = {}

const server = http.createServer()

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', function connection(ws, request, client) {
  // remove query params
  let url = request.url.split('?')[0]

  // users need to specify a custom room
  if (url.length < 2) {
    ws.close()
  }

  if (CLIENTS[url] && CLIENTS[url].length > 0) {
    CLIENTS[url].push(ws)
  } else {
    CLIENTS[url] = [ws]
  }
  console.log(url)
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
    if (actions.indexOf(message.toLowerCase()) > -1) {
      for (var j = 0; j < CLIENTS[url].length; j++) {
        CLIENTS[url][j].send(message.toLowerCase())
      }
    }
  })
})

//server.listen(8080)
