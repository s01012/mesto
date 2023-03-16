let popupElement = document.querySelector('.popup');
let personName = document.querySelector('.profile__title');
let personDescription = document.querySelector('.profile__subtitle');

let elementPen = document.querySelector('.profile__button-editor');
elementPen.addEventListener('click', openPopup);

let popupExit = document.querySelector('.popup__exit');
popupExit.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', handleFormSubmit);

let inputName = document.getElementById('name');
let inputJob = document.getElementById('job');
/* вытаскиваем содержимое шаблона и контейнер для карточек*/
const templateContent = document.querySelector('#card').content;
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
  const card = templateContent.querySelector('.elements__card').cloneNode(true);
  card.querySelector('.elements__card-image').setAttribute('src', initialCards[i].link);
  card.querySelector('.elements__card-title').textContent = initialCards[i].name;
  card.querySelector('.elements__button').addEventListener('click', activateLike);
  cardsList.append(card);
}


function openPopup() {
  inputName.value = personName.textContent;
  inputJob.value = personDescription.textContent;
  popupElement.classList.add('popup_opened');
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  personName.textContent = inputName.value;
  personDescription.textContent = inputJob.value;
  closePopup();
}

/* коллбэк к лайкам */
function activateLike(evt) {
  evt.target.classList.toggle('elements__button_active');
}
