import { plagins } from "../modules/plugins.js";
// функции изменения вложеного меню
import {headerNavAdoptiv} from "../script/header-nav.js"

const burger = document.querySelector('.burger');

burger.addEventListener('click', () => {
	burger.classList.toggle('active');

	// закрываем выпадаюзие меню
	if(document.documentElement.classList.contains("_catalog-open")){
		// прячем все возможные меню
		document.querySelectorAll(".sub-menu-catalog__block").forEach(el => el.classList.add('d-none'))
		document.documentElement.classList.remove("_sub-catalog-open") // убираем тригер
	}

	// закрываем меню каталог если оно открыто
	document.documentElement.classList.contains("_catalog-open") && document.documentElement.classList.remove("_catalog-open")
});

// закрытие номера телефона по клику из вне
const arrowOpen = document.getElementById('header-phone-spoiler'); // стрелочка открытия спойлера
const spoilerBodyHeader = document.querySelector('.phones-header__body'); // тело спойлера

// открытие спойлера
arrowOpen.addEventListener('click', function (e) {
	e.spoilerPhoneHeaderIsOpen = true; // триггер открытия
});

// клик по любому месту (для спойлера)
document.addEventListener('click', function (e) {
	// обрабатываем доступные клики
	if (e.spoilerPhoneHeaderIsOpen === true || e.target.closest('.phones-header__body') || e.target.classList.contains('header-phone-spoiler-js')) return;
	// закрываем спойлер
	spoilerBodyHeader.classList.remove('_body-open');
	spoilerBodyHeader.style.maxHeight = null;
	arrowOpen.classList.remove('_title-open');
});

// открытие меню
const headerNavBtn = document.querySelectorAll('.menu-catalog__link'); // кнопки меню
headerNavBtn.forEach(el => {
	el.addEventListener('click', (e) => {
		const subMenuId = el.dataset.navParent || null; // id меню
		const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`); // тело выпадающего меню
		if (subMenu) {
			const activeLink = document.querySelector("._sub-menu-active"); // активная плашка меню

			e.headerMenuOpen = true
			mixer.filter(`.${subMenu.classList[2]}`); // открываем меню (3 класс отвечает какой блок открыть)

			// если нажали не на активный линк, то убираем выделение
			if(activeLink && activeLink !== el){
				activeLink.classList.remove("_sub-menu-active")
			}

			el.classList.toggle("_sub-menu-active")

			// если нет активного элемента, то закрываем
			if(! document.querySelector("._sub-menu-active")){
				mixer.filter(null);
			}
		}
	});
});


// высчитываем кол-во колонок в пункте меню
const catalogBlock = document.querySelectorAll(".sub-menu-catalog__block") // блоки меню
catalogBlock.forEach(el => {
	let columnCount = el.childElementCount // кол-во вложенных элементов
	el.style.cssText = `grid-template-columns: repeat(${columnCount / 3}, minmax(auto,20rem));` // делим на 3, тк 3 уровня
})

// библиотека для меню
const mixer = plagins.mixitup(".sub-menu-catalog .container", {
	load: {
		filter: 'none', // загрузка категории по умолчанию
	},
});


// удаляем mixer на адоптиве 
const mediaQueryHeader = window.matchMedia('(max-width: 992px)')

function handleTabletChange(e) {
 if (e.matches) {
	mixer.destroy();
	catalogBlock.forEach(el => el.removeAttribute('style'))
	
	// так же на адоптиве включаем скрипт изменения вложенного меню
	headerNavAdoptiv()
 }
}

mediaQueryHeader.addListener(handleTabletChange)
handleTabletChange(mediaQueryHeader) // вызываем функцию первоночально


// клик по любому месту (для меню)
document.addEventListener('click', function (e) {
	// обрабатываем доступные клики
	if (e.headerMenuOpen === true || e.target.closest('.header__catalog.catalog-header')) return;
	// закрываем меню
	mixer.filter(null);
	document.querySelector("._sub-menu-active")?.classList.remove("_sub-menu-active")
});


// открытие каталога товаров в бургер меню
const catalogLinkBurger = document.querySelector(".top-header__link--catalog")
catalogLinkBurger.addEventListener("click", () =>{
	document.documentElement.classList.add("_catalog-open")
})

// закрытие каталога товаров в бургер меню (кнопка назад)
const catalogBackBurger = document.querySelector(".menu-catalog__back") // кнопка назад
catalogBackBurger.addEventListener("click", () => {
	// если открыто меню с акрардеоном то html имеет класс _sub-catalog-open 
	// одна кнопка назад отвечает за закрытия обоих меню
	if(document.documentElement.classList.contains("_sub-catalog-open")){
		document.querySelectorAll(".sub-menu-catalog__block").forEach(el => el.classList.add('d-none')) // закрываем меню
		document.documentElement.classList.remove("_sub-catalog-open") // убираем тригер открытия
	}else{
		document.documentElement.classList.remove("_catalog-open")
	}
})