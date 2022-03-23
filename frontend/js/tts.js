const synth = window.speechSynthesis

let voices = []

let currentUtterance = ''

// speak the utterance
function speak(smth) {
  console.log('recieved ' + smth)
  if (synth.speaking) {
    console.error('speechSynthesis.speaking')
    synth.cancel()
    setTimeout(speak, 300)
  } else if (smth !== '' && smth.toString().indexOf('say:') > -1) {
    console.log('say ' + smth.split([':'])[1])
    const utterThis = new SpeechSynthesisUtterance(smth.split([':'])[1])
    utterThis.onend = function (event) {
      console.log('SpeechSynthesisUtterance.onend')
    }

    utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror')
    }

    var voices = speechSynthesis.getVoices()

    // select default voice for the current browser
    for (i = 0; i < voices.length; i++) {
      if (voices[i].default) {
        utterThis.voice = voices[i]
      }
    }

    utterThis.onpause = function (event) {
      const char = event.utterance.text.charAt(event.charIndex)
      console.log(
        'Speech paused at character ' +
          event.charIndex +
          ' of "' +
          event.utterance.text +
          '", which is "' +
          char +
          '".'
      )
    }

    // utterThis.pitch = pitch.value;
    // utterThis.rate = rate.value;
    synth.speak(utterThis)
  }
}

// save the utterance received from the web socket
function saveUtterance(utterance) {
  currentUtterance = utterance
}

// fake some input to enable audio output
document.getElementById('fakebutton').click()
