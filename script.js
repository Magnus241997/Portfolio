// NAVBAR SCROLL EFFECT

window.addEventListener("scroll", function(){

const navbar =
document.querySelector(".navbar");

if(window.scrollY > 50){

navbar.classList.add("scrolled");

}
else{

navbar.classList.remove("scrolled");

}

});




// ACTIVE LINK CLICK

const links =
document.querySelectorAll(".nav-link");


links.forEach(link => {

link.addEventListener("click", function(){

links.forEach(l =>
l.classList.remove("active")
);

this.classList.add("active");

});

});