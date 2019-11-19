function connect() {
  var websocketProtocol = location.protocol === "https:" ? "wss://" : "ws://"

  var host = "localhost:8080" //window.location.host ? window.location.host : "localhost:8080"
  var customPath = "abc"

  var socket = new WebSocket(websocketProtocol + host + "/" + customPath)

  console.log(socket)

  socket.onmessage = function(evt) {
    console.log(evt.data)
    feelingthis(evt.data)
  }

  socket.onclose = function(e) {
    console.error("Chat socket closed unexpectedly")
    setTimeout(connect, 10000)
  }

  socket.onopen = function(e) {
    console.log("websocket connection established")
  }
}

jQuery(document).ready(function(e) {
  jQuery("#actions a").click(function(e) {
    var emotion = jQuery(this)
      .attr("href")
      .replace("#", "")
    feelingthis(emotion)
  })

  feelingthis("chock")
  setTimeout(function() {
    feelingthis("checkright")
  }, 400)
  setTimeout(function() {
    feelingthis("checkleft")
  }, 800)
  setTimeout(function() {
    feelingthis("satisfied")
  }, 1200)
  setTimeout(function() {
    feelingthis("giggling")
  }, 1500)
  setTimeout(function() {
    feelingthis("satisfied")
  }, 2800)

  connect()
})

function feelingthis(emotion) {
  jQuery("#eyes").removeClass()
  TweenMax.set(jQuery("#right, #left"), {
    clearProps: "all"
  })
  TweenMax.set(jQuery(".eyelid"), {
    clearProps: "all"
  })
  TweenMax.set(jQuery(".lowereyelid"), {
    clearProps: "all"
  })
  TweenMax.set(jQuery("hr"), {
    clearProps: "all"
  })
  switch (emotion) {
    case "smiling":
      TweenMax.to(jQuery(".lowereyelid"), 0.1, {
        css: {
          borderTopRightRadius: "100%",
          borderTopLeftRadius: "100%",
          height: "calc(100% * 40 / 150)"
        }
      })
      TweenMax.to(jQuery("#left, #right"), 0.1, {
        css: {
          borderTopRightRadius: "calc(100% * 20 / 150)",
          borderTopLeftRadius: "calc(100% * 20 / 150)"
        }
      })
      break
    case "giggling":
      jQuery("#eyes").addClass("topdown")
      TweenMax.to(jQuery(".lowereyelid"), 0.2, {
        css: {
          borderTopRightRadius: "100%",
          borderTopLeftRadius: "100%",
          height: "calc(100% * 10 / 150 + 0px)"
        }
      })
      TweenMax.to(jQuery("#right, #left"), 0.1, {
        css: { height: "calc(100% * 20 / 150 + 0px)" }
      })
      break
    case "sad":
      TweenMax.to(jQuery("#right .eyelid"), 0.2, {
        css: {
          borderBottomLeftRadius: "100%",
          height: "calc(100% * 10 / 150)"
        }
      })
      TweenMax.to(jQuery("#left .eyelid"), 0.2, {
        css: {
          borderBottomRightRadius: "100%",
          height: "calc(100% * 10 / 150)"
        }
      })
      break
    case "reallysad":
      TweenMax.to(jQuery("#right, #left"), 0.1, {
        css: {
          bottom: "-50%",
          left: "8%",
          height: "25%"
        }
      })
      TweenMax.to(jQuery("#right .eyelid"), 0.2, {
        css: {
          borderBottomLeftRadius: "100%",
          height: "40%"
        }
      })
      TweenMax.to(jQuery("#left .eyelid"), 0.2, {
        css: {
          borderBottomRightRadius: "100%",
          height: "40%"
        }
      })
      break
    case "dubitative":
      TweenMax.to(jQuery("#left"), 0.1, {
        css: {
          height: "30%"
        }
      })
      break
    case "checkright":
      TweenMax.to(jQuery("#left"), 0.1, {
        css: {
          height: "calc(100% * 39 / 150)",
          bottom: "-calc(100% * (-10) / 150)",
          right: "calc(100% * (-20) / 150)",
          top: "15%"
        }
      })
      TweenMax.to(jQuery("#right"), 0.1, {
        css: {
          height: "42%",
          right: "calc(100% * (-20) / 150)",
          width: "calc(100% * 40 / 150)"
        }
      })
      break
    case "checkleft":
      TweenMax.to(jQuery("#right"), 0.1, {
        css: {
          height: "calc(100% * 39 / 150)",
          bottom: "calc(100% * (-10) / 150)",
          left: "0%",
          top: "15%"
        }
      })
      TweenMax.to(jQuery("#left"), 0.1, {
        css: {
          height: "42%",
          width: "calc(100% * 40 / 150)"
        }
      })
      break
    case "killthehumans":
      TweenMax.to(jQuery("#right .eyelid"), 0.2, {
        css: {
          borderBottomRightRadius: "100%",
          height: "10vh"
        }
      })
      TweenMax.to(jQuery("#left .eyelid"), 0.2, {
        css: {
          borderBottomLeftRadius: "100%",
          height: "10vh"
        }
      })
      TweenMax.to(jQuery("hr"), 0.3, {
        css: {
          borderBottom: "8px solid #ff4040",
          borderTop: " 8px solid #4a4a4a"
        }
      })
      break
    case "bored":
      TweenMax.to(jQuery("#right .eyelid"), 0.2, {
        css: {
          borderBottomRightRadius: "100%",
          borderBottomLeftRadius: "100%",
          height: "9vh"
        }
      })
      TweenMax.to(jQuery("#left .eyelid"), 0.2, {
        css: {
          borderBottomRightRadius: "100%",
          borderBottomLeftRadius: "100%",
          height: "9vh"
        }
      })
      TweenMax.to(jQuery("#right, #left"), 0.2, {
        css: {
          borderBottomRightRadius: "100%",
          borderBottomLeftRadius: "100%",
          height: "22vh",
          bottom: "-38vh"
        }
      })
      break
    case "suspicious":
      TweenMax.to(jQuery("#left .eyelid"), 0.2, {
        css: {
          borderBottomLeftRadius: "100%",
          height: "9vh"
        }
      })
      break
    case "love":
      jQuery("#eyes").addClass("love")
      break
    case "pong":
      TweenMax.to(jQuery("#left"), 0.5, {
        css: {
          right: "-50px",
          height: "4vh",
          bottom: "-70vh"
        }
      })
      TweenMax.to(jQuery("#right"), 0.5, {
        css: {
          top: "52px",
          right: "5px",
          height: "2vh",
          width: "2vh",
          borderRadius: "20px"
        }
      })
      jQuery("#eyes").addClass("pong")
      break
    case "chock":
      TweenMax.to(jQuery("#left,#right"), 0.1, {
        css: { transform: "scale(1.3)" }
      })
      setTimeout(function() {
        TweenMax.to(jQuery("#left,#right"), 0.1, {
          css: { transform: "scale(1)" }
        })
      }, 50)

      break
    case "hal9000":
      TweenMax.to(jQuery("#left"), 0.1, {
        css: {
          height: "10px",
          top: "50px",
          width: "10px",
          borderRadius: "10px",
          position: "absolute",
          boxShadow: "0 0 15px #ffbf00",
          left: "45.8vw",
          zIndex: "1"
        }
      })
      TweenMax.to(jQuery("#left hr"), 0.1, {
        css: {
          borderBottom: "2px solid #ffbf00",
          borderTop: "2px solid rgba(255, 191, 0, 0.51)",
          margin: "0 0 2px 0"
        }
      })
      TweenMax.to(jQuery("#right"), 0.1, {
        css: {
          height: "40px",
          top: "34px",
          width: "40px",
          borderRadius: "50px",
          position: "absolute",
          boxShadow: "0 0 15px #ff0007",
          left: "45vw",
          zIndex: "0"
        }
      })
      TweenMax.to(jQuery("#right hr"), 0.1, {
        css: {
          borderBottom: "2px solid #ff0007",
          borderTop: "2px solid rgba(255, 60, 65, 0.6)"
        }
      })
      TweenMax.to(jQuery(".lowereyelid"), 0.1, {
        css: { borderRadius: "0", height: "0" }
      })
      break
    case "satisfied":
      TweenMax.to(jQuery(".lowereyelid"), 0.1, {
        css: {
          borderTopRightRadius: "100%",
          borderTopLeftRadius: "100%",
          height: "7vh"
        }
      })
      TweenMax.to(jQuery("#right"), 0.2, {
        css: {
          top: "-20px",
          height: "13vh",
          borderTopRightRadius: "10vw",
          borderTopLeftRadius: "10vw"
        }
      })
      TweenMax.to(jQuery("#left"), 0.2, {
        css: {
          top: "-20px",
          height: "13vh",
          borderTopRightRadius: "10vw",
          borderTopLeftRadius: "10vw"
        }
      })
      TweenMax.to(jQuery("#left .lowereyelid"), 0.1, {
        css: { transform: "rotate(4deg)", bottom: "-2vh" }
      })
      TweenMax.to(jQuery("#right .lowereyelid"), 0.1, {
        css: { transform: "rotate(-4deg)", bottom: "-2vh" }
      })
      break
  }
}
