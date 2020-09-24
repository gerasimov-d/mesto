import PopupForm from "./PopupForm";

class PopupEditAvatar extends PopupForm {
    constructor(popupElement, openButton, form, editAvatarCallBack) {
        super(popupElement, openButton, form);

        this._editAvatarCallBack = editAvatarCallBack;
        this._openClickHandler = this.open.bind(this);
        this._submitHandler = this.submitHandler.bind(this);
    }

    open() {
        this._formValidator.resetErrorForm();
        this._formValidator.updateSubmitButtonState();

        super.open();
    }

    submitHandler(event) {
        event.preventDefault();

        const link = this._formElement.link.value;
        this._editAvatarCallBack(link)
            .then(() => super.close())
            .catch((err) => {
                alert("Ошибка при выполнение запроса на сервер");
                console.log(err);
            });

    }
}

export default PopupEditAvatar;