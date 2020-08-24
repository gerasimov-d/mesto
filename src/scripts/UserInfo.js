'use strict';
class UserInfo {
    constructor(element) {
        this._nameElement = element.querySelector('.user-info__name');
        this._aboutElement = element.querySelector('.user-info__job');
        this._avatarElement = element.querySelector('.user-info__photo')
    }

    get name() {
        return this._name;
    }

    get about() {
        return this._about;
    }

    get id() {
        return this._id;
    }

    get avatarLink() {
        return this._avatarLink;
    }

    setUserInfo(name, about, id) {
        this._name = name;
        this._about = about;
        this._id = id;
    }

    setUserAvatar(link) {
        this._avatarLink = link;
    }

    updateUserInfo() {
        this._nameElement.textContent = this._name;
        this._aboutElement.textContent = this._about;
    }

    updateUserAvatar() {
        this._avatarElement.style.backgroundImage = `url(${this._avatarLink})`;
    }
}