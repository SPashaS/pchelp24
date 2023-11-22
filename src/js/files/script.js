// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

const servicesBody = document.querySelector(".services__body");
const btnServicesMore = document.querySelector("#services-more");
if (btnServicesMore) {
  let servicesList = document.querySelector(".services__list");
  btnServicesMore.addEventListener("click", (e) => {
    servicesBody.classList.toggle("_show");
    servicesList.classList.toggle("_hidden");
  })
}

const typicalBodyMob = document.querySelector(".typical-breakdowns__mob");
const btnTypical = document.querySelector("#typical-breakdowns-more");
if (btnTypical) {
  let list = document.querySelector(".typical-breakdowns__mob-grid");
  btnTypical.addEventListener("click", (e) => {
    typicalBodyMob.classList.toggle("_show");
    list.classList.toggle("_hidden");
  })
}


const pricesBody = document.querySelector(".prices__body");
const btnPrices = document.querySelector("#prices-more");
if (btnPrices) {
  let list = document.querySelector(".prices__body-grid");
  btnPrices.addEventListener("click", (e) => {
    pricesBody .classList.toggle("_show");
    list.classList.toggle("_hidden");
  })
}


///////////////////////      GSAP


// gsap.registerPlugin(TextPlugin)

// gsap.to(".promo__text", {
//   duration: 2,
//   text: {
//     value: "sdfasdfasdf",
//   }
// })





function animationEndFunc ( array ) {
  let textSlides = array;
  for (let i = 0; i < textSlides.length; i++) {
    textSlides[i].addEventListener("animationend", () => {
      textSlides[i].classList.remove("_show");
      if ( i == textSlides.length - 1) {
        textSlides[0].classList.add("_show");
      } else {
        textSlides[i + 1].classList.add("_show");
      }
    });
  }
}


const textSlides = document.querySelectorAll(".promo__text p");
const imageSlides = document.querySelectorAll(".promo__monitor img");
animationEndFunc(textSlides);
animationEndFunc(imageSlides);


// menu
const haveChild = document.querySelectorAll(".menu-item-has-children");
haveChild.forEach(element => {
  element.insertAdjacentHTML('beforeend', '<span class="menu-item__arrow"></span>');
});

document.addEventListener("click", documentActions);

//Actions делегирование события click
function documentActions(e) {
  const targetElement = e.target;

  if (targetElement.classList.contains('menu-item__arrow')) {
    let parentEl = targetElement.closest('.menu-item-has-children');
    let subMenusShow = document.querySelectorAll("._show-sub-menu");
    
    if (subMenusShow.length == 0) {
      parentEl.classList.add("_show-sub-menu");
    } else if (subMenusShow.length != 0 && targetElement.closest('._show-sub-menu')) {
      parentEl.classList.remove("_show-sub-menu");
    } else if (subMenusShow.length != 0 && !targetElement.closest('._show-sub-menu')) {
      subMenusShow.forEach(element => {
        element.classList.remove("_show-sub-menu");
      });

      parentEl.classList.add("_show-sub-menu");
    } 
  }

  if (targetElement.classList.contains('menu-item a')) {
      subMenusShow.forEach(element => {
        element.classList.remove("_show-sub-menu");
      });
  }
}

