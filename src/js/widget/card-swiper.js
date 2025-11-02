import { plagins } from '../modules/plugins.js';

export class CardSwiper {
	slider; // обьект слайдера

	selectors = {
		root: '[data-mousemove-swiper]',
	};

	constructor() {
		this.initSlider();
		this.listenerAdd(); // устанавливаем обработчики
	}

	initSlider() {
		this.slider = new plagins.swiper(this.selectors.root, {
			speed: 800,
			parallax: true,
			watchOverflow: true, // отключение слайдера если слайдов меньше чем в slidesPerView
			pagination: {
				el: `.product-card__pagination.swiper-pagination`,
				clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 1,
			},
		});
	}

	listenerAdd() {
		document.addEventListener('mousemove', e => this.mouseFunction(e));
	}

	// обработка мыши
	mouseFunction(event) {
		const { target, offsetX } = event;

		// получаем элемент слайдера для управления мышкой
		const sliderElement = target.closest(this.selectors.root);

		// если у родителя нет data атрибута
		if (!sliderElement) return;

		// получаем конкретный слайдер на который навели
		const sliderItem = this.slider[this.getIndex(sliderElement)];

		// кол-во слайдов в данном слайдере
		const sliderLength = sliderItem.slides.length;

		if (sliderLength > 1) {
			const sliderWidth = sliderItem.width;
			// получаем кол-во частей (ширину делим на кол-во слайдов)
			const sliderPart = Math.round(sliderWidth / sliderLength);
			// получаем позицию мышки относительно слайда
			const sliderMousePosition = offsetX - sliderElement.offsetLeft;
			// получаем границы переключения слайда
			const sliderSlide = Math.floor(sliderMousePosition / sliderPart);

			// переключение слайда
			sliderItem.slideTo(sliderSlide);
		}
	}

	// получаем индекс слайдера на который наводим
	// дело в том что мы инициализируем сразу несколько слайдеров
	// и в this.slider массив из всех слайдеров с элементами [data-mousemove-swiper]
	// через эту функцию получаем индекс конкретный элемент
	getIndex = el => Array.from(document.querySelectorAll(this.selectors.root)).indexOf(el);
}
