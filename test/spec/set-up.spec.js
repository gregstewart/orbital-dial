describe('initialise the object', function () {

    beforeEach(function () {
        this.knob = new Knob();
    });

    it('should return an object', function () {
        expect(typeof this.knob).toBe('object');
    });
})