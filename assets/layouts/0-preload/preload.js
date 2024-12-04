/* -------------------------------------------------------------------------- */
/*                                   Preload                                  */
/* -------------------------------------------------------------------------- */
const preloader = document.querySelector('.preload');

window.addEventListener('load', function () {
  // preloader.classList.add('loaded');
  if (preloader) {
    preloader.classList.add('loaded');
  }
  document.body.classList.add('loaded');
});
