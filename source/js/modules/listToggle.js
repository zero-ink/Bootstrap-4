export default class {
    constructor(options) {
        this._class = options.class;
        this._wrapper = options.wrapper;
        this._arrow = (typeof options.arrow !== 'undefined') ? options.arrow : '.arrow';
        this._list = (typeof options.list !== 'undefined') ? options.list : '.list';
        this._speed = (isNaN(options.speed) === false) ? options.speed : 400;
    }

    toggleOnClick() {
        let className = this._class;
        let wrapperName = this._wrapper;
        let speed = this._speed;
        let list = this._list;
        let arrow = this._arrow;

        $(`${wrapperName} ${className}`).click(function () {
            if ($(this).find(`${arrow}.down`).length === 0) {
                $(wrapperName).find(list).hide(speed);
                $(wrapperName).find(arrow).removeClass('down');
                $(this).find(arrow).addClass('down');
                $(this).parent().find(list).slideToggle(speed);
            } else {
                $(wrapperName).find(list).hide(speed);
                $(wrapperName).find(arrow).removeClass('down');
            }
        });
    }
}