const indicator = document.querySelector(".indicator");
const secText = document.querySelector("#seconds");
const minText = document.querySelector("#minutes");
const btnPlay = document.querySelector("#play");
const btnStop = document.querySelector("#stop");
const btnPause = document.querySelector("#pause");
const minInput = document.querySelector("#minInput");
const secInput = document.querySelector("#secInput");
const btnSet = document.querySelector("#set");

/* initializing */
let minutes = 0;
let seconds = 0;
let totalSec = 0;
let counterValue = 0;
let counter = -1;

function startTimer() {
  if (counter == -1 && counterValue > 0) {
    counter = setInterval(() => {
      let rest = --counterValue;
      let min = Math.floor(rest / 60);
      let sec = Math.floor(rest % 60);

      secText.textContent = sec.toString().padStart(2, "0");
      minText.textContent = min.toString().padStart(2, "0");

      indicator.style.strokeDashoffset = 160 - (counterValue / totalSec) * 160;

      if (rest == 0) {
        clearInterval(counter);
        counter = -1;
      }
    }, 1000);
  }
}

function resetTimer() {
  minutes = 0;

  secText.textContent = "00";
  minText.textContent = "00";

  indicator.style.strokeDashoffset = 0;

  clearInterval(counter);
}

function pauseTimer() {
  clearInterval(counter);
  counter = -1;
}

function setTimer(e) {
  e.preventDefault();

  minutes = parseInt(minInput.value, 10) || 0;
  seconds = parseInt(secInput.value, 10) || 0;

  totalSec = minutes * 60 + seconds;

  minText.textContent = minutes.toString().padStart(2, "0");
  secText.textContent = seconds.toString().padStart(2, "0");
  counterValue = totalSec;
}

btnPlay.addEventListener("click", startTimer);
btnPause.addEventListener("click", pauseTimer);
btnStop.addEventListener("click", resetTimer);
btnSet.addEventListener("click", (e) => setTimer(e));
