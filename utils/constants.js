//массив для изначальных карточек

const acatenangoImage = new URL('../images/Acatenango.jpg', import.meta.url);
const fuegoImage = new URL('../images/Fuego.jpg', import.meta.url);
const playaImage = new URL('../images/MazuntePlaya.jpg', import.meta.url);
const puertoImage = new URL('../images/PuertoEscondido.jpg', import.meta.url);
const mazunteImage = new URL('../images/Mazunte.jpg', import.meta.url);
const piterImage = new URL('../images/Piter.jpg', import.meta.url);

export const initialCards = [
    {
        name: 'Акатенанго',
        link: acatenangoImage
    },
    {
        name: 'Фуэго',
        link: fuegoImage
    },
    {
        name: 'Пляж в Масунте',
        link: playaImage
    },
    {
        name: 'Пуэрто Эскондидо',
        link: puertoImage
    },
    {
        name: 'Масунте',
        link: mazunteImage
    },
    {
        name: 'Питер',
        link: piterImage
    }
];

// валидация формы

export const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    buttonInvalidSelector: 'form__save-button_invalid',
    inputInvalidSelector: 'form__input_state_invalid'
};