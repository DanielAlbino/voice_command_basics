var video = document.querySelector("#video");

var remoteControl = new RemoteControl(video);
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
recognition.continuous = true;
recognition.start();

recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      if (event.results[i][0].transcript.trim().toLowerCase() == "google") {
        window.open('https://www.google.pt/', '_blank');
      }
      if (event.results[i][0].transcript.trim().toLowerCase() == "facebook") {
        window.open('https://www.facebook.com/', '_blank');
      }
      console.info(`You said : ${event.results[i][0].transcript}`);
      alert(`You said : ${event.results[i][0].transcript}`)
    }
  }
};