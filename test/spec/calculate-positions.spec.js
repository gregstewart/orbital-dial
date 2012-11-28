describe('calculate inner element positions', function () {
    beforeEach(function () {
        setFixtures(sandbox());
        $('#sandbox').append('<div id="Knob"><div id="Slider"></div></div>');

        this.knob = new Knob();
    });

    it('should calculate the radius', function() {
        expect(this.knob.radius).toBe(75);
    });

    describe('give an angle we should be able to figure out the x/y position', function() {
        it('for an angle of 90 it should return the correct position', function() {
            var result = this.knob.calculatePositionRelatedToCenter(0.5*Math.PI);
            expect(Math.round(result.x)).toBe(0);
            expect(Math.round(result.y)).toBe(75);
        });

        it('for an angle of 270 it should return the correct position', function() {
            var result = this.knob.calculatePositionRelatedToCenter(1.5*Math.PI);
            expect(Math.round(result.x)).toBe(0);
            expect(Math.round(result.y)).toBe(-75);
        });

    });

    describe('calculate angles', function() {
        it('should return the angle based of a point', function() {
            var y = 20, x = 20;

            expect(this.knob.calculatePIAngle(x,y)).toBe(0.25*Math.PI);
        });

        it('should return the angle based of a point with a negative x value', function() {
            var y = 20, x = -20;

            expect(this.knob.calculatePIAngle(x,y)).toBe(2*Math.PI - 0.25*Math.PI);
        });

        it('should return the angle based of a point with two negative values', function() {
            var y = -20, x = -20;

            expect(this.knob.calculatePIAngle(x,y)).toBe(1.25*Math.PI);
        });

        it('should return the angle based of a point with a negative y value', function() {
            var y = -20, x = 20;

            expect(this.knob.calculatePIAngle(x,y)).toBe(0.75*Math.PI);
        });

    });

    describe('calculate relative distance to center of container', function() {
        it('should calculate the distance for an offset of 60,120', function() {
            $('#Knob').offset({
                top: 60,
                left: 120
            });

            this.knob.containerWidth = 100;
            this.knob.containerHeight = 100;

            var mouseX = 120, mouseY = 0, result = this.knob.calculateRelativePosition(mouseX,mouseY);

            expect(Math.round(result.x)).toBe(-50);
            expect(Math.round(result.y)).toBe(110);
        })
    })

});