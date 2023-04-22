
// Передадим текст ошибки вторым параметром
const showInputError = (someInput, errorMessage, config) => {
  someInput.classList.add(config.inputErrorClass);
  const someError = document.querySelector(`.${someInput.id}-error`);
  // Заменим содержимое span с ошибкой на переданный параметр
  someError.textContent = errorMessage;
  someError.classList.add(config.errorClass);
};

const hideInputError = (someInput, config) => {
  someInput.classList.remove(config.inputErrorClass);
  const someError = document.querySelector(`.${someInput.id}-error`);
  someError.classList.remove(config.errorClass);
  // Очистим ошибку
  someError.textContent = '';
};

const isValid = (someInput, config) => { /*вызываем фнукцию, которая получает в качестве параметра поле ввода */

  if (!someInput.validity.valid) { /*проверка, если у объекта validity значение false то вызовем функцию  showInputError*/
                                                                    // Передадим сообщение об ошибке вторым аргументом
    showInputError(someInput, someInput.validationMessage, config);
  } else {                                                          // иначе hideInputError
    hideInputError(someInput, config);
  }
}

const addEventListeners = (someForm, config) => { /*вызываем фнукцию, которая получает в качестве параметра форму */
  const allInputs = Array.from(someForm.querySelectorAll(config.inputSelector)); /*создали переменную, которая получает массив из всех полей ввода */

  const submit = someForm.querySelector(config.submitButtonSelector);
  toggleSubmitButton(allInputs, submit, config);
  allInputs.forEach(element => { /*обходим все поля ввода */
    element.addEventListener('input', () => {  /*на каждое поле ставим слушатель по вводлу клавиатуры */
      isValid(element, config); /*вызвали функцию, передали поле ввода */

      toggleSubmitButton(allInputs, submit, config);

    })
  });
}

const enableValidation = (config) => { /* создали функцию  */

  const allForms = Array.from(document.querySelectorAll(config.formSelector)); /* создали переменную. внутри переменной разместили массив состоящий из фвсех форм на сайте  */
    allForms.forEach(form => { /* обходим все формы  */
    addEventListeners(form, config); /*вызываем фнукцию, которой передаем каждый элемент массива состоящий из форм  */
  });
}

const hasInvalidInput = (allInputs) => {
  return allInputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleSubmitButton = (allInputs, submitButton, config) => {
  if (hasInvalidInput(allInputs)) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  }
  else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}


enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__sumbit',
  inactiveButtonClass: 'form__sumbit_inactive',
  inputErrorClass: 'form__input_error_border',
  errorClass: 'form__input_error_active'
});
