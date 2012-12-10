function Triangle(hypotenuse, anglePI) {
    'use strict';
    var self = this,
        a = anglePI / 180 * Math.PI,
        opposite = hypotenuse * Math.sin(a),
        adjacent = hypotenuse * Math.cos(a);

    self.toPoint = function () {
        return new Point(adjacent, opposite);
    };
}