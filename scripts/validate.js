const formElement2 = document.querySelector('.form');



// Передадим текст ошибки вторым параметром
const showInputError = (someInput, errorMessage) => {
  someInput.classList.add('form__input_error');
  const someError = document.querySelector(`.${someInput.id}-error`);
  // Заменим содержимое span с ошибкой на переданный параметр
  someError.textContent = errorMessage;
  someError.classList.add('form__input-error_active');
};

const hideInputError = (someInput) => {
  someInput.classList.remove('form__input_error');
  const someError = document.querySelector(`.${someInput.id}-error`);
  someError.classList.remove('form__input-error_active');
  // Очистим ошибку
  someError.textContent = '';
};

const isValid = (someInput) => { /*вызываем фнукцию, которая получает в качестве параметра поле ввода */

  if (!someInput.validity.valid) { /*проверка, если у объекта validity значение false то вызовем функцию  showInputError*/
                                                                    // Передадим сообщение об ошибке вторым аргументом
    showInputError(someInput, someInput.validationMessage);
  } else {                                                          // иначе hideInputError
    hideInputError(someInput);
  }
}

const addEventListeners = (someForm) => { /*вызываем фнукцию, которая получает в качестве параметра форму */
  const allInputs = Array.from(someForm.querySelectorAll('.form__input')); /*создали переменную, которая получает массив из всех полей ввода */
  const submit = someForm.querySelector('.form__sumbit');
  toggleSubmitButton(allInputs, submit);
  allInputs.forEach(element => { /*обходим все поля ввода */
    element.addEventListener('input', () => {  /*на каждое поле ставим слушатель по вводлу клавиатуры */
      isValid(element); /*вызвали функцию, передали поле ввода */

      toggleSubmitButton(allInputs, submit);
    })
  });
}

const getAllForms = () => { /* создали функцию  */
  const allForms = Array.from(document.querySelectorAll('.form')); /* создали переменную. внутри переменной разместили массив состоящий из фвсех форм на сайте  */
  allForms.forEach(form => { /* обходим все формы  */
    addEventListeners(form); /*вызываем фнукцию, которой передаем каждый элемент массива состоящий из форм  */
  });
}

const hasInvalidInput = (allInputs) => {
  return allInputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleSubmitButton = (allInputs, submitButton) => {
  if (hasInvalidInput(allInputs)) {
    submitButton.classList.add('form__sumbit_inactive');
    submitButton.setAttribute('disabled', true);
  }
  else {
    submitButton.classList.remove('form__sumbit_inactive');
    submitButton.removeAttribute('disabled');
  }
}

getAllForms();

