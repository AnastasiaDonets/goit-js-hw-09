const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const INTERVAL_DELAY = 1000;
let colorInterval = null;

refs.btnStart.addEventListener('click', onChangeColor);
refs.btnStop.addEventListener('click', onBtnStop);

function onChangeColor() {
  colorInterval = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_DELAY);
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
}

function onBtnStop() {
  clearInterval(colorInterval);
  refs.btnStop.disabled = true;
  refs.btnStart.disabled = false;
}
