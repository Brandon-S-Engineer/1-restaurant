/* -------------------------------------------------------------------------- */
/*                               Parallax Effect                              */
/* -------------------------------------------------------------------------- */
const parallaxItems = document.querySelectorAll('[data-parallax-item]');

let x, y;
let len = parallaxItems.length;

window.addEventListener('mousemove', function (event) {
  // Coordinates of the mouse
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  // Reverse the number for reverse effect
  x = -x;
  y = -y;

  for (let i = 0; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});
