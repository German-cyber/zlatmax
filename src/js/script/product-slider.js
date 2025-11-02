import { plagins } from '../modules/plugins.js';

export class ProductSlider {
	sliderElement; // элемент слайдера
	slider; // обьект слайдера
	slideCount; // кол-во слайдов
	parentElement; // родительский элемент слайдера

	constructor(element, countSlider, parentElement) {
		this.sliderElement = element;
		this.slideCount = countSlider;
		this.parentElement = parentElement;
		this.initSlider();
	}

	initSlider() {
		this.slider = new plagins.swiper(this.sliderElement, {
			slidesPerView: 1.3,
			spaceBetween: 15,
			watchOverflow: true, // отключение слайдера если слайдов меньше чем в slidesPerView
			pagination: {
				el: `${this.parentElement} .swiper-pagination`,
				clickable: true,
			},
			autoplay: {
				delay: 3500,
				disableOnInteraction: false,
			},
			breakpoints: {
				1220: {
					slidesPerView: this.slideCount,
					spaceBetween: 30,
				},
				992: {
					slidesPerView: this.slideCount - 1,
					spaceBetween: 25,
				},
				568: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
			},
		});
	}
}
