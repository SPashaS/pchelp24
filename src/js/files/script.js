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
  element.insertAdjacentHTML('beforeend', '<span class="menu-item__arrow _icon-bottom"></span>');
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



//////////////////////////     GSAP   /////////////////////////////////////////  

const advPage = document.querySelector(".page-adv");

if( advPage ) {
  gsap.registerPlugin(TextPlugin,MotionPathPlugin);

  document.addEventListener('DOMContentLoaded', () => {
    const pcScreen = window.matchMedia('(min-width: 1278px');
    if(pcScreen.matches) {

      const tL = gsap.timeline()
      
      tL.fromTo('.header__menu', {
          y: 0,
          x: -100,
          opacity: 0,
          transformOrigin: 'right left',
          scale: 0.6
        }, {
          y: 0,
          x: 0,
          opacity: 1,
          duration: 1.3,
          scale: 1
        }, 0.7,
      )
      .fromTo('.header__button', {
        y: 0,
        x: -250,
        opacity: 0,
        transformOrigin: 'right left',
        scale: 0.6
      }, {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 1.3,
        scale: 1
      }, 0.7,
      )
      .fromTo('.promo-adv__image', {
        y: -120,
    
        opacity: 0,
        transformOrigin: 'top center',
        scale: 0.4,
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.3,
      },1.4,
      )
      .fromTo('.promo-adv__col_1', {
        y: -50,
        x: 0,
        opacity: 0,
        transformOrigin: 'left center',
        scale: 0.4,
      }, {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.3,
      },1.4,
      )
      /////////////////////// scroll
    
      // revolution
      gsap.from(".revolution__title", {
          scrollTrigger: {
            // markers: true,
            trigger: ".promo-adv__body",
            start: 'top 10%',
            end: 'center 25%',
            // scrub: true,
          },
          scale: 0.4,
          opacity: 0,
          x: -200,
          transformOrigin: 'left center',
          duration: 1,
          delay: .5,
      })
      gsap.from(".item-revolution_2", {
        scrollTrigger: {
          // markers: true,
          trigger: ".revolution",
          start: 'top 40%',
          end: 'center 55%',
          // scrub: true,
        },
        scale: 0.4,
        opacity: 0,
        x: -400,
        transformOrigin: 'left center',
        duration: 2,
        delay: 1,
      })
      gsap.from(".item-revolution_1", {
        scrollTrigger: {
          // markers: true,
          trigger: ".revolution",
          start: 'top 40%',
          end: 'center 55%',
          // scrub: true,
        },
        scale: 0.6,
        opacity: 0,
        x: 500,
        transformOrigin: 'center right',
        duration: 1.5,
        delay: 3,
      })
      gsap.from(".revolution__center", {
        scrollTrigger: {
          // markers: true,
          trigger: ".revolution",
          start: 'top 40%',
          end: 'center 55%',
          // scrub: true,
        },
        scale: 0.6,
        opacity: 0,
        y: 10,
        transformOrigin: 'bottom center',
        duration: 1.5,
        delay: 4,
      })
      gsap.from(".revolution__bottom", {
        scrollTrigger: {
          // markers: true,
          trigger: ".revolution",
          start: 'top 40%',
          end: 'center 55%',
          // scrub: true,
        },
        scale: 0.6,
        opacity: 0,
        y: 10,
        transformOrigin: 'bottom center',
        duration: 1.5,
        delay: 5,
      })
    
      // efficiency
      gsap.from(".efficiency__title", {
        scrollTrigger: {
          // markers: true,
          trigger: ".revolution",
          start: 'top 10%',
          end: 'center 25%',
          // scrub: true,
        },
        scale: 0.4,
        opacity: 0,
        x: -200,
        transformOrigin: 'left center',
        duration: 1,
        delay: .5,
      })
      gsap.from(".efficiency__slide", {
        scrollTrigger: {
          // markers: true,
          trigger: ".revolution",
          start: 'center 10%',
          // end: 'center 25%',
          // scrub: true,
        },
        scale: 0,
        opacity: 0,
        transformOrigin: 'left center',
        duration: 1,
        delay: .5,
        stagger: 0.3,
        ease: "slow(0.7,0.7,false)",
        y: -350,
      })
    
      // call-urgently__title
      gsap.from(".call-urgently__title", {
        scrollTrigger: {
          // markers: true,
          trigger: ".efficiency__container",
          start: 'center 20%',
          // end: 'center 25%',
          // scrub: true,
        },
        scale: 0.4,
        opacity: 0,
        x: -200,
        transformOrigin: 'left center',
        duration: 1,
        delay: .5,
      })
      gsap.from(".item-call-urgently_1", {
        scrollTrigger: {
          // markers: true,
          trigger: ".efficiency__container",
          start: '80% 20%',
          // end: 'center 25%',
          // scrub: true,
        },
        scale: 0.4,
        opacity: 0,
        x: 200,
        transformOrigin: 'left right',
        duration: 1,
        delay: .5,
      })
      gsap.from(".item-call-urgently_1 .chart-box__num", {
        scrollTrigger: {
          trigger: ".efficiency__container",
          start: '80% 20%',
        },
        textContent: 0,
        delay: 0.5,
        duration: 2,
        ease: "power1.in",
        snap: { textContent: 1 },
        stagger: {
          each: 1.0,
          onUpdate: function() {
            this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
          },
        }
      })
      gsap.from(".item-call-urgently_1 .ico-line", {
        scrollTrigger: {
          trigger: ".efficiency__container",
          start: '80% 20%',
        },
        // drawSVG:0,
        // opacity: 0,
        // scale: 0,
        width: 0,
        // transformOrigin: 'left center',
        delay: 2.5,
        duration: 2,
        // ease: "power1.in",
      })
      gsap.to(".item-call-urgently_1",1, {
        scrollTrigger: {
          // markers: true,
          trigger: ".efficiency__container",
          start: 'center 20%',
        },
        className:"call-urgently__item item-call-urgently item-call-urgently_1 animation-chart-box", 
        delay: .5,
      })
      gsap.from(".item-call-urgently_2", {
        scrollTrigger: {
          // markers: true,
          trigger: ".efficiency__container",
          start: '80% 20%',
          // end: 'center 25%',
          // scrub: true,
        },
        scale: 0.4,
        opacity: 0,
        x: 0,
        transformOrigin: 'center',
        duration: 1,
        delay: 2.5,
      })
      gsap.to(".item-call-urgently_2",1, {
        scrollTrigger: {
          // markers: true,
          trigger: ".efficiency__container",
          start: 'center 20%',
        },
        className:"call-urgently__item item-call-urgently item-call-urgently_2 animation-chart-box", 
        delay: 3,
      })
      gsap.from(".item-call-urgently_2 .chart-box__num", {
        scrollTrigger: {
          trigger: ".efficiency__container",
          start: '80% 20%',
        },
        textContent: 0,
        delay: 3,
        duration: 3,
        ease: "power1.in",
        snap: { textContent: 1 },
        stagger: {
          each: 1.0,
          onUpdate: function() {
            this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
          },
        }
      })
      gsap.from(".item-call-urgently_2 .ico-line", {
        scrollTrigger: {
          trigger: ".efficiency__container",
          start: '80% 20%',
        },
        // drawSVG:0,
        // opacity: 0,
        // scale: 0,
        width: 0,
        // transformOrigin: 'left center',
        delay: 5.5,
        duration: 2,
        // ease: "power1.in",
      })
      gsap.from(".item-call-urgently_3", {
        scrollTrigger: {
          // markers: true,
          trigger: ".efficiency__container",
          start: '80% 20%',
          // end: 'center 25%',
          // scrub: true,
        },
        scale: 0.4,
        opacity: 0,
        x: -200,
        transformOrigin: 'left center',
        duration: 1,
        delay: 1.5,
      })
      gsap.to(".item-call-urgently_3",1, {
        scrollTrigger: {
          // markers: true,
          trigger: ".efficiency__container",
          start: 'center 20%',
        },
        className:"call-urgently__item item-call-urgently item-call-urgently_3 animation-chart-box", 
        delay: 1.5,
      })
      gsap.from(".item-call-urgently_3 .ico-line", {
        scrollTrigger: {
          trigger: ".efficiency__container",
          start: '80% 20%',
        },
        // drawSVG:0,
        // opacity: 0,
        // scale: 0,
        width: 0,
        // transformOrigin: 'left center',
        delay: 3.5,
        duration: 2,
        // ease: "power1.in",
      })
    
    
    
      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    
    
      // call-urgently
      gsap.from(".adv-contacts__tel", {
        scrollTrigger: {
          // markers: true,
          trigger: ".cost-services",
          start: 'center 20%',
          // end: 'center 25%',
          // scrub: true,
        },
        text: "+",
        // x: "50%",
        ease: "none",
        duration: 1.2,
        // delay: .5,
      })
    
      gsap.from(".footer__tel", {
        scrollTrigger: {
          // markers: true,
          trigger: ".adv-contacts",
          start: 'top 20%',
          // end: 'center 25%',
          // scrub: true,
        },
        text: "+",
        // x: "50%",
        ease: "none",
        duration: 1.2,
        // delay: .5,
      })
    
      // successfull
      gsap.from(".successfull__slide", {
        scrollTrigger: {
          // markers: true,
          trigger: ".connection",
          start: 'bottom 10%',
          // end: 'center 25%',
          // scrub: true,
        },
        scale: 0,
        opacity: 0,
        transformOrigin: 'center',
        duration: 1,
        delay: .5,
        stagger: 0.3,
        ease: "none",
        // y: -350,
      })
    
  
  
  
    }
  
  });
}








// gsap.registerPlugin(TextPlugin)

// gsap.to(".promo__text", {
//   duration: 2,
//   text: {
//     value: "sdfasdfasdf",
//   }
// })
