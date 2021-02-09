// import {
//     initialCards
// } from '../utils/constants.js';

export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._initialArray = data;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    //публичный метод, который отвечает за отрисовку всех элементов. 
    //Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
    renderItems() {
        this._initialArray.forEach((item) => {
            this._renderer(item);
        });
    }

    // принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.append(element);
    }
}