import Popup from "./Popup";

class PopupImageView extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._imageContent = this._popupElement.querySelector('.popup__image');
    }

    setImage(url) {
        this._imageContent.setAttribute('src', url);
    }

    open(url) {
        this.setImage(url);
        super.open();
    }
}

export default PopupImageView;