//javascript for navigation bar effects on scroll
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    header.classList.toggle('sticky', window.scrollY > 0);
});

//javascript for responsive navigation sidebar menu
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
const navigationItems = document.querySelectorAll(".navigation a")

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navigation.classList.toggle("active");
});

navigationItems.forEach((navigationItem) => {
    navigationItem.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navigation.classList.remove("active");
    });
});

//javascript for scroll to top button
const scrollBtn = document.querySelector(".scrollToTop-btn");

window.addEventListener("scroll", function() {
    scrollBtn.classList.toggle("active", window.scrollY > 500);
});

//javascript for scroll back to top on click scroll-to-top button
scrollBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

//javascript for reveal website elements on scroll
window.addEventListener("scroll", reveal);

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 50;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add("active");
        }
    }
}

const num = document.getElementById("num");
const mail = document.getElementById("mail");
var regex = /[abc]/g;

function onchangeHandle() {
    if (num.value.match(/[abc]/g)) {
        num.style.border = "1px solid red";
        num.style.backgroundColor = "red";
        alert("Entered string only numbers are allowed")
    } else {
        num.style.border = "1px solid grey";
        num.style.backgroundColor = "white";
    }
}
num.addEventListener('change', (e) => {

    if (num.value.length != 10) {
        e.preventDefault();
        alert("Length of the number can not be: " + num.value.length)
    }
})

function checkMail() {
    var ep = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!mail.value.match(ep)) {
        alert("wrong email pattern");
    }
}