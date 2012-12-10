function Knob(options) {
    'use strict';
    var self = this, container, innerElement, outerElement, outerElementWidth, outerElementHeight, outerRatio, containerWidth, containerHeight, innerElementWidth, innerElementHeight, innerRatio, startAngle, onMoveCallBack, onMoveEndCallBack, radius;

    function draw(position) {
        var containerLength = Math.min(containerWidth, containerHeight) / 2,
            orbitingElementLength = Math.max(innerElementWidth, innerElementHeight) / 2,
            x = containerLength + position.y * innerRatio - orbitingElementLength,
            y = containerLength - position.x * innerRatio - orbitingElementLength;

        innerElement.css({
            left : x,
            top : y
        });

        if (typeof outerElement !== 'undefined') {
            orbitingElementLength = Math.max(outerElementWidth, outerElementHeight) / 2;
            x = containerLength + position.y * outerRatio  - orbitingElementLength;
            y = containerLength - position.x * outerRatio - orbitingElementLength;

            outerElement.css({
                left : x,
                top : y
            });
        }
    }

    self.drawByAngle = function (angle) {
        draw(new Triangle(radius, angle).toPoint());
    };

    function makeMove(e) {
        var temp, tempAngle, x, y, point, size;
        e.preventDefault();
        x = (typeof e.pageX !== 'undefined') ? e.pageX : ((typeof e.originalEvent !== 'undefined') ? e.originalEvent.touches[0].pageX : null);
        y = (typeof e.pageY !== 'undefined') ? e.pageY : ((typeof e.originalEvent !== 'undefined') ? e.originalEvent.touches[0].pageY : null);
        point = new Point(x, y);
        size = (Math.max(containerWidth, containerHeight)) / 2;
        temp = point.shift(container.offset().left + size, container.offset().top + size);
        tempAngle = Math.round(temp.calculatePiAngle() / Math.PI * 180);
        self.drawByAngle(tempAngle);
        onMoveCallBack(tempAngle);
    }

    function move() {
        $(document).on('mousemove touchmove', function (e) {
            e.preventDefault();
            makeMove(e);
        }).on('mouseup touchend', function (e) {
                $(document).off('mousemove mouseup touchmove touchend');
                e.preventDefault();
                makeMove(e);
            });
    }

    function calculateRadius() {
        return Math.min(containerWidth, containerHeight) / 2 - Math.max(innerElementWidth, innerElementHeight) / 2;
    }

    function bindEvents() {
        innerElement.off('**');
        container.on('mousedown touchstart', function (e) {
            e.preventDefault();
            move(e);
        });
    }

    function init() {
        var allOptions, setOptions = options || {};

        allOptions = {
            containerSelector: "#Knob",
            innerSelector: "#Slider",
            outerElementWidth: 50,
            outerElementHeight: 50,
            outerRatio: (6.5 / 7),
            containerWidth: 200,
            containerHeight: 200,
            innerElementWidth: 50,
            innerElementHeight: 50,
            innerRatio: (1 / 3),
            startAngle: 0,
            onMoveCallBack : function () {},
            onMoveEndCallBack : function () {}
        };

        $.extend(allOptions, setOptions);

        container = $(allOptions.containerSelector);
        innerElement = $(allOptions.innerSelector);

        if (typeof allOptions.outerSelector !== 'undefined') {
            outerElement = $(allOptions.outerSelector);
            outerElementWidth = outerElement.data('width') || allOptions.outerElementWidth;
            outerElementHeight = outerElement.data('height') || allOptions.outerElementHeight;
            outerRatio = outerElement.data('ratio') || allOptions.outerRatio;
        }

        containerWidth = container.data('width') || allOptions.containerWidth;
        containerHeight = container.data('height') || allOptions.containerHeight;
        innerElementWidth = innerElement.data('width') || allOptions.innerElementWidth;
        innerElementHeight = innerElement.data('height') || allOptions.innerElementHeight;
        innerRatio = innerElement.data('ratio') || allOptions.innerRatio;
        startAngle = innerElement.data('start-angle') || allOptions.startAngle;

        onMoveCallBack = allOptions.onMoveCallBack;
        onMoveEndCallBack = allOptions.onMoveEndCallBack;
        radius = calculateRadius();

        bindEvents();

        draw(new Triangle(radius, startAngle).toPoint());

        if (!innerElement.is(':visible')) {
            innerElement.show();
        }

        if (typeof outerElement !== 'undefined' && !outerElement.is(':visible')) {
            outerElement.show();
        }
    }
    init();
}