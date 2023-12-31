/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import {Pagination, Navigation} from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}
// Инициализация слайдеров


function initSliders() {
	// Добавление классов слайдера
	// при необходимости отключить

	// bildSliders();

	// Перечень слайдеров


	if (document.querySelector('.typical-breakdowns__swiper') && document.documentElement.clientWidth > 768) {
		bildSliders();
		new Swiper('.typical-breakdowns__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			//modules: [Navigation, Pagination],
			modules: [Pagination],
	
			// effect: 'fade',
			// autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },
	
			// observer: true,
			// observeParents: true,
			// slidesPerView: "auto",
			// spaceBetween: 0,
			// autoHeight: true,
			speed: 800,
			// touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,
			// Dotts
			pagination: {
				el: '.typical-breakdowns__pagging',
				clickable: true,
			},
			// Arrows
			// navigation: {
			// 	nextEl: '.about__more .more__item_next',
			// 	prevEl: '.about__more .more__item_prev',
			// },
			breakpoints: {
				// 0: {
				// 	slidesPerView: "auto",
				// 	spaceBetween: 28,
				// },
				// 320: {
				// 	slidesPerView: "auto",
				// 	spaceBetween: 28,
				// },
				768: {
					slidesPerView: 3,
					spaceBetween: 44,
				},
				// 992: {
				// },
				1268: {
					slidesPerView: 5,
					spaceBetween: 44,
				},
			},

			on: {

			}
		});
	}

	if (document.querySelector('.testimonials__swiper')) {
		bildSliders();
		new Swiper('.testimonials__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			//modules: [Navigation, Pagination],
			modules: [Navigation, Pagination],
	
			// effect: 'fade',
			// autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },
	
			// observer: true,
			// observeParents: true,
			// slidesPerView: "auto",
			// spaceBetween: 0,
			autoHeight: true,
			speed: 800,
			// touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,
			// Dotts
			pagination: {
				el: '.testimonials__pagging',
				clickable: true,
			},
			// Arrows
			navigation: {
				prevEl: '.testimonials__arrows .testimonials__arrow_prev',
				nextEl: '.testimonials__arrows .testimonials__arrow_next',

			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					// spaceBetween: 55,
				},
				// 320: {
				// },
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 10,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 10,
				},
			},

			on: {

			}
		});
	}
	
	if (document.querySelector('.how-we-work__swiper') && document.documentElement.clientWidth < 1280) {
		bildSliders();
		new Swiper('.how-we-work__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			//modules: [Navigation, Pagination],
			modules: [Pagination],
	
			// effect: 'fade',
			// autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },
	
			// observer: true,
			// observeParents: true,
			// slidesPerView: "auto",
			// spaceBetween: 0,
			autoHeight: true,
			speed: 800,
			// touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,
			// Dotts
			pagination: {
				el: '.how-we-work__pagging',
				clickable: true,
			},
			// Arrows
			// navigation: {
			// 	prevEl: '.testimonials__arrows .testimonials__arrow_prev',
			// 	nextEl: '.testimonials__arrows .testimonials__arrow_next',

			// },
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 5,
				},
				// 320: {
				// },
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				// 992: {
				// 	slidesPerView: 3,
				// 	spaceBetween: 20,
				// },
				1268: {
					slidesPerView: "auto",
					spaceBetween: 10,
				},
			},

			on: {

			}
		});
	}

	if (document.querySelector('.efficiency__swiper') && document.documentElement.clientWidth < 1280) {
		bildSliders();
		new Swiper('.efficiency__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			//modules: [Navigation, Pagination],
			modules: [Pagination],
	
			// effect: 'fade',
			// autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },
	
			// observer: true,
			// observeParents: true,
			// slidesPerView: "auto",
			// spaceBetween: 0,
			autoHeight: true,
			speed: 800,
			// touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,
			// Dotts
			pagination: {
				el: '.efficiency__pagging',
				clickable: true,
			},
			// Arrows
			// navigation: {
			// 	prevEl: '.testimonials__arrows .testimonials__arrow_prev',
			// 	nextEl: '.testimonials__arrows .testimonials__arrow_next',

			// },
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 5,
				},
				// 320: {
				// },
				768: {
					slidesPerView: 2,
					spaceBetween: 30,
					// centeredSlides: true,
				},
				// 992: {
				// 	slidesPerView: 3,
				// 	spaceBetween: 20,
				// },
				1268: {
					slidesPerView: "auto",
					spaceBetween: 10,
				},
			},

			on: {

			}
		});
	}

	if (document.querySelector('.we-work-how__swiper') && document.documentElement.clientWidth < 1280) {
		bildSliders();
		new Swiper('.we-work-how__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			//modules: [Navigation, Pagination],
			modules: [Pagination],
	
			// effect: 'fade',
			// autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },
	
			// observer: true,
			// observeParents: true,
			// slidesPerView: "auto",
			// spaceBetween: 0,
			// autoHeight: true,
			speed: 800,
			// touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,
			// Dotts
			pagination: {
				el: '.we-work-how__pagging',
				clickable: true,
			},
			// Arrows
			// navigation: {
			// 	prevEl: '.testimonials__arrows .testimonials__arrow_prev',
			// 	nextEl: '.testimonials__arrows .testimonials__arrow_next',

			// },
			breakpoints: {
				0: {
					slidesPerView: 1,
					// spaceBetween: 5,
				},
				// 320: {
				// },
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
					// centeredSlides: true,
				},
				// 992: {
				// 	slidesPerView: 3,
				// 	spaceBetween: 20,
				// },
				1268: {
					slidesPerView: "auto",
					spaceBetween: 10,
				},
			},

			on: {

			}
		});
	}

	if (document.querySelector('.successfull__swiper') && document.documentElement.clientWidth < 1280) {
		bildSliders();
		new Swiper('.successfull__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			//modules: [Navigation, Pagination],
			modules: [Pagination],
	
			// effect: 'fade',
			// autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },
	
			// observer: true,
			// observeParents: true,
			// slidesPerView: "auto",
			// spaceBetween: 0,
			autoHeight: true,
			speed: 800,
			// touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,
			// Dotts
			pagination: {
				el: '.successfull__pagging',
				clickable: true,
			},
			// Arrows
			// navigation: {
			// 	prevEl: '.testimonials__arrows .testimonials__arrow_prev',
			// 	nextEl: '.testimonials__arrows .testimonials__arrow_next',

			// },
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 5,
				},
				// 320: {
				// },
				768: {
					slidesPerView: 2,
					spaceBetween: 30,
					// centeredSlides: true,
				},
				// 992: {
				// 	slidesPerView: 3,
				// 	spaceBetween: 20,
				// },
				1268: {
					slidesPerView: "auto",
					spaceBetween: 10,
				},
			},

			on: {

			}
		});
	}

}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});


window.addEventListener("resize", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});