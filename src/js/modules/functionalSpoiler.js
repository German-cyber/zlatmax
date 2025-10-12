export function spoiler() {
    // все спойлеры на странице по дата - атрибутам (заголовки)
	const title = document.querySelectorAll('[data-acord-title]');

	title.forEach(titleItem => {
		titleItem.addEventListener('click', () => {
            //  получаем тело спойлера
			const acordBody = titleItem.nextElementSibling;
			console.log(acordBody);
			
            // если открыт
			if (titleItem.classList.contains('_title-open')) {
				acordBody.style.maxHeight = null;
				titleItem.classList.remove('_title-open');
				acordBody.classList.remove('_body-open');
			} else {
				acordBody.style.maxHeight = acordBody.scrollHeight + 20+ 'px'; 
				titleItem.classList.add('_title-open');
				acordBody.classList.add('_body-open');
			}
		});
	});
}
