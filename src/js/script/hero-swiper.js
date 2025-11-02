import { plagins } from "../modules/plugins.js";

if(document.querySelector(".hero-main-page")){

    const swiper = new plagins.swiper('.hero-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        effect: "fade",
        parallax: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".hero-swiper-pagination__bullet.swiper-pagination",
            clickable: true,
        },

        breakpoints:{
            768:{
                allowTouchMove: false, // запрет свайпов с 768px
            }
        },

        on: {
            init(){
                const allSlides = document.querySelector(".fraction-hero__all")
                // при loop слайды дублируются и это нужно чтоб достичь адекватных значений
                const allSlidesItems = document.querySelectorAll(".slide-hero:not(.swiper-slide-duplicate)")
                allSlides.innerHTML = allSlidesItems.length
            },
            slideChange(){
                const currentSlide = document.querySelector(".fraction-hero__current")
                currentSlide.innerHTML = (this.realIndex + 1 < 10) ? `0${this.realIndex + 1}` : this.realIndex + 1
            }
        }
    });

    const swiperMedia = new plagins.swiper('.hero-media-swiper',{
        slidesPerView: 1,
        spaceBetween: 20,
        effect: "fade",
        // связываем пагинацию с кнопками слайдера swiper
        pagination: {
            el: ".hero-swiper-pagination__bullet.swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        breakpoints:{
            768:{
                allowTouchMove: false,// запрет свайпов с 768px
            }
        },

    })

    // функция переключения слайдеров при изменении активного индекса одного из
    const swipeAllSliders = (index) => {
        swiper.slideTo(index);
        swiperMedia.slideTo(index);
    }

    //обработчики смены слайдов
    swiper.on('slideChange', () => swipeAllSliders(swiper.activeIndex));
    swiperMedia.on('slideChange', () => swipeAllSliders(swiperMedia.activeIndex));

}