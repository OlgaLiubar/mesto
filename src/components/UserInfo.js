export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
        this._name = document.querySelector(userNameSelector);
        this._info = document.querySelector(userInfoSelector);
        this._avatar = document.querySelector(userAvatarSelector)
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
        this._info.textContent = data.about;
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar;
      }

}