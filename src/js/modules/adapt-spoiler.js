export class Spoiler {
	#spoilerArray; // массив всех спойлеров
	#spoilerRegular; // обычные спойлеры (без медиазапросов)
	#spoilerMedia; // спойлеры с медиа

	// селекторы элементов
	#selectors = {
		root: '[data-spollers]',
		btn: '[data-spoller]',
		oneSpoiler: 'data-one-spoller',
		close: '[data-spoller-close]',
	};

	constructor() {
		// инициализируем массив всех спойлеров
		this.#spoilerArray = document.querySelectorAll(this.#selectors.root);
		// проверка на их существование
		if (this.#spoilerArray.length < 0) return;
		// делаем деконструктизацию обьекта и присвоение
		({ media: this.#spoilerMedia, regular: this.#spoilerRegular } = this.sortElement());

		// если есть обычные спойлеры то инициализируе их
		if (this.#spoilerRegular.length > 0) this.initSpoiler(this.#spoilerRegular);
		// если есть медиа спойлеры то инициализируе их
		if (this.#spoilerMedia.length > 0) this.initMediaSpoiler();

		this.closeClickSlider();
	}

	// функция которая разделяем спойлеры на те которые
	// обычные и с медиа
	sortElement = () => {
		// аккамулятор хранит обьект 2х массивов, которые мы будем заполнять
		// на каждом шаге заполняем аккамултор данными и возращаем его, чтоб на следующем шаге продолжить с ним работу
		// акамулятор(первый парамент) содержит в себе то, что вернула функция на прошлом шаге
		return Array.from(this.#spoilerArray).reduce(
			(acc, element) => {
				// проверка существует ли элемент
				const hasMediaQuery = Boolean(element.dataset.spollers?.split(',')[0]);

				if (hasMediaQuery) {
					acc.media.push(element);
				} else {
					acc.regular.push(element);
				}

				return acc;
			},
			{ media: [], regular: [] }
		);
	};

	// инициализация обычного спойлера
	initSpoiler(spollersArray, matchMedia = false) {
		/*
            Используем bind!!! Функции setSpollerAction будут вызываться через addEventListener
            Он в свое время переопределит this дом обьектом. Через bind мы насильно связываем this в этих функциях
            c нашим классом, а не с document.getElementById("basilder") как установит addEventListener
        */
		this.setSpollerAction = this.setSpollerAction.bind(this);

		spollersArray.forEach(spollersBlock => {
			// сортируем на обычные спойлеры или с поддержкой медиа (spollersBlock имеет разные форматы)
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;

			// matchMedia.matches - проверка на то что брекпоинт сработал
			// !matchMedia - выполняем если обычный спойлер (без медиа)
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_spoller-init');
				this.initSpollerBody(spollersBlock); // формируем тело (доступность)
				spollersBlock.addEventListener('click', this.setSpollerAction);
			} else {
				spollersBlock.classList.remove('_spoller-init');
				this.initSpollerBody(spollersBlock, false); // формируем тело (доступность)
				spollersBlock.removeEventListener('click', this.setSpollerAction);
			}
		});
	}

	// открытие по клику
	setSpollerAction(e) {
		const el = e.target;
		if (el.closest(this.#selectors.btn)) {
			const spollerTitle = el.closest(this.#selectors.btn);
			const spollersBlock = spollerTitle.closest(this.#selectors.root);
			const oneSpoller = spollersBlock.hasAttribute(this.#selectors.oneSpoiler);
			const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
					this.hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_spoller-active');
				this._slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
			}
			e.preventDefault();
		}
	}

	hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
		const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
		if (spollerActiveTitle && !spollersBlock.querySelectorAll('._slide').length) {
			spollerActiveTitle.classList.remove('_spoller-active');
			this._slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
		}
	}

	// формируем элементы доступности
	initSpollerBody(spollersBlock, hideSpollerBody = true) {
		let spollerTitles = spollersBlock.querySelectorAll(this.#selectors.btn);
		if (spollerTitles.length) {
			spollerTitles = Array.from(spollerTitles).filter(item => item.closest(this.#selectors.root) === spollersBlock);
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_spoller-active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}

	// инициализация спойлера с медиа
	initMediaSpoiler() {
		if (this.#spoilerMedia.length > 0) {
			this.dataMediaQueries();
		}
	}

	dataMediaQueries() {
		// массив обьектов который содержит подход min/max и размер экрана
		const breakpointsArray = [];
		// заполняем массив данными из data атрибута
		this.#spoilerMedia.forEach(item => {
			const params = item.dataset.spollers;

			const breakpoint = {};
			const paramsArray = params.split(',');
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// собираем сторку с медиа запросом а так же значения через запятую
		// и записываев все в массив
		let mdQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
		});

		// уникализируем массив (через Set)
		mdQueries = Array.from(new Set(mdQueries));

		mdQueries.forEach(breakpoint => {
			// делаем из строки массив и деконстутизируем его
			const [mediaMatchMedia, mediaBreakpoint, mediaType] = breakpoint.split(',');
			// matchMedia для слушателя изменения экрана
			const matchMedia = window.matchMedia(mediaMatchMedia);

			// Объекты с нужными условиями
			const itemsArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});

			// событие
			matchMedia.addListener( () => {
				this.initSpoiler(itemsArray, matchMedia); // запуск по срабатыванию события
			});

			this.initSpoiler(itemsArray, matchMedia); // первоночальный запуск
		});
	}

	//плавное открытие и закрытие (взаимодействие с css)
	_slideUp(target, duration = 500, showmore = 0) {
		if (!target?.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = `${target.offsetHeight}px`;
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = !showmore ? true : false;
				!showmore ? target.style.removeProperty('height') : null;
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				!showmore ? target.style.removeProperty('overflow') : null;
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				// Создаем событие
				document.dispatchEvent(
					new CustomEvent('slideUpDone', {
						detail: {
							target: target,
						},
					})
				);
			}, duration);
		}
	}

	_slideDown(target, duration = 500, showmore = 0) {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.hidden = target.hidden ? false : null;
			showmore ? target.style.removeProperty('height') : null;
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				// Создаем событие
				document.dispatchEvent(
					new CustomEvent('slideDownDone', {
						detail: {
							target: target,
						},
					})
				);
			}, duration);
		}
	}

	_slideToggle(target, duration = 500) {
		if (target.hidden) {
			return this._slideDown(target, duration);
		} else {
			return this._slideUp(target, duration);
		}
	}

	// Закрытие при клике вне спойлера
	closeClickSlider() {
		const spollersClose = document.querySelectorAll(this.#selectors.close);
		if (spollersClose.length) {
			document.addEventListener('click',  (e) => this._closeSpoiler(e, spollersClose));
		}
	}

	// функционал закрытия
	_closeSpoiler(e, spollersClose) {
		const el = e.target;
		if (!el.closest(this.#selectors.root)) {
			spollersClose.forEach(spollerClose => {
				const spollersBlock = spollerClose.closest(this.#selectors.root);
				if (spollersBlock.classList.contains('_spoller-init')) {
					const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
					spollerClose.classList.remove('_spoller-active');
					this._slideUp(spollerClose.nextElementSibling, spollerSpeed);
				}
			});
		}
	}
}
