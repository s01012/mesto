let popupElement = document.querySelector('#editProfile');
let popupElementCards = document.querySelector('#addCards');
let popupImage = document.querySelector('#imageOpen');
let personName = document.querySelector('.profile__title');
let personDescription = document.querySelector('.profile__subtitle');

let hello = document.querySelectorAll('.section_hello');
console.log(hello);



/*найти, положить элемент кнопки редактирования профиля в переменную, доабвить к нему слушатели и вызвать функцию*/
let elementPen = document.querySelector('.profile__button-editor');
elementPen.addEventListener('click', openPopup);

/*найти, положить элемент кнопки ЗАКРЫТИЯ редактирования профиля в переменную, доабвить к нему слушатели и вызвать функцию*/
let popupExit = document.querySelector('.popup__exit');
popupExit.addEventListener('click', closePopup);

/*найти, положить элемент кнопки ЗАКРЫТИЯ редактирования профиля в переменную, доабвить к нему слушатели при отправке формы,
и вызвать функцию*/
let formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', handleFormSubmit);

/*переменные, которые находят в dom элементы с соответствующими id */
let inputName = document.getElementById('name');
let inputJob = document.getElementById('job');

/*найти, положить элемент кнопки добавления фотокарточек в переменную, доабвить к нему слушатели и вызвать функцию*/
let elementPlus = document.querySelector('.profile__button-addition');
elementPlus.addEventListener('click', openPopupCards);

let popupExitAddCards = popupElementCards.querySelector('.popup__exit');
popupExitAddCards.addEventListener('click', closePopupCards);

let formElementAddCards = popupElementCards.querySelector('.popup__form');
formElementAddCards.addEventListener('submit', addCards);


let popupImgLink = document.querySelector('.popup__image');

let popupImageExit = popupImage.querySelector('.popup__exit');
popupImageExit.addEventListener('click', closePopupImage);


let inputTitle = document.getElementById('title');
let inputLink = document.getElementById('link');

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
    let card = templateContent.querySelector('.elements__card').cloneNode(true);
    card.querySelector('.elements__card-image').setAttribute('src', initialCards[i].link);
    card.querySelector('.elements__card-image').setAttribute('alt', initialCards[i].name);
    card.querySelector('.elements__card-title').textContent = initialCards[i].name;
    card.querySelector('.elements__button').addEventListener('click', activateLike);
    card.querySelector('.elements__delete').addEventListener('click', deleteCards);
    card.querySelector('.elements__card-image').addEventListener('click', openImage);
    cardsList.append(card);
  }




function addCards() {
  let card = templateContent.querySelector('.elements__card').cloneNode(true);
  card.querySelector('.elements__card-image').setAttribute('src', inputLink.value);
  card.querySelector('.elements__card-image').setAttribute('alt', inputTitle.value);
  card.querySelector('.elements__card-title').textContent = inputTitle.value;
  card.querySelector('.elements__button').addEventListener('click', activateLike);
  card.querySelector('.elements__delete').addEventListener('click', deleteCards);
  card.querySelector('.elements__card-image').addEventListener('click', openImage);
  cardsList.prepend(card);
  inputLink.value = '';
  inputTitle.value = '';
  closePopupCards();
  closePopupImage();
}

function openPopup() {
  inputName.value = personName.textContent;
  inputJob.value = personDescription.textContent;
  popupElement.classList.add('popup_opened');
}

function openPopupCards() {
  inputName.value = personName.textContent;
  inputJob.value = personDescription.textContent;
  popupElementCards.classList.add('popup_opened');
}

function closePopup() {
  popupElement.classList.remove('popup_opened');

}

function closePopupCards() {
  popupElementCards.classList.remove('popup_opened');

}

function closePopupImage() {
  popupImage.classList.remove('popup_opened');

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

function deleteCards(evt) {
  evt.target.closest('.elements__card').remove();

}


function openImage (evt) {
  let cardImage = evt.target.getAttribute('src');
  let cardTitle = evt.target.closest('.elements__card').querySelector('.elements__card-title').textContent;
  popupImgLink.setAttribute('src', cardImage);
  popupImgLink.setAttribute('alt', cardTitle);
  let popupCaption = popupImage.querySelector('.popup__caption');
  popupCaption.textContent = cardTitle;
  popupImage.classList.add('popup_opened');
  popupImage.classList.add('popup_dark');
}

