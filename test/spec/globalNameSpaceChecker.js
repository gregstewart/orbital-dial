describe('our use of global namespace', function () {

    var in_array = function (value, array) {
        return ($.inArray(value, array) !== -1);
    };

    var global_namespace_provenance = function (thing) {
        var previous_global_things = _global_namespace_things;
        if (in_array(thing, previous_global_things)) {
            return 'existed in global before: ' + thing;
        }
        return 'we added to global: ' + thing;
    };

    it('should not introduce non-namespaced globals', function () {
        var dubious_global_things = [];
        var allowed_in_global = [
            'executeJasmineSpecs',
            'reporter',
            'Knob',
            'Point',
            'Triangle'
        ];
        for (var prop in _captured_global_namespace) {
            if (!in_array(prop, allowed_in_global)) {

                if (!/jquery/i.test(prop)) {
                    dubious_global_things.push(prop);
                }
            }
        }
        dubious_global_things.forEach(function (thing) {
            expect(global_namespace_provenance(thing)).toBe('existed in global before: ' + thing);
        });
    });
});