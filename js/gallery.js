document.addEventListener('DOMContentLoaded', () => {
	const gallery = document.querySelector('.gallery');

	// Основной обработчик клика по галерее
	gallery.addEventListener('click', (event) => {
		if (event.target.tagName !== 'IMG') return; // Проверка, что клик был по изображению

		// Проверка, есть ли уже открытый big-image и закрытие его перед созданием нового
		const existingOverlay = document.querySelector('.overlay');
		if (existingOverlay) {
			closeOverlay(existingOverlay);
		}

		const targetImage = event.target;

		// Создание оверлея (слоя для затемнения фона)
		const overlay = document.createElement('div');
		overlay.classList.add('overlay');

		// Создание контейнера для большого изображения
		const bigImageContainer = document.createElement('div');
		bigImageContainer.classList.add('big-image');

		// Создание элемента изображения внутри контейнера
		const bigImageElement = document.createElement('img');
		bigImageElement.src = targetImage.currentSrc;
		bigImageElement.alt = targetImage.alt;

		// Добавление элемента изображения в контейнер
		bigImageContainer.appendChild(bigImageElement);

		// Добавление кнопки закрытия
		const closeButton = document.createElement('div');
		closeButton.classList.add('close');
		closeButton.textContent = '×';
		bigImageContainer.appendChild(closeButton);

		// Добавление контейнера изображения и кнопки закрытия в оверлей
		overlay.appendChild(bigImageContainer);

		// Добавление оверлея в тело документа
		document.body.appendChild(overlay);

		// Установка динамических размеров для изображения
		setBigImageSize(bigImageContainer, bigImageElement, targetImage);

		// Плавное появление
		requestAnimationFrame(() => {
			overlay.classList.add('active');
		});

		// Обработчик для кнопки закрытия
		closeButton.addEventListener('click', (event) => {
			event.stopPropagation(); // Остановить всплытие события
			closeOverlay(overlay);
		});

		// Обработчик для закрытия по клику на пустую область оверлея (вне контейнера)
		overlay.addEventListener('click', (event) => {
			if (event.target === overlay) {
				closeOverlay(overlay);
			}
		});

		// Обработчик изменения размера окна
		window.addEventListener('resize', () => {
			setBigImageSize(bigImageContainer, bigImageElement, targetImage);
		});
	});
});

// Функция для установки размера большого изображения
const setBigImageSize = (container, image, targetImage) => {
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;

	// Используем натуральные размеры изображения, но ограничиваем их текущими размерами экрана
	const naturalWidth = targetImage.naturalWidth;
	const naturalHeight = targetImage.naturalHeight;

	let width = naturalWidth;
	let height = naturalHeight;

	// Ограничение размеров, чтобы изображение не превышало 90% экрана
	if (width > screenWidth * 0.9) {
		const scaleFactor = (screenWidth * 0.9) / width;
		width = width * scaleFactor;
		height = height * scaleFactor;
	}

	if (height > screenHeight * 0.9) {
		const scaleFactor = (screenHeight * 0.9) / height;
		width = width * scaleFactor;
		height = height * scaleFactor;
	}

	container.style.width = `${width}px`;
	container.style.height = `${height}px`;

	// Устанавливаем размеры изображения, чтобы оно вписывалось в контейнер
	image.style.width = '100%';
	image.style.height = '100%';
}

// Функция для закрытия оверлея с большим изображением
const closeOverlay = (overlay) => {
	overlay.style.opacity = '0'; // Плавное исчезновение перед удалением
	overlay.addEventListener('transitionend', () => {
		if (overlay && overlay.parentNode) {
			overlay.parentNode.removeChild(overlay);
		}
	});
};
