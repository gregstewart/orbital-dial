describe('For a triangle', function () {
    beforeEach(function () {
        setFixtures(sandbox());
    });

    describe('given an angle we should be able to figure out the x/y position', function() {
        it('for an angle of 90 it should return the correct position', function() {
            var hypotenuse = 75;
            var point = new Triangle(hypotenuse, 0.5 * 180).toPoint();
            expect(Math.round(point.x)).toBe(0);
            expect(Math.round(point.y)).toBe(75);
        });

        it('for an angle of 270 it should return the correct position', function() {
            var hypotenuse = 75;
            var point = new Triangle(hypotenuse, 1.5 * 180).toPoint();
            expect(Math.round(point.x)).toBe(0);
            expect(Math.round(point.y)).toBe(-75);
        });

    });
});