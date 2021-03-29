(()=>{"use strict";var e={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__save-button",buttonInvalidSelector:"form__save-button_invalid",inputInvalidSelector:"form__input_state_invalid"},t=document.querySelector(".profile__edit-button"),n=document.querySelector(".profile__add-button"),r=document.querySelector(".profile__edit-userpick-button"),o=document.querySelector(".form_type_edit"),i=document.querySelector(".form__input_type_name"),c=document.querySelector(".form__input_type_occupation"),u=document.querySelector(".form_type_add");function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t,n,r,o){var i=o.handleCardClick,c=o.setLike,u=o.deleteLike,a=o.handleDeleteCardClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._data=t,this._name=t.name,this._link=t.link,this._cardSelector=n,this._handleCardClick=i,this._cardTemplate=document.querySelector(n).content.querySelector(".card"),this._ownerId=r,this._setLike=c,this._deleteLike=u,this._handleDeleteCardClick=a}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return this._cardTemplate.cloneNode(!0)}},{key:"_checkIsMyCard",value:function(){this._data.owner._id!==this._ownerId&&(this._element.querySelector(".card__delete-button").style.display="none")}},{key:"generateCard",value:function(){this._element=this._getTemplate();var e=this._element.querySelector(".card__photo");return this._cardImage=e,this._cardImage.src=this._link,this._cardImage.alt=this._name,this._element.querySelector(".card__caption-title").textContent=this._name,this._checkIsMyCard(),this._element.setAttribute("id","".concat(this._data._id)),this.setLikeCount(this._data.likes.length),this._checkIsLiked(),this._setEventListeners(),this._likeButton=this._element.querySelector(".card__like-btn"),this._element}},{key:"_checkIsLiked",value:function(){var e=this;this._data.likes.forEach((function(t){t._id===e._ownerId&&e._element.querySelector(".card__like-btn").classList.add("card__like-btn_active")}))}},{key:"_like",value:function(e){this._likeButton.classList.add("card__like-btn_active"),this._setLike(e)}},{key:"_dislike",value:function(e){this._likeButton.classList.remove("card__like-btn_active"),this._deleteLike(e)}},{key:"setLikeCount",value:function(e){this._element.querySelector(".card__likes-count").textContent=e}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".card__delete-button").addEventListener("click",(function(){e._handleDeleteCardClick(e._data)})),this._cardImage.addEventListener("click",(function(){e._handleCardClick(e._data)})),this._element.querySelector(".card__like-btn").addEventListener("click",(function(){e._likeButton.classList.contains("card__like-btn_active")?e._dislike(e._data):e._like(e._data)}))}}])&&a(t.prototype,n),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var f=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._config=t,this._formElement=n,this._inputList=Array.from(n.querySelectorAll(t.inputSelector)),this._buttonElement=n.querySelector(t.submitButtonSelector)}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}},{key:"resetValidation",value:function(){var e=this;this._inputList.forEach((function(t){e._hideError(t)})),this._setButtonState()}},{key:"_setEventListeners",value:function(){var e=this;this._inputList.forEach((function(t){t.addEventListener("input",(function(n){e._checkInputValidity(t),e._setButtonState()}))}))}},{key:"_setButtonState",value:function(){this._formElement.checkValidity()?(this._buttonElement.classList.remove(this._config.buttonInvalidSelector),this._buttonElement.disabled=!1):(this._buttonElement.classList.add(this._config.buttonInvalidSelector),this._buttonElement.disabled=!0)}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideError(e):this._showError(e)}},{key:"_showError",value:function(e){this._formElement.querySelector("#".concat(e.id,"-error")).textContent=e.validationMessage,e.classList.add(this._config.inputInvalidSelector)}},{key:"_hideError",value:function(e){this._formElement.querySelector("#".concat(e.id,"-error")).textContent="",e.classList.remove(this._config.inputInvalidSelector)}}])&&s(t.prototype,n),e}();function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var h=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._container=document.querySelector(n),this._renderer=r}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(e){this._container.append(e)}},{key:"prependItem",value:function(e){this._container.prepend(e)}}])&&p(t.prototype,n),e}();function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var _=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupSelector=t,this._popupElement=document.querySelector(this._popupSelector),this._popupCloseButton=this._popupElement.querySelector(".popup__close-button"),this._handleEscPress=this._handleEscPress.bind(this)}var t,n;return t=e,(n=[{key:"openPopup",value:function(){this._popupElement.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscPress)}},{key:"closePopup",value:function(){this._popupElement.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscPress)}},{key:"_handleEscPress",value:function(e){"Escape"===e.key&&this.closePopup()}},{key:"_handleOverlayClick",value:function(e){e.target.classList.contains("popup_opened")&&this.closePopup()}},{key:"setEventListeners",value:function(){var e=this;this._popupCloseButton.addEventListener("click",(function(){return e.closePopup()})),this._popupElement.addEventListener("click",this._handleOverlayClick.bind(this))}}])&&d(t.prototype,n),e}();function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t,n){return(v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function k(e,t){return!t||"object"!==y(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(r);if(o){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return k(this,e)});function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,e))._popupPhotoElement=t._popupElement.querySelector(".popup__card-image"),t._popupCaptionElement=t._popupElement.querySelector(".popup__caption"),t}return t=c,(n=[{key:"openPopup",value:function(e,t){v(S(c.prototype),"openPopup",this).call(this),this._popupPhotoElement.src=t,this._popupCaptionElement.textContent=e}}])&&m(t.prototype,n),c}(_);function E(e){return(E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function L(e,t,n){return(L="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=I(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function P(e,t){return(P=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function C(e,t){return!t||"object"!==E(t)&&"function"!=typeof t?O(e):t}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&P(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=I(r);if(o){var n=I(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return C(this,e)});function c(e){var t,n=e.popupSelector,r=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,n))._handleFormSubmit=r,t._form=t._popupElement.querySelector(".form"),t._inputList=Array.from(t._form.querySelectorAll(".form__input")),t._handleSubmitEvt=t._handleSubmitEvt.bind(O(t)),t._submitButton=t._form.querySelector(".form__save-button"),t._SubmitButtonInitialText=t._submitButton.textContent,t}return t=c,(n=[{key:"_handleSubmitEvt",value:function(e){e.preventDefault(),this._handleFormSubmit(this._getInputValues())}},{key:"_getInputValues",value:function(){var e=this;return this._inputValues={},this._inputList.forEach((function(t){e._inputValues[t.name]=t.value})),this._inputValues}},{key:"setEventListeners",value:function(){L(I(c.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._handleSubmitEvt)}},{key:"renderLoading",value:function(e){this._submitButton.textContent=e?"Cохранение...":this._SubmitButtonInitialText}},{key:"closePopup",value:function(){this._form.reset(),L(I(c.prototype),"closePopup",this).call(this)}}])&&w(t.prototype,n),c}(_);function R(e){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function T(e,t,n){return(T="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=B(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function A(e,t){return(A=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function D(e,t){return!t||"object"!==R(t)&&"function"!=typeof t?x(e):t}function x(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function B(e){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var U=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&A(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=B(r);if(o){var n=B(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return D(this,e)});function c(e){var t,n=e.popupSelector,r=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,n))._handleFormSubmit=r,t._form=t._popupElement.querySelector(".form"),t._inputList=Array.from(t._form.querySelectorAll(".form__input")),t._handleSubmitEvt=t._handleSubmitEvt.bind(x(t)),t}return t=c,(n=[{key:"_handleSubmitEvt",value:function(e){e.preventDefault(),this._handleFormSubmit(this._data)}},{key:"setEventListeners",value:function(){T(B(c.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._handleSubmitEvt)}},{key:"openPopup",value:function(e){this._data=e,T(B(c.prototype),"openPopup",this).call(this)}}])&&q(t.prototype,n),c}(_);function V(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var F=function(){function e(t){var n=t.userNameSelector,r=t.userInfoSelector,o=t.userAvatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._info=document.querySelector(r),this._avatar=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,occupation:this._info.textContent}}},{key:"setUserInfo",value:function(e){this._name.textContent=e.name,this._info.textContent=e.about}},{key:"setUserAvatar",value:function(e){this._avatar.src=e.avatar}}])&&V(t.prototype,n),e}();function N(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var M=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=t.url,this._headers=t.headers}var t,n;return t=e,(n=[{key:"_checkResult",value:function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))}},{key:"getInitialData",value:function(){return Promise.all([this.getUserData(),this.getInitialCards()])}},{key:"getInitialCards",value:function(){return fetch("".concat(this._url,"cards/"),{method:"GET",headers:this._headers}).then(this._checkResult).catch((function(e){return console.log(e)}))}},{key:"getUserData",value:function(){return fetch("".concat(this._url,"users/me"),{method:"GET",headers:this._headers}).then(this._checkResult).catch((function(e){return console.log(e)}))}},{key:"uploadCard",value:function(e){return fetch("".concat(this._url,"cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e.place,link:e.url})}).then(this._checkResult).catch((function(e){return console.log(e)}))}},{key:"deleteCard",value:function(e){return fetch("".concat(this._url,"cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResult).catch((function(e){return console.log(e)}))}},{key:"uploadUserInfo",value:function(e){return fetch("".concat(this._url,"users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.occupation})}).then(this._checkResult).catch((function(e){return console.log(e)}))}},{key:"setUserAvatar",value:function(e){return fetch("".concat(this._url,"users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.url})}).then(this._checkResult).catch((function(e){return console.log(e)}))}},{key:"setLike",value:function(e){return fetch("".concat(this._url,"cards/likes/").concat(e._id),{method:"PUT",headers:this._headers}).then(this._checkResult).catch((function(e){return console.log(e)}))}},{key:"deleteLike",value:function(e){return fetch("".concat(this._url,"cards/likes/").concat(e._id),{method:"DELETE",headers:this._headers}).then(this._checkResult).catch((function(e){return console.log(e)}))}}])&&N(t.prototype,n),e}();function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var G=new f(e,o);G.enableValidation();var H,z=new f(e,u);z.enableValidation();var $=new M({url:"https://mesto.nomoreparties.co/v1/cohort-20/",headers:{"content-type":"application/json",authorization:"5a191bce-603b-4e04-819b-a182504a8e8f"}}),K=new F({userNameSelector:".profile__title",userInfoSelector:".profile__occupation",userAvatarSelector:".profile__image"}),Q=new h({renderer:function(e){var t=X(e);Q.addItem(t)}},".gallery__elements");$.getInitialData().then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,i=void 0;try{for(var c,u=e[Symbol.iterator]();!(r=(c=u.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}}(t,n)||function(e,t){if(e){if("string"==typeof e)return J(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?J(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];H=o._id,K.setUserInfo(o),K.setUserAvatar(o),Q.renderItems(i)})).catch((function(e){console.log(e)}));var W=new g(".popup_type_view-image");function X(e){var t=new l(e,".gallery-template",H,{handleCardClick:function(e){W.openPopup(e.name,e.link)},setLike:function(e){$.setLike(e).then((function(e){t.setLikeCount(e.likes.length)})).catch((function(e){console.log(e)}))},deleteLike:function(e){$.deleteLike(e).then((function(e){t.setLikeCount(e.likes.length)})).catch((function(e){console.log(e)}))},handleDeleteCardClick:function(e){ee.openPopup(e._id)}});return t.generateCard()}W.setEventListeners();var Y=new j({popupSelector:".popup_type_add-image",handleFormSubmit:function(e){Y.renderLoading(!0),$.uploadCard(e).then((function(e){var t=X(e);Q.prependItem(t)})).catch((function(e){console.log(e)})).finally((function(){Y.renderLoading(!1),Y.closePopup()}))}});Y.setEventListeners();var Z=new j({popupSelector:".popup_type_edit-profile",handleFormSubmit:function(e){Y.renderLoading(!0),$.uploadUserInfo(e).then((function(e){K.setUserInfo(e)})).finally((function(){Y.renderLoading(!1),Z.closePopup()}))}});Z.setEventListeners();var ee=new U({popupSelector:".popup_type_confirm-delete",handleFormSubmit:function(e){$.deleteCard(e).then((function(){document.getElementById("".concat(e)).remove(),ee.closePopup()})).catch((function(e){console.log(e)}))}});ee.setEventListeners();var te=new j({popupSelector:".popup_type_edit-userpick",handleFormSubmit:function(e){te.renderLoading(!0),$.setUserAvatar(e).then((function(e){K.setUserAvatar(e)})).catch((function(e){console.log(e)})).finally((function(){te.renderLoading(!1),te.closePopup()}))}});te.setEventListeners(),r.addEventListener("click",(function(e){te.openPopup()})),t.addEventListener("click",(function(e){var t=K.getUserInfo();i.value=t.name,c.value=t.occupation,G.resetValidation(),Z.openPopup()})),n.addEventListener("click",(function(e){z.resetValidation(),Y.openPopup()}))})();