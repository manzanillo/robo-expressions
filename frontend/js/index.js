function getQueryParam(paramName) {
  let uri = window.location.href.split('?')[1]
  let params = new URLSearchParams(uri)
  return params.get(paramName)
}

var socket

function connect() {
  // TODO check why the secureServer accepts connections only with ws
  var websocketProtocol = location.protocol === "https:" ? "wss://" : "ws://"

  var host = 'agddi-srv02.imp.fu-berlin.de:8080' //window.location.host ? window.location.host : "localhost:8080"
  var customPath = getQueryParam('room') || 'abc'

  var MAX_CONN_RETRY = 100
  var counter_retry_connection = 0
  var retry_delay_time = 1000
  socket = new WebSocket(websocketProtocol + host + '/' + customPath)

  console.log(socket)

  socket.onmessage = function (evt) {
    console.log(evt.data)
    feelingthis(evt.data)
    saveUtterance(evt.data)
    speak(evt.data)
  }

  socket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly')
    counter_retry_connection += 1
    if (counter_retry_connection < MAX_CONN_RETRY) {
      setTimeout(connect, retry_delay_time)
      retry_delay_time *= 2
    }
  }

  socket.onopen = function (e) {
    console.log('websocket connection established')
  }
}
