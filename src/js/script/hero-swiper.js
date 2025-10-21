import { plagins } from "../modules/plugins.js";

if(document.querySelector(".hero-main-page")){
    const swiper = new plagins.swiper('.hero-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        effect: "fade",
        allowTouchMove: false,
        parallax: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".hero-swiper-pagination__bullet.swiper-pagination",
            clickable: true,
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
        pagination: {
            el: ".hero-swiper-pagination__bullet.swiper-pagination",
            clickable: true,
        },
        allowTouchMove: false,
        // autoplay: {
        //     delay: 3500,
        //     disableOnInteraction: false,
        // },
    })
}