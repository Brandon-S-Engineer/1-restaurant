const preloader = document.querySelector('.preload');

window.addEventListener('load', function () {
  if (preloader) {
    preloader.classList.add('loaded');
  }

  document.body.classList.add('loaded');
});
