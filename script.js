/* ========================================= */
/* ELEMENT REFERENCES */
/* ========================================= */

const scrollBtn = document.getElementById("scrollTopBtn");
const navbar = document.querySelector(".navbar");
const glow = document.querySelector(".cursor-glow");
const links = document.querySelectorAll(".nav-links a");

const blueprint = document.querySelector(".blueprint-grid");
const cadBg = document.querySelector(".cad-rotate-bg");
const canvas = document.querySelector("#geometryCanvas");


/* ========================================= */
/* SCROLL TO TOP BUTTON */
/* ========================================= */

window.addEventListener("scroll", () => {
  if (scrollBtn) {
    scrollBtn.classList.toggle("show", window.scrollY > 300);
  }
});

if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* ========================================= */
/* NAVBAR SCROLL EFFECT */
/* ========================================= */

window.addEventListener("scroll", () => {
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


/* ========================================= */
/* HIDE NAVBAR ON SCROLL DOWN */
/* ========================================= */

let lastScroll = 0;

window.addEventListener("scroll", () => {
  if (!navbar) return;

  let currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 80) {
    navbar.classList.add("hide");
  } else {
    navbar.classList.remove("hide");
  }

  lastScroll = currentScroll;
});


/* ========================================= */
/* ACTIVE LINK CLICK */
/* ========================================= */

links.forEach(link => {
  link.addEventListener("click", function () {
    links.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});


/* ========================================= */
/* CURSOR GLOW */
/* ========================================= */

if (glow) {
  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}


/* ========================================= */
/* SCROLL REVEAL */
/* ========================================= */

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* ========================================= */
/* FLOATING GEOMETRY NODES (CANVAS) */
/* ========================================= */

if (canvas) {

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let nodes = [];
  const NODE_COUNT = 60;

  class Node {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
    }

    move() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,240,255,0.6)";
      ctx.fill();
    }
  }

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push(new Node());
  }

  function connectNodes() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = "rgba(0,240,255,0.08)";
          ctx.stroke();
        }
      }
    }
  }

  function animateNodes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(node => {
      node.move();
      node.draw();
    });

    connectNodes();
    requestAnimationFrame(animateNodes);
  }

  animateNodes();
}


/* ========================================= */
/* SMART PARALLAX SYSTEM */
/* ========================================= */

const isMobile = window.innerWidth <= 768;

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let scrollPosition = 0;

const ease = 0.05;

if (!isMobile) {
  document.addEventListener("mousemove", (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5);
    targetY = (e.clientY / window.innerHeight - 0.5);
  });
}

window.addEventListener("scroll", () => {
  scrollPosition = window.scrollY;
});

function smoothParallax() {

  if (!isMobile) {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
  }

  if (blueprint) {
    blueprint.style.transform = isMobile
      ? `translateY(${scrollPosition * 0.02}px)`
      : `translate(${currentX * 6}px, ${currentY * 6 + scrollPosition * 0.02}px)`;
  }

  if (canvas) {
    canvas.style.transform = isMobile
      ? `translateY(${scrollPosition * 0.04}px)`
      : `translate(${currentX * 12}px, ${currentY * 12 + scrollPosition * 0.035}px)`;
  }

  if (cadBg) {
    cadBg.style.transform = isMobile
      ? `translateY(${scrollPosition * 0.06}px)`
      : `translate(${currentX * 18}px, ${currentY * 18 + scrollPosition * 0.05}px)`;
  }

  requestAnimationFrame(smoothParallax);
}

smoothParallax();
