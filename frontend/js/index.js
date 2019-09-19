function connect() {
  var websocketProtocol = location.protocol === 'https:' ? 'wss://' : 'ws://'

  var host = window.location.host ? window.location.host : 'localhost:8080'
  var customPath = 'abc'

  var socket = new WebSocket(websocketProtocol + host + '/a' + customPath)

  console.log(socket)

  socket.onmessage = function(evt) {
    console.log(evt.data)
    feelingthis(evt.data)
  }

  socket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly')
    setTimeout(connect, 10000)
  }

  socket.onopen = function(e) {
    console.log('websocket connection established')
  }
}

jQuery(document).ready(function(e) {
  jQuery('#actions a').click(function(e) {
    var emotion = jQuery(this)
      .attr('href')
      .replace('#', '')
    feelingthis(emotion)
  })

  feelingthis('chock')
  setTimeout(function() {
    feelingthis('checkright')
  }, 400)
  setTimeout(function() {
    feelingthis('checkleft')
  }, 800)
  setTimeout(function() {
    feelingthis('satisfied')
  }, 1200)
  setTimeout(function() {
    feelingthis('giggling')
  }, 1500)
  setTimeout(function() {
    feelingthis('satisfied')
  }, 2800)

  connect()
})

function feelingthis(emotion) {
  jQuery('#eyes').removeClass()
  TweenMax.set(jQuery('#right, #left'), {
    clearProps: 'all'
  })
  TweenMax.set(jQuery('.eyelid'), {
    clearProps: 'all'
  })
  TweenMax.set(jQuery('.lowereyelid'), {
    clearProps: 'all'
  })
  TweenMax.set(jQuery('hr'), {
    clearProps: 'all'
  })
  switch (emotion) {
    case 'smiling':
      TweenMax.to(jQuery('.lowereyelid'), 0.1, {
        css: {
          borderTopRightRadius: '100%',
          borderTopLeftRadius: '100%',
          height: '10px'
        }
      })
      TweenMax.to(jQuery('#left, #right'), 0.1, {
        css: { borderTopRightRadius: '20px', borderTopLeftRadius: '20px' }
      })
      break
    case 'giggling':
      jQuery('#eyes').addClass('topdown')
      TweenMax.to(jQuery('.lowereyelid'), 0.2, {
        css: {
          borderTopRightRadius: '100%',
          borderTopLeftRadius: '100%',
          height: '10px'
        }
      })
      TweenMax.to(jQuery('#right, #left'), 0.1, {
        css: { height: '20px' }
      })
      break
    case 'sad':
      TweenMax.to(jQuery('#right .eyelid'), 0.2, {
        css: {
          borderBottomLeftRadius: '100%',
          height: '10px'
        }
      })
      TweenMax.to(jQuery('#left .eyelid'), 0.2, {
        css: {
          borderBottomRightRadius: '100%',
          height: '10px'
        }
      })
      break
    case 'reallysad':
      TweenMax.to(jQuery('#right, #left'), 0.1, {
        css: {
          bottom: '-40px',
          left: '-20px',
          height: '20px'
        }
      })
      TweenMax.to(jQuery('#right .eyelid'), 0.2, {
        css: {
          borderBottomLeftRadius: '100%',
          height: '10px'
        }
      })
      TweenMax.to(jQuery('#left .eyelid'), 0.2, {
        css: {
          borderBottomRightRadius: '100%',
          height: '10px'
        }
      })
      break
    case 'dubitative':
      TweenMax.to(jQuery('#left'), 0.1, {
        css: {
          height: '39px'
        }
      })
      break
    case 'checkright':
      TweenMax.to(jQuery('#left'), 0.1, {
        css: {
          height: '39px',
          bottom: '-10px',
          right: '-20px'
        }
      })
      TweenMax.to(jQuery('#right'), 0.1, {
        css: {
          height: '60px',
          right: '-20px',
          top: '-11px',
          width: '40px'
        }
      })
      break
    case 'checkleft':
      TweenMax.to(jQuery('#right'), 0.1, {
        css: {
          height: '39px',
          bottom: '-10px',
          left: '-20px'
        }
      })
      TweenMax.to(jQuery('#left'), 0.1, {
        css: {
          height: '60px',
          left: '-20px',
          top: '-11px',
          width: '40px'
        }
      })
      break
    case 'killthehumans':
      TweenMax.to(jQuery('#right .eyelid'), 0.2, {
        css: {
          borderBottomRightRadius: '100%',
          height: '20px'
        }
      })
      TweenMax.to(jQuery('#left .eyelid'), 0.2, {
        css: {
          borderBottomLeftRadius: '100%',
          height: '20px'
        }
      })
      TweenMax.to(jQuery('hr'), 0.3, {
        css: {
          borderBottom: '1px solid #ff4040',
          borderTop: ' 1px solid #4a4a4a'
        }
      })
      break
    case 'bored':
      TweenMax.to(jQuery('#right .eyelid'), 0.2, {
        css: {
          borderBottomRightRadius: '100%',
          borderBottomLeftRadius: '100%',
          height: '10px'
        }
      })
      TweenMax.to(jQuery('#left .eyelid'), 0.2, {
        css: {
          borderBottomRightRadius: '100%',
          borderBottomLeftRadius: '100%',
          height: '10px'
        }
      })
      TweenMax.to(jQuery('#right, #left'), 0.2, {
        css: {
          borderBottomRightRadius: '100%',
          borderBottomLeftRadius: '100%',
          height: '20px',
          bottom: '-30px'
        }
      })
      break
    case 'suspicious':
      TweenMax.to(jQuery('#left .eyelid'), 0.2, {
        css: {
          borderBottomLeftRadius: '100%',
          height: '10px'
        }
      })
      break
    case 'love':
      jQuery('#eyes').addClass('love')
      break
    case 'pong':
      TweenMax.to(jQuery('#left'), 0.5, {
        css: {
          right: '-50px',
          height: '10px',
          bottom: '-60px'
        }
      })
      TweenMax.to(jQuery('#right'), 0.5, {
        css: {
          top: '52px',
          right: '5px',
          height: '10px',
          width: '10px',
          borderRadius: '20px'
        }
      })
      jQuery('#eyes').addClass('pong')
      break
    case 'chock':
      TweenMax.to(jQuery('#left,#right'), 0.1, {
        css: { transform: 'scale(1.3)' }
      })
      setTimeout(function() {
        TweenMax.to(jQuery('#left,#right'), 0.1, {
          css: { transform: 'scale(1)' }
        })
      }, 50)

      break
    case 'hal9000':
      TweenMax.to(jQuery('#left'), 0.1, {
        css: {
          height: '10px',
          top: '50px',
          width: '10px',
          borderRadius: '10px',
          position: 'absolute',
          boxShadow: '0 0 15px #ffbf00',
          left: '84px',
          zIndex: '1'
        }
      })
      TweenMax.to(jQuery('#left hr'), 0.1, {
        css: {
          borderBottom: '1px solid #ffbf00',
          borderTop: '1px solid rgba(255, 191, 0, 0.51)'
        }
      })
      TweenMax.to(jQuery('#right'), 0.1, {
        css: {
          height: '40px',
          top: '34px',
          width: '40px',
          borderRadius: '50px',
          position: 'absolute',
          boxShadow: '0 0 15px #ff0007',
          left: '69px',
          zIndex: '0'
        }
      })
      TweenMax.to(jQuery('#right hr'), 0.1, {
        css: {
          borderBottom: '1px solid #ff0007',
          borderTop: '1px solid rgba(255, 60, 65, 0.6)'
        }
      })
      TweenMax.to(jQuery('.lowereyelid'), 0.1, {
        css: { borderRadius: '0', height: '0' }
      })
      break
    case 'satisfied':
      TweenMax.to(jQuery('.lowereyelid'), 0.1, {
        css: {
          borderTopRightRadius: '100%',
          borderTopLeftRadius: '100%',
          height: '10px'
        }
      })
      TweenMax.to(jQuery('#right'), 0.2, {
        css: {
          top: '-20px',
          height: '20px',
          borderTopRightRadius: '30px',
          borderTopLeftRadius: '30px'
        }
      })
      TweenMax.to(jQuery('#left'), 0.2, {
        css: {
          top: '-20px',
          height: '20px',
          borderTopRightRadius: '30px',
          borderTopLeftRadius: '30px'
        }
      })
      TweenMax.to(jQuery('#left .lowereyelid'), 0.1, {
        css: { transform: 'rotate(4deg)', bottom: '-3px' }
      })
      TweenMax.to(jQuery('#right .lowereyelid'), 0.1, {
        css: { transform: 'rotate(-4deg)', bottom: '-3px' }
      })
      break
  }
}
