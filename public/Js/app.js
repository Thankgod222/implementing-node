const typed = new Typed(".home-subname", {
  strings: ["Web Developer", "UI/Ux Designer"],
  typeSpeed: 70,
  backSpeed: 50,
  loop: true,
});

// SERVICES MODAL
const modalViews = document.querySelectorAll(".services-modal"),
  modalBtns = document.querySelectorAll(".services-button"),
  modalClose = document.querySelectorAll(".services-modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach(mc => {
  mc.addEventListener("click", () => {
    modalViews.forEach(mv => {
      mv.classList.remove("active-modal");
    });
  });
});

//    MIXITUP FILTER PORTFOLIO

let mixerPortfolio = mixitup(".work-container", {
  selectors: {
    target: ".work-card ",
  },
  animation: {
    duration: 300,
  },
});

// LINK ACTIVE WORK

const linkWork = document.querySelectorAll(".work-item");

function activeWork() {
  linkWork.forEach(l => l.classList.remove("active-work"));
  this.classList.add("active-work");
}
linkWork.forEach(l => l.addEventListener("click", activeWork));

// SWIPER
//  LIGHT DARK THEME
// const themeButton = document.getElementById('theme-button')
// const lightTheme = 'light-theme'
// const iconTheme = 'bx-sun'

// // PREVIOUSLY S`ELECTED TOPIC (IF USER SELECTED)
// const selectedTheme = localStorage.getItem('selected-theme')
// const selectedIcon = localStorage.getItem('selected-icon')

// SCROLL TOP
//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
