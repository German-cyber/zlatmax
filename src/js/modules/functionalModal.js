export function modal() {
	const modalContent = document.querySelectorAll('[data-modal-inner]');
	const openModal = document.querySelectorAll('[data-modal-open]');
	const closeModal = document.querySelectorAll('[data-modal-close]');

	// формируем структура (создаем обертку тегом dialog)
	modalContent.forEach(modal => {
		let modalWrapper = document.createElement('dialog');
		modalWrapper.setAttribute(
			'data-modal-wrapper',
			`${modal.dataset.modalInner}`
		);
		modalWrapper.classList.add('dialog');
		document.body.append(modalWrapper);

		modalWrapper.appendChild(modal);
	});

    // обработчики событий на открытие окна
	openModal.forEach(btn => {
		btn.addEventListener('click', function () {
			const dialog = document.querySelector(
				`[data-modal-wrapper="${btn.dataset.modalOpen}"]`
			);
			dialog.classList.add('_modal-open');
			openModalAndBlockScroll(dialog);
		});
	});

    // обработчики событий на закрытие окна
	closeModal.forEach(btn => {
		btn.addEventListener('click', function () {
			const dialog = document.querySelector(
				`[data-modal-wrapper="${btn.dataset.modalClose}"]`
			);
			dialog.classList.remove('_modal-open');
			close(dialog);
		});
	});

	// функции

	function openModalAndBlockScroll(dialog) {
		dialog.showModal();
		document.body.classList.add('scroll-block');
		dialog.addEventListener('cancel', returnScroll);
		dialog.addEventListener('click', closeOnOverClick);
	}

	function returnScroll() {
		document.body.classList.remove('scroll-block');
	}

	function close(dialog) {
		dialog.close();
		returnScroll();
	}

	// закрытие на пустое место
	function closeOnOverClick({ currentTarget, target }) {
		const dialog = currentTarget;
		const isOnOverlayClick = target === dialog;
		if (isOnOverlayClick) close(dialog);
	}
}
