class Card {
    constructor(name,
                link,
                id,
                owner,
                likes,
                viewCardCallback,
                removeCardCallback,
                likeCardCallback,
                currentUserIdCallback) {
        this.name = name;
        this.link = link;
        this.id = id;
        this.owner = owner;
        this.likes = likes;

        this._viewCardCallback = viewCardCallback;
        this._removeCardCallback = removeCardCallback;
        this._likeCardCallback = likeCardCallback;
        this._currentUserIdCallback = currentUserIdCallback;

        this._viewCardClickHandler = this.view.bind(this);
        this._removeCardClickHandler = this.remove.bind(this);
        this._likeCardClickHandler = this.like.bind(this);
    }

    get likeCounter() {
        return this.likes.length;
    }

    like(event) {
        const likeState = event.target.classList.contains('place-card__like-icon_liked');
        this._likeCardCallback(this.id, !likeState)
            .then(res => {
                this.likes = res.likes;
                this.updateCard();
            }).catch(err => console.log(err));
    }

    remove(event) {
        event.stopPropagation();
        const result = confirm("Вы действительно хотите удалить эту карточку?");
        if (result)
        {
            this._removeCardCallback(this.id).then(() => {
                const card = event.target.closest('.place-card');
                card.remove();
            }).catch(error => console.log(error));
        }
    }

    view(event) {
        event.stopPropagation();
        const url = event.target.style.backgroundImage.slice(5, -2);
        this._viewCardCallback(url);
    }

    setEventListeners() {
        this.cardElement
            .querySelector('.place-card__like-icon')
            .addEventListener('click', this._likeCardClickHandler);

        this.cardElement
            .querySelector('.place-card__delete-icon')
            .addEventListener('click', this._removeCardClickHandler);

        this.cardElement
            .querySelector('.place-card__image')
            .addEventListener('click', this._viewCardClickHandler);
    }

    initCardElement() {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('place-card');

        const cardImage = document.createElement('div');
        cardImage.classList.add('place-card__image');
        cardImage.setAttribute('style', `background-image: url(${this.link})`);

        const cardDeleteButton = document.createElement('button');
        cardDeleteButton.classList.add('place-card__delete-icon');
        this._cardDeleteButtonElement = cardDeleteButton;
        cardImage.appendChild(cardDeleteButton);

        const cardDescriptionContainer = document.createElement('div');
        cardDescriptionContainer.classList.add('place-card__description');

        const cardName = document.createElement('h3');
        cardName.classList.add('place-card__name');
        cardName.textContent = this.name;

        const likeContainer = document.createElement('div');
        likeContainer.classList.add('place-card__like-container');

        const cardLikeButton = document.createElement('button');
        cardLikeButton.classList.add('place-card__like-icon');
        this._cardLikeButtonElement = cardLikeButton;

        const cardLikeCounter = document.createElement('span');
        cardLikeCounter.classList.add('place-card__like-counter');

        this._cardLikeCounterElement = cardLikeCounter;
        likeContainer.appendChild(cardLikeButton);
        likeContainer.appendChild(cardLikeCounter);

        cardDescriptionContainer.appendChild(cardName);
        cardDescriptionContainer.appendChild(likeContainer);

        cardContainer.appendChild(cardImage);
        cardContainer.appendChild(cardDescriptionContainer);

        return cardContainer;
    }

    checkLike() {
        return this.likes.find(item => item._id === this._currentUserIdCallback());
    }

    checkPermissionRemoveCallback() {
        return this._currentUserIdCallback() !== this.owner._id;
    }

    updateCard() {
        if (this.checkLike())
            this._cardLikeButtonElement.classList.add('place-card__like-icon_liked');
        else
            this._cardLikeButtonElement.classList.remove('place-card__like-icon_liked');

        if (this.checkPermissionRemoveCallback())
            this._cardDeleteButtonElement.classList.add('place-card__delete-icon_disable');
        else
            this._cardDeleteButtonElement.classList.remove('place-card__delete-icon_disable');

        this._cardLikeCounterElement.textContent = this.likeCounter;
    }

    createCardElement() {
        this.cardElement = this.initCardElement();
        this.setEventListeners();
        this.updateCard();

        return this.cardElement;
    }
}

export default Card;
