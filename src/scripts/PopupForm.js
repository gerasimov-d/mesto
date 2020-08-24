'use strict';
class PopupForm extends Popup {
    constructor(popupElement, openButton, formValidator) {
        super(popupElement);
        this._openButton = openButton;
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._formValidator = formValidator;
    }

    setEventListeners() {
        this._openButton.addEventListener('click', this._openClickHandler);
        this._formElement.addEventListener('submit', this._submitHandler);
        super.setEventListeners();
    }
}
