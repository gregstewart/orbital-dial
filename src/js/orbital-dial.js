function OrbitalDial(options) {
    'use strict';
    var self = this, container, innerElement, outerElement, outerElementWidth, outerElementHeight, outerRatio, containerWidth, containerHeight, innerElementWidth, innerElementHeight, innerRatio, startAngle, onMoveCallBack, onMoveEndCallBack, radius, currentPoint;

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

    function setCurrentPoint(e) {
        var x = (typeof e.pageX !== 'undefined') ? e.pageX : ((typeof e.originalEvent !== 'undefined') ? e.originalEvent.touches[0].pageX : null),
            y = (typeof e.pageY !== 'undefined') ? e.pageY : ((typeof e.originalEvent !== 'undefined') ? e.originalEvent.touches[0].pageY : null);
        currentPoint = new Point(x, y);
    }

    function makeMove(e) {
        var temp, tempAngle, x, y, size;
        e.preventDefault();
        size = (Math.max(containerWidth, containerHeight)) / 2;
        temp = currentPoint.shift(container.offset().left + size, container.offset().top + size);
        tempAngle = Math.round(temp.calculatePiAngle() / Math.PI * 180);
        self.drawByAngle(tempAngle);
        onMoveCallBack(tempAngle);
    }

    function move() {
        $(document).on('mousedown.dial touchstart.dial', function (e) {
            e.preventDefault();
            setCurrentPoint(e);
        }).on('mousemove.dial touchmove.dial', function (e) {
            e.preventDefault();
            setCurrentPoint(e);
            makeMove(e);
        }).on('mouseup.dial touchend.dial', function (e) {
            $(document).off('.dial');
            e.preventDefault();
            makeMove(e);
        });
    }

    function calculateRadius() {
        return Math.min(containerWidth, containerHeight) / 2 - Math.max(innerElementWidth, innerElementHeight) / 2;
    }

    function bindEvents() {
        innerElement.off('**');
        container.on('mousedown.dial touchstart.dial', function (e) {
            e.preventDefault();
            move(e);
        });
    }

    function init() {
        var allOptions, setOptions = options || {};

        allOptions = {
            containerSelector: "#OrbitalDial",
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

    self.getCurrentPoint = function () {
        return currentPoint;
    };

    self.drawByAngle = function (angle) {
        draw(new Triangle(radius, angle).toPoint());
    };

    init();
}