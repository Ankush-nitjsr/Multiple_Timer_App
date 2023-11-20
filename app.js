let timerId = 0;

const allTimers = [];

const AudioElement = new Audio("clock-alarm-8761.mp3");

const parent = document.getElementById("active-timer");

document
  .getElementById("action-button")
  .addEventListener("click", onSetButtonClick);

function onSetButtonClick() {
  // remove notification
  const child = document.getElementById("no-active-timer-notification");
  //   parent.removeChild(child);
  child.innerHTML = "";

  // get the hour, min, second value from top timer
  const inputHourTime = +document.getElementById("inputHour").value;
  const inputMinuteTime = +document.getElementById("inputMinute").value;
  const inputSecondTime = +document.getElementById("inputSecond").value;

  let totalSeconds =
    inputHourTime * 3600 + inputMinuteTime * 60 + inputSecondTime;

  // start new active timer
  startTimer(totalSeconds);

  // set the input timer to initial state of "hh : mm : ss"
  resetTimer();
}

function startTimer(totalSeconds) {
  const obj = { timerId: timerId, intervalId: null };
  allTimers.push(obj);
  const div = document.createElement("div");
  div.id = `${obj.timerId}`;
  div.className = "input-section";

  // add new timer display
  div.innerHTML = `
        <div id="set-time">
            <label for="setTime" style="background-color: #34344a"
                >Time Left :</label
            >
        </div>
        <div id="input-times">
            <input
            type="number"
            id=\"startHourTime-${timerId}\"
            placeholder="hh"
            min="0"
            max="23"
            step="1"
            />
            <span>:</span>
            <input
            type="number"
            id=\"startMinuteTime-${timerId}\"
            placeholder="mm"
            min="0"
            max="59"
            step="1"
            />
            <span>:</span>
            <input
            type="number"
            id=\"startSecondTime-${timerId}\"
            placeholder="ss"
            min="0"
            max="59"
            step="1"
            />
        </div>
        <div id="stop-button-div" style="background-color: #34344a">
            <button id=\"action-button-${obj.timerId}\">Stop</button>
        </div>
  `;

  parent.appendChild(div);

  document.getElementById(`startHourTime-${timerId}`).value = Math.floor(
    totalSeconds / 3600
  );
  document.getElementById(`startMinuteTime-${timerId}`).value = Math.floor(
    (totalSeconds % 3600) / 60
  );
  document.getElementById(`startSecondTime-${timerId}`).value =
    totalSeconds % 60;

  //start the timer
  startTime(obj);
  // for stopping current timer
  document
    .getElementById(`action-button-${obj.timerId}`)
    .addEventListener("click", () => onStopButtonClick(obj));
}

function startTime(obj) {
  // check if an interval has already been set up
  if (!obj.intervalId) {
    obj.intervalId = setInterval(() => decreaseTime(obj), 1000);
  }
  timerId++;
}

function onStopButtonClick(obj) {
  const button = document.getElementById(`action-button-${obj.timerId}`);
  if (button.innerText === "Stop") {
    clearInterval(obj.intervalId);
    document.getElementById(`action-button-${obj.timerId}`).innerText =
      "Resume";
  } else if (button.innerText === "Resume") {
    if (obj.intervalId !== null) {
      setInterval(() => decreaseTime(obj), 1000);
    }
    document.getElementById(`action-button-${obj.timerId}`).innerText = "Stop";
  } else {
    clearInterval(obj.intervalId);
  }
}

function decreaseTime(obj) {
  let secondTime;
  let minuteTime;
  let hourTime;
  if (document.getElementById("input-times") !== null) {
    secondTime = document.getElementById("input-times").children[4].value;
    console.log(secondTime);
  }
  if (document.getElementById(`startMinuteTime-${obj.timerId}`) !== null) {
    minuteTime = +document.getElementById(`startMinuteTime-${obj.timerId}`)
      .value;
  }

  if (document.getElementById(`startHourTime-${obj.timerId}`) !== null) {
    hourTime = +document.getElementById(`startHourTime-${obj.timerId}`).value;
  }

  let totalSeconds = hourTime * 3600 + minuteTime * 60 + secondTime;

  if (totalSeconds > 0) {
    totalSeconds--;

    hourTime = Math.floor(totalSeconds / 3600);
    minuteTime = Math.floor((totalSeconds % 3600) / 60);
    secondTime = totalSeconds % 60;

    document.getElementById(`startHourTime-${obj.timerId}`).value = hourTime;
    document.getElementById(`startMinuteTime-${obj.timerId}`).value =
      minuteTime;
    document.getElementById(`startSecondTime-${obj.timerId}`).value =
      secondTime;
  } else {
    clearInterval(obj.intervalId);
    // release our intervalID from the variable
    // obj.intervalId = null;
    // change interface to finised timer
    endTimerDisplay(obj.timerId);
  }
  
}

function resetTimer() {
  document.getElementById("inputHour").value = null;
  document.getElementById("inputMinute").value = null;
  document.getElementById("inputSecond").value = null;
}

function endTimerDisplay(timerId) {
  const parentTimer = document.getElementById(timerId);

  parentTimer.className = "finished-timer-section";

  while (parentTimer.firstChild) {
    parentTimer.removeChild(parentTimer.firstChild);
  }

  parentTimer.innerHTML = `
        <div id="set-time"></div>
        <div id="finished-timer-section-input-time">
            <span id="finished-timer-section-message1">Timer</span>
            <span id="finished-timer-section-message2">Is</span>
            <span id="finished-timer-section-message3">Up !</span>
        </div>
        <div>
            <button id=\"finished-timer-section-action-button-${timerId}\">Delete</button>
        </div>
  `;

  // play audio on timer finish
  AudioElement.play();

  // on clicking delete button
  document
    .getElementById(`finished-timer-section-action-button-${timerId}`)
    .addEventListener("click", () => onDeleteButtonClick(timerId));
}

// remove the finished timer

function onDeleteButtonClick(id) {
  document.getElementById(id).remove();
}
