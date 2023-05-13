export class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector         = validationConfig.formSelector;
    this._inputSelector        = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass  = validationConfig.inactiveButtonClass;
    this._inputErrorClass      = validationConfig.inputErrorClass;
    this._errorClass           = validationConfig.errorClass;
    this._formElement = formElement;
  }

  // Передадим текст ошибки вторым параметром
  _showInputError = (someInput, errorMessage) => {
    someInput.classList.add(this._inputErrorClass);
    const someError = document.querySelector(`.${someInput.id}-error`);
    // Заменим содержимое span с ошибкой на переданный параметр
    someError.textContent = errorMessage;
    someError.classList.add(this._errorClass);
  }

  _hideInputError = (someInput) => {
    someInput.classList.remove(this._inputErrorClass);
    const someError = document.querySelector(`.${someInput.id}-error`);
    someError.classList.remove(this._errorClass);
    // Очистим ошибку
    someError.textContent = '';
  }

  _isValid = (someInput) => { /*вызываем фнукцию, которая получает в качестве параметра поле ввода */

    if (!someInput.validity.valid) { /*проверка, если у объекта validity значение false то вызовем функцию  showInputError*/
      // Передадим сообщение об ошибке вторым аргументом
      this._showInputError(someInput, someInput.validationMessage);
    } else {                                                          // иначе hideInputError
      this._hideInputError(someInput);
    }
  }

  _hasInvalidInput = (allInputs) => {
    return allInputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleSubmitButton = (allInputs, submitButton) => {
    if (this._hasInvalidInput(allInputs)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.setAttribute('disabled', true);
    }
    else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.removeAttribute('disabled');
    }
  }


  _addEventListeners = (someForm) => { /*вызываем фнукцию, которая получает в качестве параметра форму */
    const allInputs = Array.from(someForm.querySelectorAll(this._inputSelector)); /*создали переменную, которая получает массив из всех полей ввода */

    const submit = someForm.querySelector(this._submitButtonSelector);
    this._toggleSubmitButton(allInputs, submit);
    allInputs.forEach(element => { /*обходим все поля ввода */
      element.addEventListener('input', () => {  /*на каждое поле ставим слушатель по вводлу клавиатуры */
      this._isValid(element); /*вызвали функцию, передали поле ввода */

        this._toggleSubmitButton(allInputs, submit);

      })
    });
    someForm.addEventListener('submit', () => {
      this._toggleSubmitButton(allInputs, submit);
    })
  }

  enableValidation = () => { /* создали функцию  */
    this._addEventListeners(this._formElement); /*вызываем фнукцию, которой передаем каждый элемент массива состоящий из форм  */
  }

}


