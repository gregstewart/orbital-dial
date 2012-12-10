function Point(x, y) {
    'use strict';
    var self = this;
    self.x = x;
    self.y = y;

    self.calculatePiAngle = function () {
        var angle = Math.atan2(x, y);
        if (angle < 0) {
            angle += Math.PI * 2;
        }
        return angle;
    };

    self.shift = function (offsetLeft, offsetTop) {
        return new Point(self.x - offsetLeft, offsetTop - self.y);
    };
}