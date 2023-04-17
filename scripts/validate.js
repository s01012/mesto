const formElement2 = document.querySelector('.form');
const formInput = formElement2.querySelector('.form__input');
const formError = formElement2.querySelector(`.${formInput.id}-error`);


formInput.addEventListener('input', function (evt) {
    console.log(formInput.validity);
    if (!formInput.validity.valid) {
      // Передадим сообщение об ошибке вторым аргументом
      showInputError(formInput, formInput.validationMessage);
    } else {
      hideInputError(formInput);
    }
  }
);


// Передадим текст ошибки вторым параметром
const showInputError = (element, errorMessage) => {
  element.classList.add('form__input_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage;
  formError.classList.add('form__input-error_active');
};

const hideInputError = (element) => {
  element.classList.remove('form__input_error');
  formError.classList.remove('form__input-error_active');
  // Очистим ошибку
  formError.textContent = '';
};



