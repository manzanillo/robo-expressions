const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const server = https.createServer({
    cert: fs.readFileSync('C:\\cygwin64\\home\\Margarita\\rootSSL.pem'),
    key: fs.readFileSync('C:\\cygwin64\\home\\Margarita\\rootSSL.key'),
    passphrase: "12345"
});

const wss = new WebSocket.Server({ server, port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});