'use strict';
class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._closeButton = popupElement.querySelector('.popup__close');
        this._closePopupHandler = this.close.bind(this);
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', this._closePopupHandler);
    }

    open() {
        this._popupElement.classList.add('popup_is-opened');
    }

    close() {
        this._popupElement.classList.remove('popup_is-opened');
    }
}
