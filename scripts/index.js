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


