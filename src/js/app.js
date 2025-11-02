// плюшки
import * as imagesFunction from './modules/functionalImages.js'
import * as spoilerWidget from "./modules/functionalSpoiler.js"
import * as modalWidget from "./modules/functionalModal.js"
import * as tabsWidget from "./modules/functionalTabs.js"
import {StarRating} from "./modules/star-rating.js"
import {Spoiler} from "./modules/adapt-spoiler.js"


imagesFunction.imagesWrapper() // обертака над картинками
spoilerWidget.spoiler() // подключение спойлера по data - атрибутам
modalWidget.modal() // подключение модального окна по data - атрибутам
tabsWidget.tabs() // подключение табов по data - атрибутам
new StarRating; // звездный рейтинг
new Spoiler; // адаптивный спойлер

// динамический адоптив
import "./library/dynamic_adapt.js";

// swiper
// import "./library/swiper.min"

// шапка
import "./script/header.js";

// слайдер на главной (hero)
import "./script/hero-swiper.js"

// подключение слайдеров товаров
import "./widget/all-product-slider.js"