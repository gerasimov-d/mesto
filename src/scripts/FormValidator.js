class FormValidator {
    constructor(formElement) {
        this.formElement = formElement;

        this.inputs = [...this.formElement.querySelectorAll('.popup__input')];
        this.errors = [...this.formElement.querySelectorAll('.popup__input-error')];
        this.submit = this.formElement.querySelector('.popup__button');

        this.inputHandler = this.inputHandler.bind(this);
    }

    setEventListeners() {
        this.formElement.addEventListener('input', this.inputHandler);
    }

    checkInputValidity(input, error) {
        if ((input.validity.tooLong || input.validity.tooShort)) {
            error.textContent = 'Должно быть от 2 до 30 символов';
        } else if (input.type === 'url' && input.validity.typeMismatch) {
            error.textContent = 'Здесь должна быть ссылка';
        } else if (input.validity.valueMissing) {
            error.textContent = 'Это обязательное поле';
        } else {
            error.textContent = '';
        }
    }

    setSubmitButtonState(state) {
        if (state) {
            this.submit.removeAttribute('disabled');
            this.submit.classList.remove('popup__button_disabled');
        } else {
            this.submit.setAttribute('disabled', '');
            this.submit.classList.add('popup__button_disabled');
        }
    }

    updateSubmitButtonState() {
        const isValidForm = this.inputs.every((input) => input.validity.valid);
        this.setSubmitButtonState(isValidForm);
    }

    updateInputErrorsState() {
        this.inputs.forEach((item) => this.checkInputValidity(item, item.nextElementSibling));
    }

    inputHandler() {
        this.updateInputErrorsState();
        this.updateSubmitButtonState();
    }

    resetErrorForm() {
        this.errors.forEach(item => item.textContent = '');
    }

    resetForm() {
        this.formElement.reset();
    }
}

export default FormValidator;
