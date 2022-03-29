const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

//const config = require('../secrets/settings.json')

const server = https.createServer({
    cert: fs.readFileSync('/etc/ssl/certs/it2school.imp.fu-berlin.de.pem'),
    key: fs.readFileSync('it2school.imp.fu-berlin.de-key.pem'),
//    passphrase: config["liveServer.settings.https"].passphrase // can be used, but not needed
   port: 18080
});


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

//const server = https.createServer()

const wss = new WebSocket.Server({ server: server })

wss.on('connection', function connection(ws, request, client) {
  // remove query params
  let url = request.url.split('?')[0]
  let queryparams = request.url.split('?')[1] || ''
  let snap = queryparams === 'snap' ? true : false
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
    if (actions.indexOf(message.toString().toLowerCase()) > -1) {
      for (var j = 0; j < CLIENTS[url].length; j++) {
        CLIENTS[url][j].send(message.toString().toLowerCase())
      }
    }
    if (message.indexOf('heard:') > -1 || message.indexOf('say:') > -1) {
      // the message has been an audio input by the user
      console.log('send message to Snap / phone: ' + message)
      for (var j = 0; j < CLIENTS[url].length; j++) {
        CLIENTS[url][j].send(message.toString())
      }
    }
  })
})

server.listen(18080)
