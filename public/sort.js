// Global Variables
let array = [];
let speed = 2;
let length = 100;
let lineHeight = 0;
let lineWidth = 0;
let isRunning = false;
let interval;

// Functions
function updateInterval() {
  interval = setInterval(() => {
    if (isRunning) runAlgorithm();
  }, 100 / speed);
}

function draw(index, height) {
  const bar = document.createElement('div');
  bar.style.width = `${lineWidth}px`;
  bar.style.height = `${lineHeight * height}px`;
  bar.style.left = `${index * lineWidth}px`;
  bar.classList.add('bar');
  canvas.appendChild(bar);
}

function place() {}

function play() {}

// Shuffle Button
const shuffleBtn = document.getElementById('shuffle');
const canvas = document.getElementById('canvas');
const rects = canvas.getBoundingClientRect();

shuffleBtn.addEventListener('click', () => {
  array = Array.from({length}, (_, i) => i + 1);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  lineWidth = rects.width / array.length;
  lineHeight = rects.height / array.length;
  canvas.innerHTML = '';

  array.forEach((height, index) => draw(index, height));
});

// Execute/Pause Button
const executeBtn = document.getElementById('execute');
const runIcon = executeBtn.childNodes[1];
const pauseIcon = executeBtn.childNodes[3];

executeBtn.addEventListener('click', () => {
  if (pauseIcon.style.display === 'none') {
    runIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    isRunning = true;
  } else {
    runIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    isRunning = false;
  }
});

// Mute/Unmute Button
const audioBtn = document.getElementById('audio');
const unmuteIcon = audioBtn.childNodes[1];
const muteIcon = audioBtn.childNodes[3];

audioBtn.addEventListener('click', () => {
  if (muteIcon.style.display === 'none') {
    unmuteIcon.style.display = 'none';
    muteIcon.style.display = 'block';
  } else {
    unmuteIcon.style.display = 'block';
    muteIcon.style.display = 'none';
  }
});

// Range Slider
const speedSlide = document.getElementById('speed');
const lengthSlide = document.getElementById('length');
const speedValue = document.getElementById('speed-value');
const lengthValue = document.getElementById('length-value');

speedSlide.addEventListener('input', () => {
  speed = speedSlide.value;
  speed = speed.length === 1 ? `${speed}.00` : speed;
  speed = speed.length === 3 ? `${speed}0` : speed;
  speedValue.textContent = `(${speed})`;
  clearInterval(interval);
  updateInterval();
});

lengthSlide.addEventListener('input', () => {
  length = lengthSlide.value;
  length = length.length === 2 ? `0${length}` : length;
  lengthValue.textContent = `(${length})`;
  shuffleBtn.click();
});

// Code Section
const codeBtn = document.querySelectorAll('.btn');
const codeContent = document.querySelectorAll('.content');

codeBtn.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    codeContent.forEach((content) => content.classList.remove('active'));
    codeContent[index].classList.add('active');

    codeBtn.forEach((btn) => btn.classList.remove('pressed'));
    btn.classList.add('pressed');
  });
});

// On Load
document.addEventListener('DOMContentLoaded', () => {
  lengthSlide.value = length;
  speedSlide.value = speed;

  updateInterval();
  shuffleBtn.click();
  document.querySelector('.Python').click();
  hljs.highlightAll();
});
