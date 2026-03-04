/* ========================================= */
/* NAVBAR SCROLL EFFECT */
/* ========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


/* ========================================= */
/* ACTIVE LINK CLICK */
/* ========================================= */

const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
  link.addEventListener("click", function () {

    links.forEach(l => l.classList.remove("active"));
    this.classList.add("active");

  });
});


/* ========================================= */
/* SUBTLE PARALLAX DEPTH SYSTEM */
/* ========================================= */

const blueprint = document.querySelector(".blueprint-grid");
const cadBg = document.querySelector(".cad-rotate-bg");
const canvas = document.querySelector("#geometryCanvas");

let mouseX = 0;
let mouseY = 0;
let scrollY = 0;

/* Mouse Movement */
document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5);
  mouseY = (e.clientY / window.innerHeight - 0.5);
});

/* Scroll Movement */
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

/* Smooth Animation Loop */
function parallaxLoop() {

  if (blueprint) {
    blueprint.style.transform =
      `translate(${mouseX * 6}px, ${mouseY * 6 + scrollY * 0.02}px)`;
  }

  if (canvas) {
    canvas.style.transform =
      `translate(${mouseX * 10}px, ${mouseY * 10 + scrollY * 0.04}px)`;
  }

  if (cadBg) {
    cadBg.style.transform =
      `translate(${mouseX * 14}px, ${mouseY * 14 + scrollY * 0.06}px)`;
  }

  requestAnimationFrame(parallaxLoop);
}

parallaxLoop();
