import iziToast from 'izitoast';

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateRadios = form.querySelectorAll('input[name="state"]');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(delayInput.value);
  const selectedState = [...stateRadios].find(radio => radio.checked)?.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === 'fulfilled') {
        resolve(delay);
      } else if (selectedState === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: `✅`,
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
        icon: false,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: `❌`,
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
        icon: false,
      });
    });
});
