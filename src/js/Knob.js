(function () {

    Knob = (function () {
        'use strict';

        function Knob (options) {
            this.container = (typeof options !== 'undefined' && typeof options.containerSelector !== 'undefined') ? $(options.containerSelector) : $('#Knob');
            this.innerElement = (typeof options !== 'undefined' && typeof options.innerSelector !== 'undefined') ? $(options.innerSelector) : $('#Slider');
            this.containerWidth = this.container.data('width') || 200;
            this.containerHeight = this.container.data('height') || 200;
            this.innerElementWidth = this.innerElement.data('width') || 50;
            this.innerElementHeight = this.innerElement.data('height') || 50;
            this.startAngle = this.innerElement.data('start-angle') || 0;

            this.radius = this.calculateRadius();
        };

        Knob.prototype.calculateRadius = function() {

            return Math.min(this.containerWidth, this.containerHeight)/2 - Math.max(this.innerElementWidth, this.innerElementHeight)/2;
        };

        return Knob;
    }());
}.call(this));