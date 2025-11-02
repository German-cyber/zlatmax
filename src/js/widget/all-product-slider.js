import {ProductSlider} from "../script/product-slider.js"
import {CardSwiper} from "../widget/card-swiper.js"

// все слайдеры товаров на странице

// слайдер первый хиты
if(document.querySelector(".product-slider-four-slide")){
    new ProductSlider(".product-slider-four-slide .product-slider__swiper", 4, ".product-slider__slider");
}

// слайдер фото в карточки товара
if(document.querySelector(".product-card")){
    new CardSwiper();
}

// слайдер в блоке новинки (с 3 слайдами)
if(document.querySelector(".product-slider-three-slide")){
    new ProductSlider(".product-slider-three-slide .product-slider__swiper", 3, ".product-slider__slider");
}

