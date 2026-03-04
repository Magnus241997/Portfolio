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
/* APPLE-STYLE INERTIA PARALLAX SYSTEM */
/* ========================================= */

const blueprint = document.querySelector(".blueprint-grid");
const cadBg = document.querySelector(".cad-rotate-bg");
const canvas = document.querySelector("#geometryCanvas");

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let scrollY = 0;

const ease = 0.05; // Lower = smoother, higher = faster

/* Mouse Target */
document.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / window.innerWidth - 0.5);
  targetY = (e.clientY / window.innerHeight - 0.5);
});

/* Scroll Target */
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

/* Smooth Animation Loop */
function smoothParallax() {

  // Inertia easing
  currentX += (targetX - currentX) * ease;
  currentY += (targetY - currentY) * ease;

  if (blueprint) {
    blueprint.style.transform =
      `translate(${currentX * 5}px, ${currentY * 5 + scrollY * 0.015}px)`;
  }

  if (canvas) {
    canvas.style.transform =
      `translate(${currentX * 10}px, ${currentY * 10 + scrollY * 0.03}px)`;
  }

  if (cadBg) {
    cadBg.style.transform =
      `translate(${currentX * 15}px, ${currentY * 15 + scrollY * 0.05}px)`;
  }

  requestAnimationFrame(smoothParallax);
}

smoothParallax();
