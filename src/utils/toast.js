const SHOW_TIME = 5000;

const createToastTemplate = (message) => `<div class="toast-container">
            <div class="toast">
              <p class="t-close"></p>
              <p class="t-text">${message}</p>
          </div>
        </div>`;

const toast = (message) => {
  const div = document.createElement('div');
  div.innerHTML = createToastTemplate(message);

  const toastItem = div.firstChild;

  document.body.append(toastItem);
  document.querySelector('.toast-container .toast .t-close').addEventListener('click', () => {
    toastItem.remove();
  });

  setTimeout(() => {
    toastItem.remove();
  }, SHOW_TIME);
};

export { toast };
