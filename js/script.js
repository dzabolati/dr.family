document.querySelector('.burger').addEventListener('click', function () {
	this.classList.toggle('burger-active');
	document.querySelector('.header__list').classList.toggle('header__list-active');
})

//!btn-up

document.addEventListener("DOMContentLoaded", function () {
	const btnUp = document.querySelector('.btn-up');

	window.addEventListener('scroll', function () {
		if (window.scrollY > 100) {
			btnUp.classList.add('btn-up-active');
		} else {
			btnUp.classList.remove('btn-up-active');
		}
	});

	btnUp.addEventListener('click', function (event) {
		event.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
});

//!popup

let popupBg = document.querySelector('.popup');
let popup = document.querySelector('.popup__form');
let openPopupButtons = document.querySelectorAll('.btn');
let closePopupButton = document.querySelector('.popup__close');

openPopupButtons.forEach((button) => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		popupBg.classList.add('popup-active');
		popup.classList.add('popup__form-active');
	})
});

closePopupButton.addEventListener('click', () => {
	popupBg.classList.remove('popup-active');
	popup.classList.remove('popup__form-active');
});

document.addEventListener('click', (e) => {
	if (e.target === popupBg) {
		popupBg.classList.remove('popup-active');
		popup.classList.remove('popup__form-active');
	}
});