
function Knob (options) {
    'use strict';

    this.init(options);
    this.radius = this.calculateRadius();
    this.bindEvents();
    this.draw(this.calculatePosition(this.startAngle/180*Math.PI));

    if(!this.innerElement.is(':visible')) {
        this.innerElement.show();
    }
}

Knob.prototype.init = function(options) {

    this.container = (typeof options !== 'undefined' && typeof options.containerSelector !== 'undefined') ? $(options.containerSelector) : $('#Knob');
    this.innerElement = (typeof options !== 'undefined' && typeof options.innerSelector !== 'undefined') ? $(options.innerSelector) : $('#Slider');
    this.containerWidth = this.container.data('width') || 200;
    this.containerHeight = this.container.data('height') || 200;
    this.innerElementWidth = this.innerElement.data('width') || 50;
    this.innerElementHeight = this.innerElement.data('height') || 50;
    this.startAngle = this.innerElement.data('start-angle') || 0;

};

Knob.prototype.bindEvents = function () {
    var self = this;
    this.innerElement.off('**');

    this.container.on('mousedown', function(e) {
        self.move(e);
    });
};

Knob.prototype.move = function (event) {
    var self = this;
    $(document).on('mousemove', function(e) {
        var temp = null;
        temp = self.calculateRelativePosition(e.pageX, e.pageY);
        temp = self.calculatePIAngle(temp.x, temp.y);
        temp = self.calculatePosition(temp);
        self.draw(temp);
                }).on('mouseup', function(e) {
                    $(document).off('mousemove mouseup');
                });
};

Knob.prototype.calculateRadius = function() {

    return Math.min(this.containerWidth, this.containerHeight)/2 - Math.max(this.innerElementWidth, this.innerElementHeight)/2;

};

Knob.prototype.calculatePosition = function(piAngle){

    var position = {},
        angle = piAngle,
        x = 0,
        y = 0,
        containerLength = Math.min(this.containerWidth, this.containerHeight)/ 2,
        sliderLength = Math.max(this.innerElementWidth, this.innerElementHeight)/2;

    x = this.radius * Math.cos(angle);
    y = this.radius * Math.sin(angle);
    position.x = containerLength + y - sliderLength;
    position.y = containerLength - x - sliderLength;

    return position;

};

Knob.prototype.calculatePIAngle = function (x, y) {
    var angle = Math.atan2(x,y);
    if (angle < 0){
        angle += Math.PI*2;
    }
    return angle;
};

Knob.prototype.calculateRelativePosition = function (x, y) {
    var position = {},
        offset = this.container.offset(),
        size = (Math.max(this.containerWidth, this.containerHeight))/2;


    position.x = x - offset.left - size;
    position.y = offset.top + size - y;

    return position;
};

Knob.prototype.draw = function (position) {

    this.innerElement.css({
        left : position.x,
        top : position.y
    });

};