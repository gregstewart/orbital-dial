function Knob(options) {
    'use strict';

    this.init(options);
    this.radius = this.calculateRadius();
    this.bindEvents();
    this.draw(this.calculatePositionRelatedToCenter(this.startAngle / 180 * Math.PI));

    if (!this.innerElement.is(':visible')) {
        this.innerElement.show();
    }

    if (typeof this.outerElement !== 'undefined' && !this.outerElement.is(':visible')) {
        this.outerElement.show();
    }
}

Knob.prototype.init = function (options) {

    this.container = (typeof options !== 'undefined' && typeof options.containerSelector !== 'undefined') ? $(options.containerSelector) : $('#Knob');
    this.innerElement = (typeof options !== 'undefined' && typeof options.innerSelector !== 'undefined') ? $(options.innerSelector) : $('#Slider');
    if ((typeof options !== 'undefined' && typeof options.outerSelector !== 'undefined')) {
        this.outerElement = $(options.outerSelector);
        this.outerElementWidth = this.outerElement.data('width') || 50;
        this.outerElementHeight = this.outerElement.data('height') || 50;
        this.outerRatio = this.outerElement.data('ratio') || 6.5 / 7;
    }
    this.containerWidth = this.container.data('width') || 200;
    this.containerHeight = this.container.data('height') || 200;
    this.innerElementWidth = this.innerElement.data('width') || 50;
    this.innerElementHeight = this.innerElement.data('height') || 50;
    this.innerRatio = this.innerElement.data('ratio') || 1 / 3;

    this.startAngle = this.innerElement.data('start-angle') || 0;
};

Knob.prototype.bindEvents = function () {
    var self = this;
    this.innerElement.off('**');

    this.container.on('mousedown touchstart', function (e) {
        self.move(e);
    });
};

Knob.prototype.move = function (event) {
    var self = this;
    $(document).on('mousemove touchmove',function (e) {
        var temp = null;
        temp = self.calculateRelativePosition(e.pageX, e.pageY);
        temp = self.calculatePIAngle(temp.x, temp.y);
        temp = self.calculatePositionRelatedToCenter(temp);
        self.draw(temp);
    }).on('mouseup touchend', function (e) {
            $(document).off('mousemove mouseup touchmove touchend');
        });
};

Knob.prototype.calculateRadius = function () {

    return Math.min(this.containerWidth, this.containerHeight) / 2 - Math.max(this.innerElementWidth, this.innerElementHeight) / 2;

};

Knob.prototype.calculatePositionRelatedToCenter = function (piAngle) {

    var position = {},
        angle = piAngle;

    position.x = this.radius * Math.cos(angle);
    position.y = this.radius * Math.sin(angle);

    return position;

};

Knob.prototype.calculatePIAngle = function (x, y) {
    var angle = Math.atan2(x, y);
    if (angle < 0) {
        angle += Math.PI * 2;
    }
    return angle;
};

Knob.prototype.calculateRelativePosition = function (x, y) {
    var position = {},
        offset = this.container.offset(),
        size = (Math.max(this.containerWidth, this.containerHeight)) / 2;

    position.x = x - offset.left - size;
    position.y = offset.top + size - y;

    return position;
};

Knob.prototype.draw = function (position) {

    var containerLength = Math.min(this.containerWidth, this.containerHeight) / 2,
        orbitingElementLength = Math.max(this.innerElementWidth, this.innerElementHeight) / 2,
        x = containerLength + position.y * this.innerRatio - orbitingElementLength,
        y = containerLength - position.x * this.innerRatio - orbitingElementLength;

    this.innerElement.css({
        left:x,
        top:y
    });

    if (typeof this.outerElement !== 'undefined') {

        orbitingElementLength = Math.max(this.outerElementWidth, this.outerElementHeight) / 2;
        x = containerLength + position.y * this.outerRatio  - orbitingElementLength;
        y = containerLength - position.x * this.outerRatio - orbitingElementLength;

        this.outerElement.css({
            left:x,
            top:y
        });
    }
};