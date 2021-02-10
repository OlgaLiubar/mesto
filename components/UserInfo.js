export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._userNameSelector = userNameSelector;
        this._userInfoSelector = userInfoSelector;

        this._name = document.querySelector(this._userNameSelector);
        this._info = document.querySelector(this._userInfoSelector);
    }

    getUserInfo() {
        const data = {
            name: this._name.textContent,
            occupation: this._info.textContent
        };
        return data;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._info.textContent = data.occupation;
    }
}