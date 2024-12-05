document.querySelector('.burger').addEventListener('click', function () {
	this.classList.toggle('burger-active');
	document.querySelector('.header__list').classList.toggle('header__list-active');
})

//!btn-up

// После загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
	const btnUp = document.querySelector('.btn-up');

	// Показать/спрятать кнопку в зависимости от прокрутки
	window.addEventListener('scroll', function () {
		if (window.scrollY > 100) {
			btnUp.classList.add('btn-up-active');
		} else {
			btnUp.classList.remove('btn-up-active');
		}
	});

	// Плавный возврат наверх при клике на кнопку
	btnUp.addEventListener('click', function (event) {
		event.preventDefault(); // Предотвращаем стандартное поведение
		window.scrollTo({
			top: 0,
			behavior: 'smooth' // Плавная прокрутка
		});
	});
});

//!popup

let popupBg = document.querySelector('.popup'); // Фон попап окна
let popup = document.querySelector('.popup__form'); // Само окно
let openPopupButtons = document.querySelectorAll('.btn'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.popup__close'); // Кнопка для скрытия окна

openPopupButtons.forEach((button) => { // Перебираем все кнопки
	button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
		e.preventDefault(); // Предотвращаем дефолтное поведение браузера
		popupBg.classList.add('popup-active'); // Добавляем класс 'active' для фона
		popup.classList.add('popup__form-active'); // И для самого окна
	})
});

closePopupButton.addEventListener('click', () => { // Вешаем обработчик на крестик
	popupBg.classList.remove('popup-active'); // Убираем активный класс с фона
	popup.classList.remove('popup__form-active'); // И с окна
});

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
	if (e.target === popupBg) { // Если цель клика - фот, то:
		popupBg.classList.remove('popup-active'); // Убираем активный класс с фона
		popup.classList.remove('popup__form-active'); // И с окна
	}
});