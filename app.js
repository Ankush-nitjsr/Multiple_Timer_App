const obj = { timerId: 1, intervalId: null };

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
  const div = document.createElement("div");
  div.id = `${obj.timerId}`;
  div.className = "input-section";
  obj.timerId++;

  // add new timer display
  div.innerHTML = `
        <div id="set-time">
            <label for="setTime" style="background-color: #34344a"
                >Time Left :</label
            >
        </div>
        <div id="input-time">
            <input
            type="number"
            id="startHourTime"
            placeholder="hh"
            min="0"
            max="23"
            step="1"
            />
            <span>:</span>
            <input
            type="number"
            id="startMinuteTime"
            placeholder="mm"
            min="0"
            max="59"
            step="1"
            />
            <span>:</span>
            <input
            type="number"
            id="startSecondTime"
            placeholder="ss"
            min="0"
            max="59"
            step="1"
            />
        </div>
        <div style="background-color: #34344a">
            <button id="action-button">Stop</button>
        </div>
  `;

  parent.appendChild(div);

  document.getElementById("startHourTime").value = Math.floor(
    totalSeconds / 3600
  );
  document.getElementById("startMinuteTime").value = Math.floor(
    (totalSeconds % 3600) / 60
  );
  document.getElementById("startSecondTime").value = totalSeconds % 60;

  //start the timer
  startTime();
}

function startTime() {
  // check if an interval has already been set up
  if (!obj.intervalId) {
    obj.intervalId = setInterval(decreaseTime, 1000);
  }
}

function decreaseTime() {
  let secondTime = +document.getElementById("startSecondTime").value;
  let minuteTime = +document.getElementById("startMinuteTime").value;
  let hourTime = +document.getElementById("startHourTime").value;

  let totalSeconds = hourTime * 3600 + minuteTime * 60 + secondTime;

  if (totalSeconds > 0) {
    totalSeconds--;

    hourTime = Math.floor(totalSeconds / 3600);
    minuteTime = Math.floor((totalSeconds % 3600) / 60);
    secondTime = totalSeconds % 60;

    document.getElementById("startHourTime").value = hourTime;
    document.getElementById("startMinuteTime").value = minuteTime;
    document.getElementById("startSecondTime").value = secondTime;
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
  const childTimer = document.getElementById(timerId);

  childTimer.className = "finished-timer-section";
  childTimer.getElementById("set-time").innerHTML = "";
  childTimer.getElementById("finished-timer-section-message1").innerHTML =
    "Timer";
  childTimer.getElementById("finished-timer-section-message2").innerHTML = "Is";
  childTimer.getElementById("finished-timer-section-message3").innerHTML =
    "Up !";

  childTimer.getElementById("finished-timer-section-action-button").innerHTML =
    "Delete";

  parent.appendChild(div);
}
