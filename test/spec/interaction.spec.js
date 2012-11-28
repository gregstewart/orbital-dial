describe('mouse movement', function() {
    beforeEach(function() {
        setFixtures(sandbox());
        $('#sandbox').append('<div id="Knob"><div id="Slider"></div></div>');

        this.knob = new Knob();
    });

    it('should cascade through all the methods', function() {
        var moveSpy = sinon.spy(this.knob, 'move'),
            relativePositionSpy = sinon.spy(this.knob, 'calculateRelativePosition'),
            angleSpy = sinon.spy(this.knob, 'calculatePIAngle'),
            calculatePositionSpy = sinon.spy(this.knob, 'calculatePosition'),
            drawSpy = sinon.spy(this.knob, 'draw');

        var e = new jQuery.Event('mousedown'),
            moveEvent = new jQuery.Event('mousemove');
        e.pageX = 10;
        e.pageY = 10;

        moveEvent.pageX = 11;
        moveEvent.pageY = 11;

        this.knob.container.trigger(e);
        this.knob.container.trigger(moveEvent);

        expect(moveSpy).toHaveBeenCalled();
        expect(relativePositionSpy).toHaveBeenCalled();
        expect(angleSpy).toHaveBeenCalled();
        expect(calculatePositionSpy).toHaveBeenCalled();
        expect(drawSpy).toHaveBeenCalled();
        this.knob.container.trigger('mouseup');
    });
});