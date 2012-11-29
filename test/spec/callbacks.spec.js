describe('callbacks', function () {
    beforeEach(function () {
        setFixtures(sandbox());
        $('#sandbox').append('<div id="Knob"><div id="Slider"></div></div>');

    });

    it('should handle a callback on move', function() {
        var callback = sinon.spy(),
            knob = new Knob({onMoveCallBack:callback}),
            e = new jQuery.Event('mousedown'),
            moveEvent = new jQuery.Event('mousemove');

        e.pageX = 10;
        e.pageY = 10;

        moveEvent.pageX = 11;
        moveEvent.pageY = 11;

        knob.container.trigger(e);
        knob.container.trigger(moveEvent);

        expect(callback).toHaveBeenCalled();
        knob.container.trigger('mouseup');

    });

    it('should handle a callback when finishing moving the dial', function() {
        var callback = sinon.spy(),
            knob = new Knob({onMoveEndCallBack:callback}),
            e = new jQuery.Event('mousedown');

        e.pageX = 10;
        e.pageY = 10;


        knob.container.trigger(e);
        knob.container.trigger('mouseup');

        expect(callback).toHaveBeenCalled();
    });
});