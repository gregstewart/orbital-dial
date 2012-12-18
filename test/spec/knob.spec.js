describe("knob", function() {
    beforeEach(function() {
        setFixtures(sandbox());
        $('body').css({'width': '1024px', 'height': '768px'});
        $('#sandbox').append('<div id="Knob" style="width:200px;height:200px;position:relative"><div id="Slider" style="width:50px;height:50px;position:absolute"></div></div>');
    });

    afterEach(function() {
        $("#Knob").off("**");
        $("#Slider").off("**");
        $(document).off("mousemove mouseup touchmove touchend");
    });


    it("clicking at a point around the dial should advance the dial to that position", function() {
        var downEvent, upEvent, slider, knob = new Knob();

        downEvent = new jQuery.Event('mousedown');
        upEvent = new jQuery.Event('mouseup');

        downEvent.pageX = 25;
        downEvent.pageY = 100;

        upEvent.pageX = 25;
        upEvent.pageY = 100;

        $("#Knob").trigger(downEvent);
        $("#sandbox").trigger(upEvent);

        slider = $("#Slider");
        expect(Math.round(slider.position().left)).toBe(56);
        expect(Math.round(slider.position().top)).toBe(59);
    });

    it('should handle a callback on move', function() {
        var callback = sinon.spy(), downEvent, upEvent, knob = new Knob({onMoveCallBack:callback});

        downEvent = new jQuery.Event('mousedown');
        upEvent = new jQuery.Event('mouseup');

        downEvent.pageX = 25;
        downEvent.pageY = 100;

        upEvent.pageX = 25;
        upEvent.pageY = 100;

        $("#Knob").trigger(downEvent);
        $("#sandbox").trigger(upEvent);

        expect(callback).toHaveBeenCalled();
    });

    it('should handle a callback when finishing moving the dial', function() {
        var callback = sinon.spy(),
            knob = new Knob({onMoveCallBack:callback}),
            e = new jQuery.Event('mousedown');

        e.pageX = 10;
        e.pageY = 10;


        $("#Knob").trigger(e);
        $("#Knob").trigger('mouseup');

        expect(callback).toHaveBeenCalled();
    });

    it('should on touchend use the last known x/y', function () {
        var callback = sinon.spy(), touchStartEvent, touchEndEvent, touchMoveEvent, knob = new Knob({onMoveCallBack:callback}), currentPosition;

        touchStartEvent = new jQuery.Event('touchstart');
        touchStartEvent.pageX = 10;
        touchStartEvent.pageY = 10;

        $("#Knob").trigger(touchStartEvent);

        touchMoveEvent = new jQuery.Event('touchmove');
        touchMoveEvent.pageX = 40;
        touchMoveEvent.pageY = 75;

        $("#Knob").trigger(touchMoveEvent);

        currentPosition = knob.getCurrentPoint();
        expect(currentPosition.x).toBe(40);
        expect(currentPosition.y).toBe(75);


        touchEndEvent = new jQuery.Event('touchend');
        $("#Knob").trigger(touchEndEvent);

        currentPosition = knob.getCurrentPoint();
        expect(currentPosition.x).toBe(40);
        expect(currentPosition.y).toBe(75);
    });
});