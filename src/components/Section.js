
export default class Section {
    constructor({ renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    //публичный метод, который отвечает за отрисовку всех элементов. 
    //Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
    renderItems(cardsData) {
        cardsData.forEach((item) => {
            this._renderer(item);
        });
    }

    // принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.append(element);
    }

    prependItem(element) {
        this._container.prepend(element);
    }
}