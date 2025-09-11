export function tabs() {
	const ulBtn = document.querySelectorAll('[data-button-tabs]');
	const ulContent = document.querySelectorAll('[data-content-tabs]');

	ulBtn.forEach(ul => {
		ul.querySelectorAll('li button').forEach((btn, index) => {
            // связываем кнопки с контентам data атрибутами
			btn.setAttribute(`data-${ul.dataset.buttonTabs}-btn`, index);

			btn.addEventListener('click', function () {
				ul.querySelectorAll('li button').forEach(btn =>
					btn.classList.remove('_active-btn-tabs')
				);
				btn.classList.add('_active-btn-tabs');

				const content = document.querySelector(
					`[data-${ul.dataset.buttonTabs}-content="${
						btn.dataset[`${ul.dataset.buttonTabs}Btn`]
					}"]`
				);

				document
					.querySelectorAll(
						`[data-content-tabs = "${ul.dataset.buttonTabs}"] li`
					)
					.forEach(li => li.classList.remove('_active-content-tabs'));
				content.classList.add('_active-content-tabs');
			});
		});
	});

	ulContent.forEach(ul => {
		ul.querySelectorAll('li').forEach((li, index) => {
            // связываем  контент с кнопками с помощью  data атрибутами
			li.setAttribute(`data-${ul.dataset.contentTabs}-content`, index);
		});
	});
}
