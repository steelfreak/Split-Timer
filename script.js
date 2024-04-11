// Timer variables
let startTime;
let elapsedTime = 0;
let timerInterval;

// Lap variables
let lapStartTime;
let lapElapsedTime = 0;

// DOM elements
const timerDisplay = document.getElementById('timer');
const lapDisplay = document.getElementById('lapTimer');
const startButton = document.getElementById('startButton');
const splitButton = document.getElementById('splitButton');
const lapButton = document.getElementById('lapButton');
const resetButton = document.getElementById('resetButton');
const splitList = document.getElementById('splitList');
const lapList = document.getElementById('lapList');

// Add leading zeros to the time values
function formatTime(time) {
  return time.toString().padStart(2, '0');
}

// Update the timer display
function updateTimer() {
  const milliseconds = elapsedTime % 1000;
  const seconds = Math.floor(elapsedTime / 1000) % 60;
  const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

  const timeString = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(milliseconds, 3)}`;
  timerDisplay.textContent = timeString;
}

// Update the lap timer display
function updateLapTimer() {
  const milliseconds = lapElapsedTime % 1000;
  const seconds = Math.floor(lapElapsedTime / 1000) % 60;
  const minutes = Math.floor(lapElapsedTime / (1000 * 60)) % 60;
  const hours = Math.floor(lapElapsedTime / (1000 * 60 * 60));

  const timeString = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(milliseconds, 3)}`;
  lapDisplay.textContent = timeString;
}

// Start the timer
function startTimer() {
  startTime = Date.now() - elapsedTime;
  lapStartTime = Date.now() - lapElapsedTime;

  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    lapElapsedTime = Date.now() - lapStartTime;

    updateTimer();
    updateLapTimer();
  }, 10);

  startButton.textContent = 'Pause';
}

// Pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
  startButton.textContent = 'Resume';
}

// Split the timer
function splitTimer() {
  const splitTime = elapsedTime;
  const splitItem = document.createElement('li');
  splitItem.textContent = timerDisplay.textContent;
  splitList.appendChild(splitItem);
}

// Record lap time
function recordLapTime() {
  const lapTime = lapElapsedTime;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapDisplay.textContent;
  lapList.appendChild(lapItem);

  lapStartTime = Date.now();
  lapElapsedTime = 0;
  updateLapTimer();
}

// Reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  lapElapsedTime = 0;
  updateTimer();
  updateLapTimer();

  startButton.textContent = 'Start';
  splitList.innerHTML = '';
  lapList.innerHTML = '';
}

// Event listeners
startButton.addEventListener('click', function() {
  if (startButton.textContent === 'Start') {
    startTimer();
  } else if (startButton.textContent === 'Pause') {
    pauseTimer();
  } else if (startButton.textContent === 'Resume') {
    startTimer();
  }
});

splitButton.addEventListener('click', splitTimer);

lapButton.addEventListener('click', recordLapTime);

resetButton.addEventListener('click', resetTimer);