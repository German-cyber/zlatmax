// перестроение выподающего меню на адоптиве

const mixBody = document.querySelectorAll('[data-submenu]'); // выпадающие меню 

// перемещение элементов
function elementMove(el, index) {
	const categoryList = document.querySelectorAll('.sub-menu-catalog__list'); // выпадающий лист с каждой категории

	categoryList[index].before(el); // помещаем  categoryList[index]  после указаного элемента
	// добовляем data для спойлеров
	el.setAttribute('data-acord-title', '');
	categoryList[index].setAttribute('data-acord-body', '');
}

// логика открытия меню
function openSubMenu() {
	// скрываем элементы
	mixBody.forEach(el => {
		el.classList.add('d-none');
	});

	const openLink = document.querySelectorAll('.menu-catalog__link');
	openLink.forEach(el => {
		el.addEventListener('click', e => {
            // удаляем стили библиотеки mixup при клике
			document.querySelector('.sub-menu-catalog .container').removeAttribute('style');

            //  в зависимости от того какую сслыку нажали, то меню и открываем (свзаны по data атрибутам)
			let number = el.dataset.navParent || null;
			
			const bodyNav = document.querySelector(`[data-submenu = "${number}"]`);
			if (bodyNav) {
				bodyNav.classList.remove('d-none');
                // btnBack.classList.remove("_block-close") // показываем кнопку назад
				document.documentElement.classList.add("_sub-catalog-open")
			}
		});
	});
}

export function headerNavAdoptiv() {
	const category = document.querySelectorAll('.sub-menu-catalog__category'); // категории заголовки
	category.forEach((el, index) => elementMove(el, index));
	// слушатели событий на открытие меню
	openSubMenu();
}
