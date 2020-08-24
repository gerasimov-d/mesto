'use strict';
(function () {
    const cardsContainer = document.querySelector('.places-list');
    const userInfoElement = document.querySelector('.user-info');

    const popupEditProfileElement = document.querySelector('.popup_type_edit');
    const popupAddCardElement = document.querySelector('.popup_type_add');
    const popupImageElement = document.querySelector('.popup_type_image');
    const popupAvatarElement = document.querySelector('.popup_type_avatar');

    const openEditProfileButton = document.querySelector('.user-info__edit-button');
    const openAddCardButton = document.querySelector('.user-info__add-button');
    const openEditAvatarButton = document.querySelector('.user-info__photo');

    const popupImageView = new PopupImageView(popupImageElement);

    const cardList = new CardList(cardsContainer);
    const userInfo = new UserInfo(userInfoElement);

    const api = new Api({
        baseUrl: 'https://nomoreparties.co/cohort12',
        headers: {
            'Authorization': 'af6e789d-d03b-483c-bc22-6cb7c4fdbe44',
            'Content-Type': 'application/json'
        }
    });

    function getFormValidatorByElement(element) {
        const formValidator = new FormValidator(element.querySelector('.popup__form'));
        formValidator.setEventListeners();
        return formValidator;
    }

    function editProfileCallBack(name, job) {
        return api.editProfileInfo(name, job).then(res => {
            userInfo.setUserInfo(res.name, res.about);
            userInfo.updateUserInfo();
        });
    }

    function editAvatarCallBack(link) {
        return api.editProfileAvatar(link).then(res => {
            userInfo.setUserAvatar(res.avatar);
            userInfo.updateUserAvatar();
        });
    }

    function getCurrentProfileAvatar() {
        return userInfo.avatarLink;
    }

    function getCurrentProfileData() {
        return {
            name: userInfo.name,
            job: userInfo.about
        }
    }

    const popupEditProfile = new PopupEditProfile(popupEditProfileElement,
        openEditProfileButton,
        getFormValidatorByElement(popupEditProfileElement),
        editProfileCallBack,
        getCurrentProfileData);

    const popupEditAvatar = new PopupEditAvatar(popupAvatarElement,
        openEditAvatarButton,
        getFormValidatorByElement(popupAvatarElement),
        editAvatarCallBack,
        getCurrentProfileAvatar)

    function viewImageCallback(url) {
        popupImageView.open(url);
    }

    function removeCardCallback(id) {
        return api.deleteCard(id);
    }

    function likeCardCallback(id, value) {
        return value ? api.likeCard(id) : api.unlikeCard(id);
    }

    function currentUserIdCallback() {
        return userInfo.id;
    }

    function createCard(cardDto) {
        return new Card(
            cardDto.name,
            cardDto.link,
            cardDto._id,
            cardDto.owner,
            cardDto.likes,
            viewImageCallback,
            removeCardCallback,
            likeCardCallback,
            currentUserIdCallback
        )
    }

    function addCardCallBack(name, link) {
        return api.addCard(name, link).then(res => {
            const card = createCard(res);
            cardList.addCard(card.createCardElement());
        });
    }

    const popupAddCard = new PopupAddCard(popupAddCardElement,
        openAddCardButton,
        getFormValidatorByElement(popupAddCardElement),
        addCardCallBack);

    popupImageView.setEventListeners();
    popupEditProfile.setEventListeners();
    popupAddCard.setEventListeners();
    popupEditAvatar.setEventListeners();

    api.getUserInfo().then(res => {
        userInfo.setUserInfo(res.name, res.about, res._id);
        userInfo.setUserAvatar(res.avatar);

        userInfo.updateUserInfo();
        userInfo.updateUserAvatar();
    }).catch((err) => console.log(err));

    api.getInitialCards().then(res => {
        const cards = res.map((item) => createCard(item).createCardElement());
        cardList.render(cards);
    }).catch((err) => console.log(err));
})();