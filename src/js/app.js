// плюшки
import * as imagesFunction from './modules/functionalImages.js'
import * as spoilerWidget from "./modules/functionalSpoiler.js"
import * as modalWidget from "./modules/functionalModal.js"
import * as tabsWidget from "./modules/functionalTabs.js"

imagesFunction.imagesWrapper() // обертака над картинками
spoilerWidget.spoiler() // подключение спойлера по data - атрибутам
modalWidget.modal() // подключение модального окна по data - атрибутам
tabsWidget.tabs() // подключение табов по data - атрибутам

// swiper
// import "./library/swiper.min"