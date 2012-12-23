describe('Point', function () {
    beforeEach(function() {
        setFixtures(sandbox());
        $('#sandbox').append('<div id="OrbitalDial"><div id="Slider"></div></div>');

        this.orbitalDial = new OrbitalDial();
    });

    describe('calculate pi angles', function() {
        it('should return the angle based of a point', function() {
            var y = 20, x = 20;

            expect(new Point(x, y).calculatePiAngle()).toBe(0.25*Math.PI);
        });

        it('should return the angle based of a point with a negative x value', function() {
            var y = 20, x = -20;

            expect(new Point(x, y).calculatePiAngle()).toBe(2*Math.PI - 0.25*Math.PI);
        });

        it('should return the angle based of a point with two negative values', function() {
            var y = -20, x = -20;

            expect(new Point(x, y).calculatePiAngle()).toBe(1.25*Math.PI);
        });

        it('should return the angle based of a point with a negative y value', function() {
            var y = -20, x = 20;

            expect(new Point(x, y).calculatePiAngle()).toBe(0.75*Math.PI);
        });

    });

    describe('calculate relative distance to center of container', function() {
        it('should calculate the distance for an offset of 60,120', function() {
            var offsetLeft = 170, offsetTop = 110, mouseX = 120, mouseY = 0, result;

            result = new Point(mouseX,mouseY).shift(offsetLeft, offsetTop);

            expect(Math.round(result.x)).toBe(-50);
            expect(Math.round(result.y)).toBe(110);
        });
    });
});