import { FormValidator } from "./FormValidator.js";
import {Card} from "./Card.js";

const popupElement = document.querySelector('#editProfile');
const popupElementCards = document.querySelector('#addCards');
const popupImage = document.querySelector('#imageOpen');
const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__subtitle');
const popupCaption = popupImage.querySelector('.popup__caption');

popupImage.classList.add('popup_dark');

/*найти, положить элемент кнопки редактирования профиля в переменную, доабвить к нему слушатели и вызвать функцию*/
const elementPen = document.querySelector('.profile__button-editor');
elementPen.addEventListener('click', openEditProfileForm);

/*найти, положить элемент кнопки ЗАКРЫТИЯ редактирования профиля в переменную, доабвить к нему слушатели и вызвать функцию*/
const popupExit = document.querySelector('.popup__exit');
popupExit.addEventListener('click', closeEditProfileForm);

/*найти, положить элемент кнопки ЗАКРЫТИЯ редактирования профиля в переменную, доабвить к нему слушатели при отправке формы,
и вызвать функцию*/
const formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', submitEditProfileForm);

/*переменные, которые находят в dom элементы с соответствующими id */
const inputName = document.querySelector('#name');
const inputJob = document.querySelector('#job');

/*найти, положить элемент кнопки добавления фотокарточек в переменную, доабвить к нему слушатели и вызвать функцию*/
const elementPlus = document.querySelector('.profile__button-addition');
elementPlus.addEventListener('click', openPopupCards);

const popupExitAddCards = popupElementCards.querySelector('.popup__exit');
popupExitAddCards.addEventListener('click', closePopupCards);

const formElementAddCards = popupElementCards.querySelector('.popup__form');
formElementAddCards.addEventListener('submit', addCards);

const popupImgLink = document.querySelector('.popup__image');

const popupImageExit = popupImage.querySelector('.popup__exit');
popupImageExit.addEventListener('click', closePopupImage);

const inputTitle = document.querySelector('#title');
const inputLink = document.querySelector('#link');

/* вытаскиваем контейнер для карточек*/
const cardsList = document.querySelector('.elements__list');
/*заполняем список карточками по умолчанию*/

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


  for(let i = 0; i<initialCards.length; i++){
    const cardElement = createCard(initialCards[i].link, initialCards[i].name);
    cardsList.append(cardElement);
  }

function addCards(evt) {
  evt.preventDefault();
  const cardElement = createCard(inputLink.value, inputTitle.value);
  cardsList.prepend(cardElement);
  evt.target.reset();
  closePopupCards();
}

function createCard (link, name) {
  const cardCreator = new Card(link, name, '#card');
  return cardCreator.createCard();
}

function openEditProfileForm() {
  inputName.value = personName.textContent;
  inputJob.value = personDescription.textContent;
  addPopupOpened(popupElement);
}

function openPopupCards() {
  addPopupOpened(popupElementCards);
}

function closeEditProfileForm() {
  removePopupOpened(popupElement);
}

function closePopupCards() {
  removePopupOpened(popupElementCards);
}

function closePopupImage() {
  removePopupOpened(popupImage);
}

function submitEditProfileForm (evt) {
  evt.preventDefault();
  personName.textContent = inputName.value;
  personDescription.textContent = inputJob.value;
  closeEditProfileForm();
}

function removePopupOpened(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapePressed);
  document.removeEventListener('click', overlayClick);
}

function addPopupOpened(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapePressed);
  document.addEventListener('click', overlayClick);
}

function closeOpenedPopup () {
  const popupOpened = document.querySelector('.popup_opened');
  removePopupOpened(popupOpened);
}

function escapePressed(evt) {
  if(evt.key === 'Escape') {
    closeOpenedPopup();
  }
}

function overlayClick (evt) {
  if(evt.target === popupElement ||
    evt.target === popupElementCards ||
    evt.target === popupImage) {

   closeOpenedPopup();
 }
}


const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__sumbit',
  inactiveButtonClass: 'form__sumbit_inactive',
  inputErrorClass: 'form__input_error_border',
  errorClass: 'form__input_error_active'
}
const profileValidatior = new FormValidator(validationConfig, formElement);
profileValidatior.enableValidation();

const addingFormValidator = new FormValidator(validationConfig, formElementAddCards);
addingFormValidator.enableValidation();

export { popupImage, popupImgLink, popupCaption, addPopupOpened };
