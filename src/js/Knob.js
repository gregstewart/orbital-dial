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
            this.position = this.calculatePosition(this.startAngle);
            this.innerElement.css({
                left : this.position.x,
                top : this.position.y
            });
        };

        Knob.prototype.calculateRadius = function() {

            return Math.min(this.containerWidth, this.containerHeight)/2 - Math.max(this.innerElementWidth, this.innerElementHeight)/2;
        };

        Knob.prototype.calculatePosition = function(angle){
            var position = {};

            function convertAngle(angle) {
                return angle/180*Math.PI;
            }

            var angle = convertAngle(angle);
            var x = 0,
                y = 0,
                cl = Math.min(this.containerWidth, this.containerHeight)/ 2,
                sl = Math.max(this.innerElementWidth, this.innerElementHeight)/2;
            x = this.radius * Math.cos(angle);
            y = this.radius * Math.sin(angle);
            position.x = cl + y - sl;
            position.y = cl - x - sl;

            return position;
        }

        return Knob;
    }());
}.call(this));