import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const timerSeconds = document.querySelector('span[data-seconds]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerHours = document.querySelector('span[data-hours]');
const timerDays = document.querySelector('span[data-days]');

btnStart.setAttribute(`disabled`, true);
btnStart.addEventListener('click', onStartCounting);
let choosingDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    onChoiceValidDate(selectedDates[0]);
  },
};

function onChoiceValidDate(selectedDates) {
  choosingDate = selectedDates.getTime();
  if (selectedDates < Date.now()) {
    Notify.failure('Please choose a date in the future');
  }

  if (selectedDates >= Date.now()) {
    btnStart.removeAttribute('disabled');
  }
}

function onStartCounting() {
  timerId = setInterval(startCounting, 1000);
  btnStart.setAttribute(`disabled`, true);
  input.setAttribute(`disabled`, true);
}

function startCounting() {
  const differenceOfDate = choosingDate - Date.now();
  const formatingOfDate = convertMs(differenceOfDate);
  renderingOfDate(formatingOfDate);
  if (timerSeconds.textContent === '00' && timerMinutes.textContent === '00') {
    Notify.success('Time end');
    clearInterval(timerId);
  }
}

function renderingOfDate({ days, hours, minutes, seconds }) {
  timerSeconds.textContent = addLeadingZero(seconds);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerHours.textContent = addLeadingZero(hours);
  timerDays.textContent = addLeadingZero(days);
}

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
