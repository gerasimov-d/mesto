'use strict';
class PopupAddCard extends PopupForm {
    constructor(popupElement, openButton, form, addCardCallBack) {
        super(popupElement, openButton, form);
        this._addCardCallBack = addCardCallBack;

        this._openClickHandler = this.open.bind(this);
        this._submitHandler = this.submitHandler.bind(this);
    }

    open() {
        this._formValidator.resetForm();
        this._formValidator.resetErrorForm();
        this._formValidator.updateSubmitButtonState();
        super.open();
    }

    submitHandler(event) {
        event.preventDefault();

        const name = this._formElement.name.value;
        const link = this._formElement.link.value;

        this._addCardCallBack(name, link)
            .then(() => super.close())
            .catch((err) => {
                alert("Ошибка при выполнение запроса на сервер");
                console.log(err);
            });
    }
}
