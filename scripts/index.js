let popupElement = document.querySelector('.popup');
let personName = document.querySelector('.profile__title');
let personDescription = document.querySelector('.profile__subtitle');

let elementPen = document.querySelector('.profile__button-editor');
elementPen.addEventListener('click', openPopup);

let popupExit = document.querySelector('.popup__exit');
popupExit.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', handleFormSubmit);


function openPopup() {
  let inputName = document.getElementById('name');
  inputName.value = personName.textContent;

  let inputJob = document.getElementById('job');
  inputJob.value = personDescription.textContent;

  popupElement.classList.add('popup_opened');
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  let userName = document.querySelector('.profile__title');
  userName.textContent = document.getElementById('name').value;
  let userJob = document.querySelector('.profile__subtitle');
  userJob.textContent = document.getElementById('job').value;
  closePopup();
}


