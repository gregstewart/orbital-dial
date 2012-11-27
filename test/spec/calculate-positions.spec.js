describe('calculate inner element positions', function () {
    beforeEach(function () {
        setFixtures(sandbox());
        $('#sandbox').append('<div id="Knob"><div id="Slider"></div></div>');

        this.knob = new Knob();
    });

    describe('give an angle we should be able to figure out the x/y position', function() {
        it('for an angle of 90 it should return the correct position', function() {
            var result = this.knob.calculatePosition(90);
            expect(result.x).toBe(150);
            expect(result.y).toBe(75);
        });

        it('for an angle of 270 it should return the correct position', function() {
            var result = this.knob.calculatePosition(270);
            expect(Math.floor(result.x)).toBe(0);
            expect(Math.floor(result.y)).toBe(75);
        });
    });
});