const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

document.getElementById("voice").addEventListener("click", micBtnClick);

function micBtnClick() {
    let micBtn = document.getElementById("voice");
    if (micBtn.innerHTML === "Voice control") {
        // Start speech recognition
        recognition.start();
        micBtn.innerHTML = "Voice On";
    } else {
        // Stop speech recognition
        recognition.stop();
        micBtn.innerHTML = "Voice control";
    }
}

recognition.onstart = function startSpeechRecognition() {
    console.log("Speech Recognition Active");
}

recognition.addEventListener("end", endSpeechRecognition);

function endSpeechRecognition() {
    console.log("Speech Recognition Disconnected");
}
