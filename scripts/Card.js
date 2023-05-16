import { popupImage, popupImgLink, popupCaption, addPopupOpened } from "./index.js";
export class Card {
  constructor(link, name, template) {
    this._cardElement = document.querySelector(template).content.querySelector('.elements__card').cloneNode(true);
    this._link = link;
    this._name = name;
    this._addEventListeners();
  }

  _activateLike() {
    this._cardElement.querySelector('.elements__button').classList.toggle('elements__button_active');
  }

  _deleteCard() {
    this._cardElement
      .remove();
  }

  _openImage() {
    popupImgLink.setAttribute('src', this._link);
    popupImgLink.setAttribute('alt', this._name);
    popupCaption.textContent = this._name;
    addPopupOpened(popupImage);
  }

  _addEventListeners() {
    this._cardElement.querySelector('.elements__delete').addEventListener('click', this._deleteCard.bind(this));
    this._cardElement.querySelector('.elements__button').addEventListener('click', this._activateLike.bind(this));
    this._cardElement.querySelector('.elements__card-image').addEventListener('click', this._openImage.bind(this));

  }

  createCard() {
    const cardElementImage = this._cardElement.querySelector('.elements__card-image');
    cardElementImage.setAttribute('src', this._link);
    cardElementImage.setAttribute('alt', this._name);
    this._cardElement.querySelector('.elements__card-title').textContent = this._name;
    return this._cardElement;
  }
}



