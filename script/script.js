function openPopup() {
  let popup_element = document.querySelector('.popup');
  let personName = document.querySelector('.profile__title');
  let personDescription = document.querySelector('.profile__subtitle');
  document.getElementById('name').value = personName.textContent;
  document.getElementById('job').value = personDescription.textContent;
  popup_element.classList.add('popup_opened');
}

function closePopup() {
  let popup_element = document.querySelector('.popup');
  popup_element.classList.remove('popup_opened');
}

document.querySelector('.popup__exit').addEventListener('click', closePopup);

let element_pen = document.querySelector('.profile__button-editor');
element_pen.addEventListener('click', openPopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = document.getElementById('name').value;
  document.querySelector('.profile__subtitle').textContent = document.getElementById('job').value;
  closePopup();
}
let formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', handleFormSubmit);
