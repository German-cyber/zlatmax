export class StarRating{
    rating; // будет хранится все рейтинги на страницк
    ratingActive; // сколько звездочек закрашено (в конкретном случае)
    ratingValue; // значения в цифрах (в конкретном случае)
    
    selectors = {
        root: "[data-rating]", // селекторы по которым идет доступ к подсказке
        active: ".rating__active", // строка отвечающая за то сколько звездочек активно
        value: ".rating__value", // выбранное значение звездочек
        set: "[data-rating-set]", // атрибут который добовляем возможность менять рейтинг
        radio: ".rating__item", // радио кнопки, которые отвечают за выставление оценки
    }

    constructor (){
        this.rating = document.querySelectorAll(this.selectors.root)
        this.initRatings()
    }

    // разбиваем весь массив элементов на отдельные
    initRatings(){
       this.rating.forEach((item) => this.initRating(item))
    }

    // инициализируем конкретный рейтинг
    initRating(rating){
        this.initRatingVars(rating) // инициализируем переменные
        this.setRatingActiveWidth() // пересчет процентов заполнения

        if(rating.matches(this.selectors.set)){
            this.setRating(rating)
        }
    }

    // инициализация переменных (для конкретного случая)
    initRatingVars(rating){
        this.ratingActive = rating.querySelector(this.selectors.active)
        this.ratingValue = rating.querySelector(this.selectors.value)
    }

    // изменяем ширину активных звезд (index = получаем значения текущие)
    setRatingActiveWidth(index = this.ratingValue.textContent){
        const ratingActiveWidth = index / 0.05 // делим на 0.05 тк переводим 5 звезд в проценты
        this.ratingActive.style.width = `${ratingActiveWidth}%`
    }

    // позволяет указать рейтинг
    setRating(rating){
        const ratingItems = rating.querySelectorAll(this.selectors.radio) // все радио кнопки
        ratingItems.forEach(item => this.listenerAdd(item, rating))
    }

    // функция которая навешивает события 
    listenerAdd(button, rating){
        // событие при наведение
        button.addEventListener("mouseenter", () => this.hoverRating(button, rating) )
        // событие когда мышь убираем (пересчитываем активную полосу)
        button.addEventListener("mouseleave", () => this.setRatingActiveWidth())
        // событие при клики
        button.addEventListener("click", () => this.clickRating(button, rating) )
    }

    // функция наведения 
    hoverRating(button, rating){
        // обновляем переменные
        this.initRatingVars(rating)

        // обновление активной звезды (ту на которую навели)
        this.setRatingActiveWidth(button.value)
    }

    // функция при клики
    clickRating(button, rating){
        // обновляем переменные
        this.initRatingVars(rating)
        
        // проверка используется ли ajax
        if(rating.dataset.ajax){
            this.setRatingValue(rating)
        }else{
            // меняем числовую оценку которую выставил пользователь
            this.ratingValue.textContent = button.value;
            // перерисовка элемента
            this.setRatingActiveWidth()
        }
    }

    // функция для отправки выбранных данных на сервер
    async setRatingValue(rating){
        // в момент отправки добовляем класс rating_sending (для избежания повторных нажатий)
        // делаем проверку на существование этого класса
        if(!rating.classList.contains("rating_sending")){
            rating.classList.add("rating_sending")

            // типо отправка значений на сервер (у нас просто получение данных с него)
            let response = await fetch("rating.json", {
                method: "GET",
            })

            // обработка ответа
            if(response.ok){
                const result = await response.json()

                // получаем новый рейтинг (в данном случае с файла rating.json)
                const newRating = result.newRating 
                // вывод нового рейтинга на страницу
                this.ratingValue.textContent = newRating
                // перерисовка элемента
                this.setRatingActiveWidth()

                rating.classList.remove("rating_sending");
            }else{
                alert("Ошибка");
                rating.classList.remove("rating_sending");
            }
        }
    }
}
