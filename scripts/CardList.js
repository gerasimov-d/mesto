'use strict';
class CardList {
    constructor(cardContainer) {
        this._cardContainer = cardContainer;
    }

    addCard(cardElement) {
        this._cardContainer.appendChild(cardElement);
    }

    render(cards) {
        cards.forEach(item => this.addCard(item));
    }
}
