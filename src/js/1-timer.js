import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

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

function showInvalidDateError() {
  iziToast.error({
    title: '❌',
    message: 'Please choose a date in the future',
    position: 'topRight',
    timeout: 3000,
  });
  startButton.disabled = true;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const startButton = document.querySelector('[data-start]');
const datetimePicker = document.getElementById('datetime-picker');
const timerFields = document.querySelectorAll('.timer .field .value');
let userSelectedDate = null;
let countdownInterval = null;

function initializeFlatpickr() {
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);

      userSelectedDate = selectedDates[0];
      if (
        userSelectedDate &&
        userSelectedDate.getTime() > new Date().getTime()
      ) {
        startButton.disabled = false;
      } else {
        showInvalidDateError();
      }
    },
  };

  flatpickr(datetimePicker, options);
}

initializeFlatpickr();

startButton.addEventListener('click', function () {
  if (!userSelectedDate) {
    return;
  }

  const targetTime = userSelectedDate.getTime();
  const currentTime = new Date().getTime();

  if (!userSelectedDate || targetTime <= currentTime) {
    showInvalidDateError();
    return;
  }

  startButton.disabled = true;
  datetimePicker.disabled = true;

  countdownInterval = setInterval(function () {
    const now = new Date().getTime();
    const timeDifference = targetTime - now;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      timerFields.forEach(field => (field.textContent = '00'));

      datetimePicker.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    timerFields[0].textContent = addLeadingZero(days);
    timerFields[1].textContent = addLeadingZero(hours);
    timerFields[2].textContent = addLeadingZero(minutes);
    timerFields[3].textContent = addLeadingZero(seconds);
  }, 1000);
});
