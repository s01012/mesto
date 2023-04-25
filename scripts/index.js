const popupElement = document.querySelector('#editProfile');
const popupElementCards = document.querySelector('#addCards');
const popupImage = document.querySelector('#imageOpen');
const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__subtitle');
const popupCaption = popupImage.querySelector('.popup__caption');

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

/* вытаскиваем содержимое шаблона и контейнер для карточек*/
const templateContent = document.querySelector('#card').content;
const cardsList = document.querySelector('.elements__list');
const cardTemplate = templateContent.querySelector('.elements__card');
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
    const card = createCard(initialCards[i].link, initialCards[i].name);
    cardsList.append(card);
  }

function createCard(link, name) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.elements__card-image');
  cardElementImage.setAttribute('src', link);
  cardElementImage.setAttribute('alt', name);
  cardElement.querySelector('.elements__card-title').textContent = name;
  cardElement.querySelector('.elements__button').addEventListener('click', activateLike);
  cardElement.querySelector('.elements__delete').addEventListener('click', deleteCards);
  cardElementImage.addEventListener('click', openImage);
  return cardElement;
}

function addCards(evt) {
  const card = createCard(inputLink.value, inputTitle.value);
  cardsList.prepend(card);
  evt.target.reset();
  closePopupCards();
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

/* коллбэк к лайкам */
function activateLike(evt) {
  evt.target.classList.toggle('elements__button_active');
}

function deleteCards(evt) {
  evt.target.closest('.elements__card').remove();

}

function openImage (evt) {
  const cardImage = evt.target.getAttribute('src');
  const cardTitle = evt.target.closest('.elements__card').querySelector('.elements__card-title').textContent;
  popupImgLink.setAttribute('src', cardImage);
  popupImgLink.setAttribute('alt', cardTitle);
  popupCaption.textContent = cardTitle;
  addPopupOpened(popupImage);
  popupImage.classList.add('popup_dark');
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
