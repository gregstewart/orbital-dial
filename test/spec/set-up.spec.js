describe('initialise the object', function () {

    beforeEach(function () {
        setFixtures(sandbox());
        $('#sandbox').append('<div id="Knob"><div id="Slider"></div></div>');

        this.knob = new Knob();
    });

    it('should return an object', function () {
        expect(typeof this.knob).toBe('object');
    });

    it('should bind to a default container', function (){
        expect(this.knob.container).toBe('#Knob');
    });

    it('container should have a default height and width', function() {
        expect(typeof this.knob.containerWidth).not.toBe('undefined');
        expect(typeof this.knob.containerHeight).not.toBe('undefined');

        expect(this.knob.containerWidth).toBe(200);
        expect(this.knob.containerHeight).toBe(200);
    });

    it('should have a inner element [slider]', function () {
        expect(typeof this.knob.innerElement).not.toBe('undefined');
        expect(this.knob.innerElement).toBe('#Slider');
    });

    it('inner element should have a default height and width', function() {
        expect(typeof this.knob.innerElementWidth).not.toBe('undefined');
        expect(typeof this.knob.innerElementHeight).not.toBe('undefined');

        expect(this.knob.innerElementWidth).toBe(50);
        expect(this.knob.innerElementHeight).toBe(50);
    });

    it('should not need to have a default outer element', function() {
        expect(typeof this.knob.outerElement).toBe('undefined');
    });

    it('should have a default starting angle', function() {
        expect(this.knob.startAngle).toBe(0);
    });

    describe('override defaults', function () {
        beforeEach(function() {
            $('#sandbox').append('<div class="my-knob" data-width="300" data-height="300"><div class="slider" data-width="40" data-height="50" data-start-angle="92"></div><div class="outer-slider" data-width="40" data-height="50" ></div></div>');
            this.containerSelector = '.my-knob';
            this.innerSelector = '.slider';
            this.outerSelector = '.outer-slider';

            this.customKnob =  new Knob({containerSelector:this.containerSelector, innerSelector:this.innerSelector, outerSelector: this.outerSelector});
        });

        it('should allow me to pass in a container to bind to', function() {
            expect(this.customKnob.container).toBe(this.containerSelector);
        });

        it('should allow me to override the default height and width of container', function () {
            expect(this.customKnob.containerWidth).toBe(300);
        });

        it('should allow me to override the inner element selector', function () {
            expect(typeof this.customKnob.innerElement).not.toBe('undefined');
            expect(this.customKnob.innerElement).toBe(this.innerSelector);
        });

        it('should allow me to override the default height and width of the inner element', function () {
            expect(this.customKnob.innerElementWidth).toBe(40);
            expect(this.customKnob.innerElementHeight).toBe(50);
        });

        it('should allow me to me to add an outer element selector', function () {
            expect(typeof this.customKnob.outerElement).not.toBe('undefined');
            expect(this.customKnob.outerElement).toBe(this.outerSelector);
        });

        it('should allow me to set height and width of the outer element', function () {
            expect(this.customKnob.outerElementWidth).toBe(40);
            expect(this.customKnob.outerElementHeight).toBe(50);
        });


        it('should have an overriden starting angle', function() {
            expect(this.customKnob.startAngle).toBe(92);
        });
    });

    describe('event bindings', function() {
        it('should attach click/touch events to the container', function() {
            var events = this.knob.container.data('events');
            expect(typeof events).toBeDefined();
            expect(events.mousedown).toBeTruthy();
        });

        it('should on mouse down bind a mouse event to the document and mouse up unbind the event', function() {
            var moveSpy = sinon.spy(this.knob,'move');
            expect($(document).data('events')).toBeUndefined();

            this.knob.container.trigger('mousedown');
            expect(moveSpy).toHaveBeenCalled();
            expect($(document).data('events')).toBeDefined();
            expect($(document).data('events').mousemove).toBeTruthy();

            $(document).trigger('mouseup');
            expect($(document).data('events')).toBeUndefined();
        });
    });
});