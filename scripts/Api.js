class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = [...Object.entries(options.headers)];
    }

    /*
    Отлично, что Вы вынесли код рабора ответа сервера в отдельный метод
    */
    parseResponse(response) {
        return response.ok ? response.json() : Promise.reject(response.statusText);
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(res => this.parseResponse(res))
            .catch((error) => console.log(error));
    }

    editProfileInfo(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({name, about})
        })
            .then(res => this.parseResponse(res))
            .catch((error) => console.log(error));
    }

    editProfileAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({avatar})
        })
            .then(res => this.parseResponse(res))
            .catch((error) => console.log(error));
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(res => this.parseResponse(res))
            .catch((error) => console.log(error));
    }

    addCard(name, link) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({name, link})
        })
            .then(res => this.parseResponse(res));
    }

    deleteCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => this.parseResponse(res));
    }

    likeCard(id) {
        return fetch(`${this.baseUrl}/cards/like/${id}`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then(res => this.parseResponse(res));
    }

    unlikeCard(id) {
        return fetch(`${this.baseUrl}/cards/like/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => this.parseResponse(res));
    }
}