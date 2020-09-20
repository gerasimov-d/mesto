import PopupForm from "./PopupForm";

class PopupEditProfile extends PopupForm {
    constructor(popupElement, openButton, formValidator, editProfileCallBack, getCurrentProfileData) {
        super(popupElement, openButton, formValidator);
        this._editProfileCallBack = editProfileCallBack;
        this._getCurrentProfileData = getCurrentProfileData;

        this._openClickHandler = this.open.bind(this);
        this._submitHandler = this.submitHandler.bind(this);
    }

    async open() {
        const {name, job} = await this._getCurrentProfileData();

        this._formElement.elements.name.value = name;
        this._formElement.elements.job.value = job;

        this._formValidator.resetErrorForm();
        this._formValidator.updateSubmitButtonState();

        super.open();
    }

    submitHandler(event) {
        event.preventDefault();
        const name = this._formElement.elements.name.value;
        const job = this._formElement.elements.job.value;

        this._editProfileCallBack(name, job)
            .then(() => super.close())
            .catch((err) => {
                alert("Ошибка при выполнение запроса на сервер");
                console.log(err);
            });
    }
}

export default PopupEditProfile;