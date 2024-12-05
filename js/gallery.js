document.addEventListener('DOMContentLoaded', () => {
	const gallery = document.querySelector('.gallery');

	gallery.addEventListener('click', (event) => {
		if (event.target.tagName !== 'IMG') return;

		const existingOverlay = document.querySelector('.overlay');
		if (existingOverlay) {
			closeOverlay(existingOverlay);
		}

		const targetImage = event.target;

		const overlay = document.createElement('div');
		overlay.classList.add('overlay');

		const bigImageContainer = document.createElement('div');
		bigImageContainer.classList.add('big-image');

		const bigImageElement = document.createElement('img');
		bigImageElement.src = targetImage.currentSrc;
		bigImageElement.alt = targetImage.alt;

		bigImageContainer.appendChild(bigImageElement);

		const closeButton = document.createElement('div');
		closeButton.classList.add('close');
		closeButton.textContent = '×';
		bigImageContainer.appendChild(closeButton);

		overlay.appendChild(bigImageContainer);

		document.body.appendChild(overlay);

		setBigImageSize(bigImageContainer, bigImageElement, targetImage);

		requestAnimationFrame(() => {
			overlay.classList.add('active');
		});

		closeButton.addEventListener('click', (event) => {
			event.stopPropagation();
			closeOverlay(overlay);
		});

		overlay.addEventListener('click', (event) => {
			if (event.target === overlay) {
				closeOverlay(overlay);
			}
		});

		window.addEventListener('resize', () => {
			setBigImageSize(bigImageContainer, bigImageElement, targetImage);
		});
	});
});

const setBigImageSize = (container, image, targetImage) => {
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;

	const naturalWidth = targetImage.naturalWidth;
	const naturalHeight = targetImage.naturalHeight;

	let width = naturalWidth;
	let height = naturalHeight;

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

	image.style.width = '100%';
	image.style.height = '100%';
}

const closeOverlay = (overlay) => {
	overlay.style.opacity = '0';
	overlay.addEventListener('transitionend', () => {
		if (overlay && overlay.parentNode) {
			overlay.parentNode.removeChild(overlay);
		}
	});
};
